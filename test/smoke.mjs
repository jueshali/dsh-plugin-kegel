// Offline smoke test for the client half: no browser, no DSH.
//
//   node test/smoke.mjs
//
// It reproduces the two contracts the shell enforces — the lazy-CJS bundle
// shape (`window.__ModuleLoader__.load({ id, factory })`) and the plugin body
// (`apply(ctx)` + `inject` from the factory's exports) — then drives the
// reminder engine on a controlled clock and renders the three components with
// a stub React.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, "..", "lib", "client.js"), "utf8");

let failures = 0;
function check(label, condition, detail) {
	if (condition) {
		console.log(`  ok  ${label}`);
		return;
	}
	failures += 1;
	console.error(`FAIL  ${label}${detail === undefined ? "" : ` — ${detail}`}`);
}

// ── browser seams ──────────────────────────────────────────────────────────

let clock = 1_700_000_000_000;
class FakeDate extends Date {
	static now() {
		return clock;
	}
}
const store = new Map();
const localStorage = {
	getItem: (key) => (store.has(key) ? store.get(key) : null),
	setItem: (key, value) => store.set(key, String(value)),
	removeItem: (key) => store.delete(key)
};
const styleTags = [];
const document = {
	querySelector: () => null,
	createElement: () => ({ dataset: {}, style: {}, set textContent(value) { this._text = value; } }),
	head: { appendChild: (tag) => styleTags.push(tag) }
};
const intervals = [];
const setIntervalStub = (callback) => {
	intervals.push(callback);
	return intervals.length;
};
const clearIntervalStub = () => {};
const notifications = [];
class NotificationStub {
	static permission = "granted";
	constructor(title, options) {
		notifications.push({ title, body: options?.body });
	}
	static requestPermission() {}
}
const captured = {};
const windowStub = {
	__ModuleLoader__: { load: (definition) => { captured.definition = definition; } },
	// No AudioContext: the cues must stay best-effort.
};

// ── stub React ─────────────────────────────────────────────────────────────

const React = {
	createElement: (type, props, ...children) => ({ type, props: props ?? {}, children }),
	useState: (initial) => [typeof initial === "function" ? initial() : initial, () => {}],
	useEffect: () => {},
	useRef: (initial) => ({ current: initial }),
	useCallback: (fn) => fn,
	useMemo: (fn) => fn()
};

// ── load the bundle ────────────────────────────────────────────────────────

new Function(
	"window",
	"document",
	"localStorage",
	"setInterval",
	"clearInterval",
	"console",
	"Date",
	"Notification",
	source
)(windowStub, document, localStorage, setIntervalStub, clearIntervalStub, console, FakeDate, NotificationStub);

console.log("bundle");
check("registers one module through window.__ModuleLoader__", captured.definition !== undefined);
check("module id is the package name", captured.definition?.id === "dsh-plugin-kegel", captured.definition?.id);
check("executing the script has no style side effect yet", styleTags.length === 0);

const exports_ = captured.definition.factory((specifier) => {
	if (specifier === "react") return React;
	throw new Error(`unexpected require: ${specifier}`);
});
check("stylesheet is inserted at materialization", styleTags.length === 1);
check("exports apply", typeof exports_.apply === "function");
check("exports inject list", Array.isArray(exports_.inject) && exports_.inject.includes("slots"), JSON.stringify(exports_.inject));

// ── fake cordis context ────────────────────────────────────────────────────

const injections = [];
const registrations = [];
const disposers = [];
const ctx = {
	effect(fn) {
		const result = fn();
		if (typeof result === "function") disposers.push(result);
		return () => {};
	},
	on: () => () => {},
	locale: {
		register: () => () => {},
		bind: () => (key, params) => {
			if (!params) return key;
			return key.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
		}
	},
	slots: {
		inject(name, callback) {
			injections.push({ name, callback });
			return () => {};
		},
		register(options, component) {
			registrations.push({ options, component });
			return () => {};
		}
	}
};

exports_.apply(ctx);

console.log("plugin body");
check("injects into three slots", injections.length === 3, injections.map((entry) => entry.name).join(","));
for (const entry of injections) entry.callback();
check("registers three occupants", registrations.length === 3);
const main = registrations.find((entry) => entry.options.name === "main");
const icon = registrations.find((entry) => entry.options.name === "sidebar.panellist");
const chipRegistration = registrations.find((entry) => entry.options.name === "conversation.header.leading");
check("main panel uses key 'kegel'", main?.options.key === "kegel");
check("sidebar entry uses id 'kegel'", icon?.options.id === "kegel");
check("sidebar entry is labelled", icon?.options.label?.() === "panel.title", String(icon?.options.label?.()));
check("conversation header seat registers the chip", chipRegistration?.component === exports_.KegelHeaderChip);

