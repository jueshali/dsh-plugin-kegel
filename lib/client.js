// Client half of dsh-plugin-kegel.
//
// Hand-written in the same lazy-CJS shape `tsdown` emits for the shipped
// client packages: executing this script only REGISTERS a factory with the
// shell's module table (`window.__ModuleLoader__`); every side effect — the
// stylesheet insertion included — runs when the factory materializes. The
// factory's `require` resolves shell-seeded modules only ("react" is part of
// the fixed baseline), so this package declares no runtime dependency.
//
// The surface is a reminder, not a training log: one interval countdown, and
// when it fires a guided set of squeeze/release reps with audio cues.
window.__ModuleLoader__.load({
	id: "dsh-plugin-kegel",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		//#region stylesheet
		const css = ".kg_page{box-sizing:border-box;height:100%;color:var(--dsw-alias-label-primary);flex-direction:column;align-items:center;gap:20px;padding:calc(28px + var(--dsh-frame-top-clearance,0px)) clamp(20px,4vw,48px) 48px;font-size:13px;display:flex;overflow:auto}.kg_page>*{width:100%;max-width:520px}.kg_head{justify-content:space-between;align-items:baseline;gap:12px;display:flex}.kg_title{margin:0;font-size:20px;font-weight:500;line-height:28px}.kg_sub{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12.5px;line-height:20px;text-align:right}.kg_card{border:.5px solid var(--dsw-alias-border-l1);border-radius:var(--dsw-radius-xl);background:var(--dsw-alias-bg-layer-1);flex-direction:column;align-items:center;gap:20px;padding:20px;display:flex;transition:border-color .2s}.kg_card[data-phase=due]{border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 45%,var(--dsw-alias-border-l1))}.kg_ringWrap{width:240px;height:240px;display:grid;place-items:center;position:relative}.kg_ring{transform:rotate(-90deg)}.kg_ringTrack{fill:none;stroke:var(--dsw-alias-border-l1)}.kg_ringBar{fill:none;stroke-linecap:round;transition:stroke-dashoffset .3s linear,stroke .2s}.kg_ringText{pointer-events:none;flex-direction:column;align-items:center;justify-content:center;gap:6px;display:flex;position:absolute;inset:0;padding:0 36px;text-align:center}.kg_time{font-variant-numeric:tabular-nums;font-size:44px;font-weight:300;line-height:1;letter-spacing:1px}.kg_due{color:var(--dsw-alias-state-warn-primary);font-size:24px;font-weight:500;line-height:32px}.kg_phase{color:var(--dsw-alias-label-tertiary);font-size:12.5px;line-height:18px}.kg_rep{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:12.5px;line-height:18px}.kg_actions{flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;display:flex}.kg_primary{height:40px;min-width:128px;font:inherit;color:#fff;cursor:pointer;background:var(--dsw-alias-button-primary-fill,var(--dsw-alias-brand-primary));border:0;border-radius:var(--dsw-radius-md);padding:0 20px;font-size:14px;font-weight:500}.kg_primary:hover{background:var(--dsw-alias-button-primary-hover,var(--dsw-alias-brand-primary))}.kg_ghost{height:40px;font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md);padding:0 16px;font-size:13px}.kg_ghost:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.kg_primary:focus-visible,.kg_ghost:focus-visible{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px}.kg_dots{flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;display:flex}.kg_dot{background:var(--dsw-alias-border-l2);border-radius:999px;width:8px;height:8px}.kg_dotDone{background:var(--dsw-alias-brand-primary)}.kg_dotNow{background:var(--dsw-alias-state-warn-primary);box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-state-warn-primary) 20%,transparent)}.kg_settings{border-top:.5px solid var(--dsw-alias-border-l1);width:100%;padding-top:14px}.kg_summary{color:var(--dsw-alias-label-secondary);cursor:pointer;align-items:center;gap:6px;font-size:13px;line-height:20px;list-style:none;display:flex}.kg_summary::-webkit-details-marker{display:none}.kg_summary:hover{color:var(--dsw-alias-label-primary)}.kg_chevron{transition:transform .16s}.kg_settings[open] .kg_chevron{transform:rotate(90deg)}.kg_grid{grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-top:14px;display:grid}.kg_field{color:var(--dsw-alias-label-secondary);flex-direction:column;gap:6px;font-size:12.5px;display:flex}.kg_field input{box-sizing:border-box;width:100%;height:32px;font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-3,var(--dsw-alias-bg-base));border:.5px solid var(--dsw-alias-border-l2);border-radius:var(--dsw-radius-md);outline:none;padding:0 10px;font-size:13px}.kg_field input:focus{border-color:var(--dsw-alias-state-business-primary)}.kg_checks{flex-direction:column;gap:8px;margin-top:14px;display:flex}.kg_check{color:var(--dsw-alias-label-secondary);cursor:pointer;align-items:center;gap:8px;font-size:13px;line-height:20px;display:flex}.kg_check input{accent-color:var(--dsw-alias-brand-primary);width:15px;height:15px;margin:0}.kg_note{color:var(--dsw-alias-label-caption,var(--dsw-alias-label-tertiary));margin:12px 0 0;font-size:12px;line-height:18px}.kg_hint{color:var(--dsw-alias-label-caption,var(--dsw-alias-label-tertiary));text-align:center;margin:0;font-size:12px;line-height:18px}.kg_chip{-webkit-app-region:no-drag;height:30px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2);border:.5px solid var(--dsw-alias-border-l2);border-radius:999px;align-items:center;gap:2px;padding:0 3px 0 9px;font-size:12.5px;line-height:20px;display:inline-flex}.kg_chip:hover{color:var(--dsw-alias-label-primary)}.kg_chip[data-phase=due]{color:var(--dsw-alias-state-warn-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 45%,var(--dsw-alias-border-l2));background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 8%,var(--dsw-alias-bg-layer-2))}.kg_chip[data-phase=contract]{color:var(--dsw-alias-label-primary);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 40%,var(--dsw-alias-border-l2))}.kg_chip[data-phase=relax]{color:var(--dsw-alias-label-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-success-primary) 40%,var(--dsw-alias-border-l2))}.kg_chip:focus-within{outline:var(--dsw-focus-ring-width) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:1px}.kg_chipMain{height:100%;font:inherit;color:inherit;cursor:pointer;background:0 0;border:0;align-items:center;gap:7px;padding:0;display:inline-flex}.kg_chipTime{font-variant-numeric:tabular-nums;font-size:13px;font-weight:500;letter-spacing:.3px}.kg_chip[data-phase=wait] .kg_chipTime{color:var(--dsw-alias-label-tertiary);font-weight:400}.kg_chipDot{background:currentColor;border-radius:999px;width:3px;height:3px;opacity:.5}.kg_chipDo{width:22px;height:22px;font:inherit;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:999px;justify-content:center;align-items:center;padding:0;display:inline-flex}.kg_chipDo:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-brand-primary)}.kg_chip.kg_chip,.kg_chip.kg_chip *{-webkit-app-region:no-drag}.kg_chipOpen{width:22px;height:22px;font:inherit;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:0;border-radius:999px;justify-content:center;align-items:center;padding:0;display:inline-flex}.kg_chipOpen:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}@media (prefers-reduced-motion:reduce){.kg_ringBar,.kg_chevron{transition:none}}";
		const tagId = "dsh-plugin-kegel/kegel.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-plugin-kegel";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region dictionaries
		/** Dictionary namespace owned by this plugin. */
		const NS = "kegel";
		const zh = {
			"panel.title": "提肛提醒",
			"mode.wait": "距下次提醒",
			"mode.due": "该做一组了",
			"mode.contract": "收紧",
			"mode.relax": "放松",
			"status.paused": "已暂停",
			"action.startSet": "开始一组",
			"action.startNow": "立即做一组",
			"action.pause": "暂停",
			"action.resume": "继续",
			"action.giveUp": "放弃本组",
			"action.snooze": "推迟 5 分钟",
			"action.resetInterval": "重置计时",
			"action.open": "打开提肛提醒面板",
			"stat.today": "今日 {sets} 组 · 累计 {count} 次",
			"stat.next": "下次提醒约 {time}",
			"stat.rep": "第 {index}/{total} 次",
			"stat.plan": "{reps} 次 ×（收紧 {contract} 秒 + 放松 {relax} 秒）",
			"settings.title": "设置",
			"settings.interval": "提醒间隔（分钟）",
			"settings.reps": "每组次数",
			"settings.contract": "收缩时长（秒）",
			"settings.relax": "放松时长（秒）",
			"settings.autoStart": "到点自动开始一组",
			"settings.sound": "提示音",
			"settings.notify": "桌面通知",
			"settings.note": "时长与次数的改动从下一段计时开始生效。",
			"hint": "提醒在后台继续计时，切换面板或刷新页面都不会丢；节奏以自己舒适为准，不适就停。",
			"notify.remind.title": "提肛提醒",
			"notify.remind.body": "该做一组了：{reps} 次 ×（收紧 {contract} 秒 + 放松 {relax} 秒）。",
			"notify.done.title": "一组完成",
			"notify.done.body": "今日第 {sets} 组完成，下次提醒约 {time}。"
		};
		/** English dictionary, key-for-key with `zh`. */
		const en = {
			"panel.title": "Kegel reminder",
			"mode.wait": "Next reminder in",
			"mode.due": "Time for a set",
			"mode.contract": "Squeeze",
			"mode.relax": "Release",
			"status.paused": "Paused",
			"action.startSet": "Start set",
			"action.startNow": "Do a set now",
			"action.pause": "Pause",
			"action.resume": "Resume",
			"action.giveUp": "End set",
			"action.snooze": "Snooze 5 min",
			"action.resetInterval": "Restart timer",
			"action.open": "Open the Kegel reminder panel",
			"stat.today": "{sets} sets today · {count} reps",
			"stat.next": "next reminder ~{time}",
			"stat.rep": "Rep {index}/{total}",
			"stat.plan": "{reps} × (squeeze {contract}s + release {relax}s)",
			"settings.title": "Settings",
			"settings.interval": "Reminder interval (min)",
			"settings.reps": "Reps per set",
			"settings.contract": "Squeeze (seconds)",
			"settings.relax": "Release (seconds)",
			"settings.autoStart": "Start a set automatically when due",
			"settings.sound": "Audio cues",
			"settings.notify": "Desktop notification",
			"settings.note": "Length and rep changes apply from the next phase.",
			"hint": "The reminder keeps counting in the background — switching panels or refreshing does not reset it. Go at a comfortable pace and stop if anything hurts.",
			"notify.remind.title": "Kegel reminder",
			"notify.remind.body": "Time for a set: {reps} × (squeeze {contract}s + release {relax}s).",
			"notify.done.title": "Set complete",
			"notify.done.body": "Set {sets} today done; next reminder about {time}."
		};
		//#endregion
		//#region engine
		/**
		 * The reminder engine lives in the plugin body, not in the panel
		 * component: the main panel unmounts whenever another sidebar entry is
		 * selected, and the interval, the guided set, its cues, and its
		 * notification must survive that (and a page refresh, through
		 * localStorage).
		 */
		const STORAGE_KEY = "dsh.kegel.v1";
		const SECOND = 1000;
		const MINUTE = 60000;
		const WAIT = "wait";
		const DUE = "due";
		const CONTRACT = "contract";
		const RELAX = "relax";
		const PHASES = [WAIT, DUE, CONTRACT, RELAX];
		const EXERCISE = [CONTRACT, RELAX];
		const DEFAULTS = {
			interval: 60,
			reps: 10,
			contract: 5,
			relax: 5,
			autoStart: false,
			sound: true,
			notify: false
		};
		/** Accepted range per numeric setting. */
		const RANGES = {
			interval: [1, 480],
			reps: [1, 50],
			contract: [1, 60],
			relax: [1, 60]
		};
		/** Cue tone patterns, in Hz, one gap unit apart. */
		const CUES = {
			contract: [784, 988],
			relax: [523],
			remind: [880, 880, 1174],
			done: [659, 880, 1046]
		};
		function today() {
			const d = new Date();
			const p = (n) => String(n).padStart(2, "0");
			return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
		}
		function clockTime(timestamp) {
			const d = new Date(timestamp);
			const p = (n) => String(n).padStart(2, "0");
			return `${p(d.getHours())}:${p(d.getMinutes())}`;
		}
		function clampInt(value, min, max, fallback) {
			const n = Math.round(Number(value));
			if (!Number.isFinite(n)) return fallback;
			return Math.min(max, Math.max(min, n));
		}
		function sanitizeSettings(raw) {
			const source = raw && typeof raw === "object" ? raw : {};
			const settings = {};
			for (const key of Object.keys(RANGES)) {
				settings[key] = clampInt(source[key], RANGES[key][0], RANGES[key][1], DEFAULTS[key]);
			}
			for (const key of ["autoStart", "sound", "notify"]) {
				settings[key] = typeof source[key] === "boolean" ? source[key] : DEFAULTS[key];
			}
			return settings;
		}
		/** How long one occurrence of `phase` lasts under `settings`. */
		function phaseDuration(settings, phase) {
			if (phase === CONTRACT) return settings.contract * SECOND;
			if (phase === RELAX) return settings.relax * SECOND;
			if (phase === WAIT) return settings.interval * MINUTE;
			return 0;
		}
		function loadState() {
			let raw = null;
			try {
				raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
			} catch (error) {
				raw = null;
			}
			const source = raw && typeof raw === "object" ? raw : {};
			const settings = sanitizeSettings(source.settings);
			const fresh = source.phase === undefined;
			const phase = PHASES.includes(source.phase) ? source.phase : WAIT;
			const sameDay = source.day === today();
			const state = {
				settings,
				phase,
				rep: clampInt(source.rep, 1, settings.reps, 1),
				running: false,
				endAt: null,
				remainingMs: phaseDuration(settings, phase),
				totalMs: phaseDuration(settings, phase),
				sets: sameDay ? clampInt(source.sets, 0, 9999, 0) : 0,
				contractions: sameDay ? clampInt(source.contractions, 0, 999999, 0) : 0,
				day: today()
			};
			const resumed = source.running === true && typeof source.endAt === "number" && (phase === WAIT || EXERCISE.includes(phase));
			if (resumed) {
				const left = source.endAt - Date.now();
				const total = clampInt(source.totalMs, SECOND, 24 * 60 * MINUTE, phaseDuration(settings, phase));
				if (left > 0) {
					state.running = true;
					state.endAt = source.endAt;
					state.totalMs = total;
					state.remainingMs = left;
				} else if (phase === WAIT) {
					// The interval elapsed while the page was closed: one reminder is
					// owed now, not a backlog.
					state.phase = DUE;
					state.remainingMs = 0;
					state.totalMs = 0;
				} else {
					// A guided set interrupted by a reload restarts its current phase.
					state.running = true;
					state.endAt = Date.now() + state.totalMs;
					state.remainingMs = state.totalMs;
				}
			} else if (fresh) {
				state.running = true;
				state.endAt = Date.now() + state.totalMs;
			} else if (typeof source.remainingMs === "number" && phase !== DUE) {
				// A paused countdown keeps its leftover across a reload.
				const total = clampInt(source.totalMs, SECOND, 24 * 60 * MINUTE, phaseDuration(settings, phase));
				state.totalMs = total;
				state.remainingMs = clampInt(source.remainingMs, 0, total, total);
			}
			return state;
		}
		/**
		 * Build the reminder engine.
		 * @param t - translate bound to this plugin's dictionary namespace.
		 */
		function createEngine(t) {
			let state = loadState();
			let cache = null;
			let lastSecond = -1;
			let timer = null;
			let audio = null;
			const listeners = new Set();
			function save() {
				try {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
				} catch (error) {
					/* a full or disabled store only costs persistence */
				}
			}
			function remaining() {
				if (state.running && state.endAt !== null) return Math.max(0, state.endAt - Date.now());
				return Math.max(0, state.remainingMs);
			}
			function publish() {
				cache = null;
				for (const listener of Array.from(listeners)) {
					try {
						listener();
					} catch (error) {
						console.error(error);
					}
				}
			}
			function stopTicker() {
				if (timer !== null) {
					clearInterval(timer);
					timer = null;
				}
			}
			function ensureTicker() {
				stopTicker();
				if (state.running) timer = setInterval(tick, 200);
			}
			function tick() {
				if (!state.running) return;
				const left = remaining();
				if (left <= 0) {
					advance();
					return;
				}
				const second = Math.ceil(left / SECOND);
				if (second !== lastSecond) {
					lastSecond = second;
					publish();
				}
			}
			/** Play one cue pattern; audio is best-effort and never throws. */
			function cue(kind) {
				const notes = CUES[kind];
				if (!state.settings.sound || notes === undefined) return;
				try {
					const Ctx = window.AudioContext || window.webkitAudioContext;
					if (Ctx === undefined) return;
					if (audio === null) audio = new Ctx();
					if (audio.state === "suspended") audio.resume();
					const start = audio.currentTime + 0.01;
					notes.forEach((frequency, index) => {
						const at = start + index * 0.2;
						const osc = audio.createOscillator();
						const gain = audio.createGain();
						osc.type = "sine";
						osc.frequency.value = frequency;
						gain.gain.setValueAtTime(0.0001, at);
						gain.gain.exponentialRampToValueAtTime(0.2, at + 0.02);
						gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.17);
						osc.connect(gain);
						gain.connect(audio.destination);
						osc.start(at);
						osc.stop(at + 0.2);
					});
				} catch (error) {
					/* audio is best-effort */
				}
			}
			function notify(title, body) {
				if (!state.settings.notify) return;
				try {
					if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
					new Notification(title, { body });
				} catch (error) {
					/* notifications are best-effort */
				}
			}
			/** Put `phase` in place and, when asked, start its countdown. */
			function enter(phase, running, totalOverride) {
				const total = totalOverride !== undefined ? totalOverride : phaseDuration(state.settings, phase);
				state = {
					...state,
					phase,
					running: running === true && total > 0,
					endAt: running === true && total > 0 ? Date.now() + total : null,
					remainingMs: total,
					totalMs: total
				};
				lastSecond = -1;
				ensureTicker();
				save();
				publish();
			}
			/** The interval elapsed: announce it; guide the set only when asked. */
			function due() {
				state = { ...state, phase: DUE, running: false, endAt: null, remainingMs: 0, totalMs: 0 };
				lastSecond = -1;
				stopTicker();
				cue("remind");
				notify(t("notify.remind.title"), t("notify.remind.body", {
					reps: state.settings.reps,
					contract: state.settings.contract,
					relax: state.settings.relax
				}));
				if (state.settings.autoStart) {
					beginSet();
					return;
				}
				save();
				publish();
			}
			/** The current countdown ended; move the state machine on. */
			function advance() {
				if (state.phase === WAIT) {
					due();
					return;
				}
				if (state.phase === CONTRACT) {
					enter(RELAX, true);
					cue("relax");
					return;
				}
				if (state.phase === RELAX) {
					if (state.rep < state.settings.reps) {
						state = { ...state, rep: state.rep + 1 };
						enter(CONTRACT, true);
						cue("contract");
						return;
					}
					finishSet();
				}
			}
			/** Begin the guided set at rep 1. */
			function beginSet() {
				state = { ...state, rep: 1 };
				enter(CONTRACT, true);
				cue("contract");
			}
			/** Credit a finished set and schedule the next reminder. */
			function finishSet() {
				const sameDay = state.day === today();
				state = {
					...state,
					sets: (sameDay ? state.sets : 0) + 1,
					contractions: (sameDay ? state.contractions : 0) + state.settings.reps,
					day: today(),
					rep: 1
				};
				cue("done");
				const nextAt = Date.now() + state.settings.interval * MINUTE;
				notify(t("notify.done.title"), t("notify.done.body", {
					sets: state.sets,
					time: clockTime(nextAt)
				}));
				enter(WAIT, true);
			}
			// The reminder clock runs from mount: a resumed interval keeps ticking,
			// and the normalized state is what the next reload reads.
			if (state.running) ensureTicker();
			save();
			return {
				getSnapshot() {
					if (cache !== null) return cache;
					const left = remaining();
					const total = state.totalMs > 0 ? state.totalMs : phaseDuration(state.settings, state.phase);
					const safeTotal = total > 0 ? total : 1;
					const fraction = total > 0 ? Math.min(1, Math.max(0, 1 - left / safeTotal)) : state.phase === DUE ? 1 : 0;
					let progress = state.phase === DUE ? 1 : fraction;
					if (EXERCISE.includes(state.phase)) {
						const { reps, contract, relax } = state.settings;
						const perRep = contract + relax;
						const span = reps * perRep;
						const contractLeft = state.phase === CONTRACT ? Math.min(contract, left / SECOND) : 0;
						const relaxLeft = state.phase === RELAX ? Math.min(relax, left / SECOND) : 0;
						const withinRep = state.phase === CONTRACT ? contract - contractLeft : contract + (relax - relaxLeft);
						const done = (state.rep - 1) * perRep + withinRep;
						progress = span > 0 ? Math.min(1, Math.max(0, done / span)) : 0;
					}
					cache = Object.freeze({
						settings: state.settings,
						phase: state.phase,
						running: state.running,
						paused: !state.running && state.phase !== DUE && left > 0 && left < safeTotal,
						rep: state.rep,
						reps: state.settings.reps,
						seconds: Math.ceil(left / SECOND),
						remainingMs: left,
						totalMs: total,
						progress,
						sets: state.day === today() ? state.sets : 0,
						contractions: state.day === today() ? state.contractions : 0,
						nextAt: state.phase === WAIT && state.running && state.endAt !== null ? state.endAt : null
					});
					return cache;
				},
				subscribe(listener) {
					listeners.add(listener);
					return () => {
						listeners.delete(listener);
					};
				},
				/** The one verb the chip and the primary button share. */
				primary() {
					if (state.phase === DUE) {
						beginSet();
						return;
					}
					if (EXERCISE.includes(state.phase)) {
						if (state.running) {
							state = { ...state, running: false, remainingMs: remaining(), endAt: null };
							stopTicker();
							save();
							publish();
						} else {
							const left = state.remainingMs > 0 ? state.remainingMs : phaseDuration(state.settings, state.phase);
							state = { ...state, running: true, endAt: Date.now() + left, remainingMs: left };
							ensureTicker();
							save();
							publish();
						}
						return;
					}
					beginSet();
				},
				/**
				 * Start a guided set right now from any non-exercise phase; a set
				 * already under way is left alone (the chip's main control is what
				 * pauses or resumes it).
				 */
				startSetNow() {
					if (EXERCISE.includes(state.phase)) return;
					beginSet();
				},
				/** Postpone a due (or pending) reminder. */
				snooze(minutes) {
					const span = clampInt(minutes, 1, 120, 5) * MINUTE;
					state = { ...state, rep: 1 };
					enter(WAIT, true, span);
				},
				/** Restart the full interval now. */
				resetInterval() {
					state = { ...state, rep: 1 };
					enter(WAIT, true);
				},
				/** Drop a running set without credit. */
				giveUp() {
					state = { ...state, rep: 1 };
					enter(WAIT, true);
				},
				setSetting(key, value) {
					// A half-typed number field ("", "-") must not snap the value back.
					const numeric = typeof value === "number" ? value : Number(String(value).trim());
					if (RANGES[key] !== undefined) {
						if (!Number.isFinite(numeric)) return;
						state = { ...state, settings: { ...state.settings, [key]: clampInt(numeric, RANGES[key][0], RANGES[key][1], DEFAULTS[key]) } };
						if (key === "reps" && state.rep > state.settings.reps) {
							state = { ...state, rep: state.settings.reps };
						}
					} else if (key === "autoStart" || key === "sound" || key === "notify") {
						state = { ...state, settings: { ...state.settings, [key]: value === true } };
					} else {
						return;
					}
					save();
					publish();
				},
				requestNotifyPermission() {
					try {
						if (typeof Notification !== "undefined" && Notification.permission === "default") Notification.requestPermission();
					} catch (error) {
						/* best-effort */
					}
				},
				dispose() {
					stopTicker();
					listeners.clear();
					try {
						if (audio !== null && typeof audio.close === "function") audio.close();
					} catch (error) {
						/* best-effort */
					}
					audio = null;
				}
			};
		}
		//#endregion
		//#region React
		/** Subscribe a component to the engine's immutable snapshot. */
		function useEngineSnapshot(engine) {
			const [snapshot, setSnapshot] = react.useState(() => engine.getSnapshot());
			react.useEffect(() => {
				setSnapshot(engine.getSnapshot());
				return engine.subscribe(() => setSnapshot(engine.getSnapshot()));
			}, [engine]);
			return snapshot;
		}
		/** Arc color per phase. */
		const PHASE_COLORS = {
			wait: "var(--dsw-alias-brand-primary)",
			due: "var(--dsw-alias-state-warn-primary)",
			contract: "var(--dsw-alias-brand-primary)",
			relax: "var(--dsw-alias-state-success-primary)"
		};
		function formatClock(seconds) {
			const safe = Math.max(0, Math.round(seconds));
			const minutes = Math.floor(safe / 60);
			return `${String(minutes).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
		}
		/**
		 * The two circles every progress ring shares: a faint track and the
		 * progress arc, colored by the live phase.
		 */
		function ringCircles(size, progress, color, stroke) {
			const radius = (size - stroke - 1) / 2;
			const center = size / 2;
			const circumference = 2 * Math.PI * radius;
			return [
				react.createElement("circle", {
					key: "track",
					cx: center,
					cy: center,
					r: radius,
					fill: "none",
					strokeWidth: stroke,
					style: { stroke: "currentColor", opacity: 0.35 }
				}),
				react.createElement("circle", {
					key: "bar",
					cx: center,
					cy: center,
					r: radius,
					fill: "none",
					strokeWidth: stroke,
					strokeLinecap: "round",
					strokeDasharray: circumference,
					strokeDashoffset: circumference * (1 - progress),
					style: {
						stroke: color,
						transform: "rotate(-90deg)",
						transformOrigin: "50% 50%"
					}
				})
			];
		}
		/** The sidebar icon: the phase ring plus a phase-shaped center mark. */
		function KegelPanelIcon(props) {
			const size = typeof props.size === "number" ? props.size : 16;
			const snapshot = useEngineSnapshot(props.engine);
			const stroke = 2;
			const center = size / 2;
			const marks = ringCircles(size, snapshot.progress, PHASE_COLORS[snapshot.phase], stroke);
			if (snapshot.paused) {
				marks.push(
					react.createElement("rect", {
						key: "p1",
						x: center - size * 0.16,
						y: center - size * 0.14,
						width: Math.max(1.4, size * 0.1),
						height: Math.max(3, size * 0.28),
						rx: 0.6,
						style: { fill: "currentColor" }
					}),
					react.createElement("rect", {
						key: "p2",
						x: center + size * 0.06,
						y: center - size * 0.14,
						width: Math.max(1.4, size * 0.1),
						height: Math.max(3, size * 0.28),
						rx: 0.6,
						style: { fill: "currentColor" }
					})
				);
			} else if (snapshot.phase === CONTRACT) {
				marks.push(react.createElement("circle", {
					key: "state",
					cx: center,
					cy: center,
					r: Math.max(1.2, size * 0.12),
					style: { fill: PHASE_COLORS.contract }
				}));
			} else if (snapshot.phase === RELAX) {
				marks.push(react.createElement("circle", {
					key: "state",
					cx: center,
					cy: center,
					r: Math.max(1.6, size * 0.16),
					fill: "none",
					strokeWidth: Math.max(1.2, size * 0.1),
					style: { stroke: PHASE_COLORS.relax }
				}));
			} else {
				marks.push(react.createElement("circle", {
					key: "state",
					cx: center,
					cy: center,
					r: Math.max(1.2, size * 0.11),
					style: { fill: snapshot.phase === DUE ? PHASE_COLORS.due : "currentColor" }
				}));
			}
			return react.createElement("svg", {
				width: size,
				height: size,
				viewBox: `0 0 ${size} ${size}`,
				"aria-hidden": "true",
				focusable: "false"
			}, marks);
		}
		/**
		 * The conversation header's top-left seat: the live reminder.
		 *
		 * The seat sits inside the header's window-drag band, so the chip carries
		 * its own `-webkit-app-region: no-drag`. One click does whatever the
		 * current phase wants (start the set, pause the guidance, resume it)
		 * without leaving the conversation; the chevron opens the full panel.
		 */
		function KegelHeaderChip(props) {
			const { engine, t, openPanel } = props;
			const snapshot = useEngineSnapshot(engine);
			const size = 15;
			const exercise = EXERCISE.includes(snapshot.phase);
			const text = exercise
				? `${t(`mode.${snapshot.phase}`)} ${snapshot.seconds}`
				: snapshot.phase === DUE
					? t("mode.due")
					: formatClock(snapshot.seconds);
			const action = snapshot.phase === DUE || snapshot.phase === WAIT
				? t(snapshot.phase === DUE ? "action.startSet" : "action.startNow")
				: snapshot.running ? t("action.pause") : t("action.resume");
			const label = `${t("panel.title")} · ${text} · ${action}`;
			return react.createElement("div", {
				className: "kg_chip",
				"data-phase": snapshot.phase,
				"data-state": snapshot.paused ? "paused" : snapshot.running ? "running" : "idle"
			}, [
				react.createElement("button", {
					key: "main",
					type: "button",
					className: "kg_chipMain",
					"aria-label": label,
					title: `${t("panel.title")} — ${action}`,
					onClick: () => {
						if (snapshot.settings.notify) engine.requestNotifyPermission();
						engine.primary();
					}
				}, [
					react.createElement("svg", {
						key: "ring",
						width: size,
						height: size,
						viewBox: `0 0 ${size} ${size}`,
						"aria-hidden": "true",
						focusable: "false"
					}, ringCircles(size, snapshot.progress, PHASE_COLORS[snapshot.phase], 1.8)),
					react.createElement("span", { key: "text", className: "kg_chipTime" }, text),
					react.createElement("span", { key: "dot", className: "kg_chipDot", "aria-hidden": "true" })
				]),
				// 立即做一组: available whenever no set is running, so the
				// conversation never has to switch panels to start one.
				exercise ? null : react.createElement("button", {
					key: "now",
					type: "button",
					className: "kg_chipDo",
					"aria-label": `${t("panel.title")} · ${t("action.startNow")}`,
					title: t("action.startNow"),
					onClick: () => {
						if (snapshot.settings.notify) engine.requestNotifyPermission();
						engine.startSetNow();
					}
				}, react.createElement("svg", {
					width: 12,
					height: 12,
					viewBox: "0 0 12 12",
					"aria-hidden": "true",
					focusable: "false"
				}, react.createElement("path", {
					d: "M4.2 2.6 L9.4 6 L4.2 9.4 Z",
					style: { fill: "currentColor" }
				}))),
				react.createElement("button", {
					key: "open",
					type: "button",
					className: "kg_chipOpen",
					"aria-label": `${t("panel.title")} · ${t("action.open")}`,
					title: t("action.open"),
					onClick: () => openPanel()
				}, react.createElement("svg", {
					width: 12,
					height: 12,
					viewBox: "0 0 12 12",
					"aria-hidden": "true",
					focusable: "false"
				}, [
					react.createElement("path", {
						key: "ring",
						d: "M4.4 3.2 A3.4 3.4 0 1 0 8.8 7.6",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: 1.3,
						strokeLinecap: "round"
					}),
					react.createElement("path", {
						key: "arrow",
						d: "M7 1.8 H10.2 V5",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: 1.3,
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				]))
			]);
		}
		/** Number field for one numeric setting. */
		function NumberField(props) {
			return react.createElement("label", { className: "kg_field" }, [
				react.createElement("span", { key: "label" }, props.label),
				react.createElement("input", {
					key: "input",
					type: "number",
					min: props.min,
					max: props.max,
					step: 1,
					value: props.value,
					onChange: (event) => props.onChange(event.target.value)
				})
			]);
		}
		/** Checkbox row for one boolean setting. */
		function CheckRow(props) {
			return react.createElement("label", { className: "kg_check" }, [
				react.createElement("input", {
					key: "input",
					type: "checkbox",
					checked: props.checked,
					onChange: (event) => props.onChange(event.target.checked)
				}),
				react.createElement("span", { key: "label" }, props.label)
			]);
		}
		/** The main-column panel: the ring, the phase, the transport, settings. */
		function KegelPanel(props) {
			const engine = props.engine;
			const t = props.t;
			const snapshot = useEngineSnapshot(engine);
			const settings = snapshot.settings;
			const [settingsOpen, setSettingsOpen] = react.useState(false);
			const radius = 106;
			const circumference = 2 * Math.PI * radius;
			const exercise = EXERCISE.includes(snapshot.phase);
			const dots = [];
			const completed = exercise ? snapshot.rep - 1 : 0;
			for (let index = 0; index < snapshot.reps; index += 1) {
				const className = index < completed
					? "kg_dot kg_dotDone"
					: index === completed && exercise ? "kg_dot kg_dotNow" : "kg_dot";
				dots.push(react.createElement("span", { key: index, className }));
			}
			const centerText = exercise
				? react.createElement("div", { className: "kg_time", key: "time" }, String(snapshot.seconds))
				: snapshot.phase === DUE
					? react.createElement("div", { className: "kg_due", key: "due" }, t("mode.due"))
					: react.createElement("div", { className: "kg_time", key: "time" }, formatClock(snapshot.seconds));
			const phaseLine = exercise
				? t(`mode.${snapshot.phase}`)
				: snapshot.phase === DUE
					? t("stat.plan", { reps: snapshot.reps, contract: settings.contract, relax: settings.relax })
					: `${t("mode.wait")}${snapshot.paused ? ` · ${t("status.paused")}` : ""}`;
			const subtitle = [
				t("stat.today", { sets: snapshot.sets, count: snapshot.contractions }),
				snapshot.nextAt !== null ? t("stat.next", { time: clockTime(snapshot.nextAt) }) : null
			].filter(Boolean).join(" · ");
			const actions = [];
			if (snapshot.phase === WAIT) {
				actions.push(react.createElement("button", {
					key: "primary",
					type: "button",
					className: "kg_primary",
					onClick: () => engine.primary()
				}, t("action.startNow")));
				actions.push(react.createElement("button", {
					key: "reset",
					type: "button",
					className: "kg_ghost",
					onClick: () => engine.resetInterval()
				}, t("action.resetInterval")));
			} else if (snapshot.phase === DUE) {
				actions.push(react.createElement("button", {
					key: "primary",
					type: "button",
					className: "kg_primary",
					onClick: () => engine.primary()
				}, t("action.startSet")));
				actions.push(react.createElement("button", {
					key: "snooze",
					type: "button",
					className: "kg_ghost",
					onClick: () => engine.snooze(5)
				}, t("action.snooze")));
			} else {
				actions.push(react.createElement("button", {
					key: "primary",
					type: "button",
					className: "kg_primary",
					onClick: () => engine.primary()
				}, snapshot.running ? t("action.pause") : t("action.resume")));
				actions.push(react.createElement("button", {
					key: "giveUp",
					type: "button",
					className: "kg_ghost",
					onClick: () => engine.giveUp()
				}, t("action.giveUp")));
			}
			return react.createElement("div", { className: "kg_page" }, [
				react.createElement("div", { className: "kg_head", key: "head" }, [
					react.createElement("h1", { className: "kg_title", key: "title" }, t("panel.title")),
					react.createElement("p", { className: "kg_sub", key: "sub" }, subtitle)
				]),
				react.createElement("div", { className: "kg_card", key: "card", "data-phase": snapshot.phase }, [
					react.createElement("div", { className: "kg_ringWrap", key: "ring" }, [
						react.createElement("svg", {
							key: "svg",
							className: "kg_ring",
							width: 240,
							height: 240,
							viewBox: "0 0 240 240",
							"aria-hidden": "true"
						}, [
							react.createElement("circle", {
								key: "track",
								className: "kg_ringTrack",
								cx: 120,
								cy: 120,
								r: radius,
								strokeWidth: 8
							}),
							react.createElement("circle", {
								key: "bar",
								className: "kg_ringBar",
								cx: 120,
								cy: 120,
								r: radius,
								strokeWidth: 8,
								strokeDasharray: circumference,
								strokeDashoffset: circumference * (1 - snapshot.progress),
								style: { stroke: PHASE_COLORS[snapshot.phase] }
							})
						]),
						react.createElement("div", { className: "kg_ringText", key: "text" }, [
							centerText,
							react.createElement("div", { className: "kg_phase", key: "phase" }, phaseLine),
							exercise
								? react.createElement("div", { className: "kg_rep", key: "next" }, t("stat.rep", { index: snapshot.rep, total: snapshot.reps }))
								: null
						])
					]),
					react.createElement("div", { className: "kg_actions", key: "actions" }, actions),
					react.createElement("div", { className: "kg_dots", key: "dots" }, dots),
					react.createElement("details", {
						key: "settings",
						className: "kg_settings",
						open: settingsOpen
					}, [
						react.createElement("summary", {
							className: "kg_summary",
							key: "summary",
							// The panel is fully controlled: the native toggle is suppressed so a
							// re-render (the countdown publishes once a second) cannot close it.
							onClick: (event) => {
								event.preventDefault();
								setSettingsOpen((open) => !open);
							}
						}, [
							react.createElement("svg", {
								key: "chevron",
								className: "kg_chevron",
								width: 12,
								height: 12,
								viewBox: "0 0 12 12",
								"aria-hidden": "true"
							}, react.createElement("path", {
								d: "M4 2 L8 6 L4 10",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: 1.5,
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})),
							react.createElement("span", { key: "label" }, t("settings.title"))
						]),
						react.createElement("div", { className: "kg_grid", key: "grid" }, [
							react.createElement(NumberField, {
								key: "interval",
								label: t("settings.interval"),
								value: settings.interval,
								min: RANGES.interval[0],
								max: RANGES.interval[1],
								onChange: (value) => engine.setSetting("interval", value)
							}),
							react.createElement(NumberField, {
								key: "reps",
								label: t("settings.reps"),
								value: settings.reps,
								min: RANGES.reps[0],
								max: RANGES.reps[1],
								onChange: (value) => engine.setSetting("reps", value)
							}),
							react.createElement(NumberField, {
								key: "contract",
								label: t("settings.contract"),
								value: settings.contract,
								min: RANGES.contract[0],
								max: RANGES.contract[1],
								onChange: (value) => engine.setSetting("contract", value)
							}),
							react.createElement(NumberField, {
								key: "relax",
								label: t("settings.relax"),
								value: settings.relax,
								min: RANGES.relax[0],
								max: RANGES.relax[1],
								onChange: (value) => engine.setSetting("relax", value)
							})
						]),
						react.createElement("div", { className: "kg_checks", key: "checks" }, [
							react.createElement(CheckRow, {
								key: "autoStart",
								label: t("settings.autoStart"),
								checked: settings.autoStart,
								onChange: (value) => engine.setSetting("autoStart", value)
							}),
							react.createElement(CheckRow, {
								key: "sound",
								label: t("settings.sound"),
								checked: settings.sound,
								onChange: (value) => engine.setSetting("sound", value)
							}),
							react.createElement(CheckRow, {
								key: "notify",
								label: t("settings.notify"),
								checked: settings.notify,
								onChange: (value) => {
									engine.setSetting("notify", value);
									if (value) engine.requestNotifyPermission();
								}
							})
						]),
						react.createElement("p", { className: "kg_note", key: "note" }, t("settings.note"))
					])
				]),
				react.createElement("p", { className: "kg_hint", key: "hint" }, t("hint"))
			]);
		}
		//#endregion
		//#region plugin
		/** The id shared by the sidebar entry and the main panel it opens. */
		const PANEL_ID = "kegel";
		/** Services this plugin's browser half needs before it applies. */
		const inject = ["slots", "locale", "layout"];
		/**
		 * Browser plugin body: the conversation-header chip, the sidebar entry,
		 * the main panel it opens, and the reminder engine they all read.
		 * @param ctx - client root context.
		 */
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "kegel: dictionaries");
			const t = ctx.locale.bind(NS);
			const engine = createEngine(t);
			ctx.effect(() => () => engine.dispose(), "kegel: reminder engine");
			ctx.slots.inject("main", () => ctx.slots.register({
				name: "main",
				key: PANEL_ID,
				locale: NS,
				inject: () => ({ engine })
			}, KegelPanel));
			ctx.slots.inject("sidebar.panellist", () => ctx.slots.register({
				name: "sidebar.panellist",
				id: PANEL_ID,
				order: 40,
				locale: NS,
				label: () => t("panel.title"),
				inject: () => ({ engine })
			}, KegelPanelIcon));
			// The conversation header's leading seat: the reminder lives at the
			// top-left of the dialog, and the chevron opens the full panel.
			ctx.slots.inject("conversation.header.leading", () => ctx.slots.register({
				name: "conversation.header.leading",
				locale: NS,
				inject: () => ({
					engine,
					openPanel: () => ctx.layout.selectPanel(PANEL_ID)
				})
			}, KegelHeaderChip));
		}
		//#endregion
		exports.KegelPanel = KegelPanel;
		exports.KegelPanelIcon = KegelPanelIcon;
		exports.KegelHeaderChip = KegelHeaderChip;
		exports.createEngine = createEngine;
		exports.RANGES = RANGES;
		exports.DEFAULTS = DEFAULTS;
		exports.STORAGE_KEY = STORAGE_KEY;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
