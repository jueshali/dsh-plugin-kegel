//#region lib/types/index.js
/**
 * Kegel reminder surface plugin, node half. Pure UI plugin: the empty apply
 * exists so the plugin appears in the host cordis.yml / Loader tree; the
 * browser half ships via exports["./client"], discovered through the
 * package.json `dsh.client` declaration.
 */
/** Host plugin body — no host-side behavior for this surface plugin. */
function apply() {}
//#endregion
export { apply };