const engine = main.options.inject().engine;
check("engine is shared by all three registrations", engine === icon.options.inject().engine && engine === chipRegistration.options.inject().engine);
check("header seat injects an openPanel callback", typeof chipRegistration.options.inject().openPanel === "function");

// ── engine behaviour ───────────────────────────────────────────────────────

const sec = 1000;
const min = 60000;
const tick = () => intervals[intervals.length - 1]();

console.log("engine");
let snap = engine.getSnapshot();
check("opens on a running interval countdown", snap.phase === "wait" && snap.running && snap.seconds === 3600, JSON.stringify({ phase: snap.phase, running: snap.running, seconds: snap.seconds }));
check("a fresh reminder has no stats yet", snap.sets === 0 && snap.contractions === 0);
check("the panel shows the next reminder clock time", snap.nextAt === clock + 60 * min, String(snap.nextAt));

clock += 60 * min;
tick();
snap = engine.getSnapshot();
check("the elapsed interval becomes due", snap.phase === "due" && !snap.running, snap.phase);
check("due does not auto-start the guided set by default", snap.phase === "due");
check("due fills the ring", snap.progress === 1, String(snap.progress));
check("no notification without the opt-in", notifications.length === 0);

engine.primary();
snap = engine.getSnapshot();
check("primary starts the set at the first squeeze", snap.phase === "contract" && snap.rep === 1 && snap.running && snap.seconds === 5, JSON.stringify({ phase: snap.phase, rep: snap.rep, seconds: snap.seconds }));

clock += 2 * sec;
tick();
engine.primary();
snap = engine.getSnapshot();
check("primary pauses a running set with its leftover", !snap.running && snap.paused && snap.seconds === 3, JSON.stringify({ running: snap.running, paused: snap.paused, seconds: snap.seconds }));

clock += 10 * sec;
engine.primary();
snap = engine.getSnapshot();
check("resuming ignores the paused wall time", snap.running && snap.seconds === 3, String(snap.seconds));

clock += 3 * sec;
tick();
snap = engine.getSnapshot();
check("the squeeze hands over to the release", snap.phase === "relax" && snap.running && snap.seconds === 5, JSON.stringify({ phase: snap.phase, seconds: snap.seconds }));

clock += 5 * sec;
tick();
snap = engine.getSnapshot();
check("the release advances the rep counter", snap.phase === "contract" && snap.rep === 2, JSON.stringify({ phase: snap.phase, rep: snap.rep }));

// Walk the rest of the set: rep 2 is already contract; finish reps 2..10.
let guard = 0;
while (engine.getSnapshot().phase !== "wait" && guard < 40) {
	clock += 5 * sec;
	tick();
	guard += 1;
}
snap = engine.getSnapshot();
check("a finished set is credited", snap.sets === 1 && snap.contractions === 10, JSON.stringify({ sets: snap.sets, contractions: snap.contractions }));
check("a finished set schedules the next interval", snap.phase === "wait" && snap.running && snap.seconds === 3600, JSON.stringify({ phase: snap.phase, seconds: snap.seconds }));

engine.setSetting("notify", true);
clock += 60 * min;
tick();
check("the due reminder notifies once opted in", notifications.length === 1 && notifications[0].title === "notify.remind.title", JSON.stringify(notifications[0]));

engine.snooze(5);
snap = engine.getSnapshot();
check("snooze postpones for five minutes", snap.phase === "wait" && snap.running && snap.seconds === 300, JSON.stringify({ phase: snap.phase, seconds: snap.seconds }));

engine.primary();
check("primary during the wait starts a set immediately", engine.getSnapshot().phase === "contract");
engine.giveUp();
snap = engine.getSnapshot();
check("giving up returns to the interval without credit", snap.phase === "wait" && snap.sets === 1, JSON.stringify({ phase: snap.phase, sets: snap.sets }));

engine.setSetting("interval", "0");
check("the interval clamps to at least a minute", engine.getSnapshot().settings.interval === 1, String(engine.getSnapshot().settings.interval));
engine.setSetting("interval", "");
check("a half-typed number field is ignored", engine.getSnapshot().settings.interval === 1, String(engine.getSnapshot().settings.interval));
engine.setSetting("reps", 100);
check("reps clamp to their range", engine.getSnapshot().settings.reps === 50, String(engine.getSnapshot().settings.reps));
engine.setSetting("reps", 10);

check("persistence writes the state", typeof store.get(exports_.STORAGE_KEY) === "string");
const persisted = JSON.parse(store.get(exports_.STORAGE_KEY));
check("persisted stats survive the round trip", persisted.sets === 1 && persisted.contractions === 10, JSON.stringify({ sets: persisted.sets, contractions: persisted.contractions }));

// A page closed over an elapsed interval owes one reminder, not a backlog.
const todayString = () => {
	const d = new Date();
	const p = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
store.set(exports_.STORAGE_KEY, JSON.stringify({
	settings: { interval: 60, reps: 10, contract: 5, relax: 5, autoStart: false, sound: false, notify: false },
	phase: "wait",
	rep: 1,
	running: true,
	endAt: clock - 3 * 60 * min,
	remainingMs: 0,
	totalMs: 60 * min,
	sets: 2,
	contractions: 20,
	day: todayString()
}));
const reloaded = exports_.createEngine((key) => key);
snap = reloaded.getSnapshot();
check("a reload after an elapsed interval lands on due", snap.phase === "due", snap.phase);
check("reloaded stats are kept for the same day", snap.sets === 2, String(snap.sets));
reloaded.dispose();
store.delete(exports_.STORAGE_KEY);

// ── rendering ──────────────────────────────────────────────────────────────

console.log("render");
const t = (key, params) => {
	if (!params) return key;
	return key.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
};
engine.resetInterval();
let panel = exports_.KegelPanel({ engine, t });
check("panel renders a tree", panel !== undefined && panel.type === "div");
check("panel carries the settings form", JSON.stringify(panel).includes("kg_settings"));
check("waiting panel offers do-now and restart", JSON.stringify(panel).includes("action.startNow") && JSON.stringify(panel).includes("action.resetInterval"));

const iconView = exports_.KegelPanelIcon({ size: 18, engine });
check("icon renders an svg", iconView.type === "svg" && Array.isArray(iconView.children));

let opened = 0;
const renderChip = () => exports_.KegelHeaderChip({ engine, t, openPanel: () => { opened += 1; } });
/** Find one chip control by its React key, whatever the current phase renders. */
const chipPart = (chipTree, key) => chipTree.children[0].find((child) => child !== null && child.props.key === key);
let chip = renderChip();
check("header chip renders a container", chip.type === "div" && chip.props.className === "kg_chip");
check("waiting chip shows the countdown", chip.props["data-phase"] === "wait" && JSON.stringify(chip).includes("kg_chipTime"));
const doButton = chipPart(chip, "now");
check("waiting chip offers 立即做一组", chipPart(chip, "now") !== undefined && doButton.props.title === "action.startNow");
doButton.props.onClick();
check("the chip's 立即做一组 starts the guided set", engine.getSnapshot().phase === "contract", engine.getSnapshot().phase);

chip = renderChip();
check("exercising chip shows the phase and seconds", chip.props["data-phase"] === "contract" && JSON.stringify(chip).includes("mode.contract"));
check("a running set hides the chip's 立即做一组", chipPart(chip, "now") === undefined && chip.children[0].filter(Boolean).length === 2);
check("startSetNow leaves a running set alone", (() => {
	const before = engine.getSnapshot();
	engine.startSetNow();
	const after = engine.getSnapshot();
	return after.phase === before.phase && after.rep === before.rep && after.remainingMs === before.remainingMs;
})());

engine.giveUp();
engine.startSetNow();
check("startSetNow works from the waiting phase too", engine.getSnapshot().phase === "contract");
engine.giveUp();
chipPart(chip, "main").props.onClick();
check("clicking the waiting chip starts a set", engine.getSnapshot().phase === "contract", engine.getSnapshot().phase);

chip = renderChip();
chipPart(chip, "main").props.onClick();
check("clicking the exercising chip pauses it", engine.getSnapshot().running === false);
chipPart(chip, "main").props.onClick();
check("clicking again resumes it", engine.getSnapshot().running === true);

engine.giveUp();
engine.snooze(5);
clock += 5 * min;
tick();
chip = renderChip();
check("due chip is marked due", chip.props["data-phase"] === "due", chip.props["data-phase"]);
check("due chip still offers 立即做一组", chipPart(chip, "now") !== undefined);
panel = exports_.KegelPanel({ engine, t });
check("due panel offers start and snooze", JSON.stringify(panel).includes("action.startSet") && JSON.stringify(panel).includes("action.snooze"));
chipPart(chip, "main").props.onClick();
check("clicking the due chip starts the set", engine.getSnapshot().phase === "contract");

chipPart(chip, "open").props.onClick();
check("clicking the header chevron opens the panel", opened === 1);

for (const dispose of disposers) dispose();

console.log(failures === 0 ? "\nall checks passed" : `\n${failures} check(s) failed`);
process.exit(failures === 0 ? 0 : 1);
