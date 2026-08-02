import { n as defineRpcFunction } from "../define-BLWPsH6y.mjs";
import * as v from "valibot";
//#region src/recipes/common-rpc-functions.ts
/** Runtime list of every {@link KnownEditor}, in the order `v.picklist` reports them. */
const KNOWN_EDITORS = [
	"atom",
	"subl",
	"sublime",
	"sublime_text",
	"wstorm",
	"charm",
	"zed",
	"notepad++",
	"vim",
	"mvim",
	"joe",
	"gvim",
	"emacs",
	"emacsclient",
	"rmate",
	"mate",
	"code",
	"code-insiders",
	"codium",
	"vscodium",
	"trae",
	"antigravity",
	"cursor",
	"appcode",
	"clion",
	"idea",
	"phpstorm",
	"pycharm",
	"rubymine",
	"webstorm",
	"goland",
	"rider"
];
/**
* Prebuilt RPC action that opens a file in the user's configured editor.
*
* Registered name: `devframe:open-in-editor`.
*
* The optional second argument picks the editor command explicitly (must be
* one of {@link KNOWN_EDITORS}); otherwise it's auto-detected per
* `devframe/utils/launch-editor`.
*
* ```ts
* import { openInEditor } from 'devframe/recipes/common-rpc-functions'
*
* defineDevframe({
*   id: 'my-tool',
*   name: 'My Tool',
*   setup(ctx) {
*     ctx.rpc.register(openInEditor)
*   },
* })
* ```
*/
const openInEditor = defineRpcFunction({
	name: "devframe:open-in-editor",
	type: "action",
	jsonSerializable: true,
	args: [v.string(), v.optional(v.picklist(KNOWN_EDITORS))],
	returns: v.void(),
	async handler(filename, editor) {
		const { launchEditor } = await import("../utils/launch-editor.mjs");
		launchEditor(filename, editor);
	}
});
/**
* Prebuilt RPC action that reveals a path in the OS file explorer.
*
* Registered name: `devframe:open-in-finder`.
*
* ```ts
* import { openInFinder } from 'devframe/recipes/common-rpc-functions'
*
* ctx.rpc.register(openInFinder)
* ```
*/
const openInFinder = defineRpcFunction({
	name: "devframe:open-in-finder",
	type: "action",
	jsonSerializable: true,
	args: [v.string()],
	returns: v.void(),
	async handler(path) {
		const { open } = await import("../utils/open.mjs");
		await open(path);
	}
});
/**
* Convenience array bundling both helpers so callers can register them
* in a single `forEach`.
*
* ```ts
* import { commonRpcFunctions } from 'devframe/recipes/common-rpc-functions'
*
* commonRpcFunctions.forEach(fn => ctx.rpc.register(fn))
* ```
*/
const commonRpcFunctions = [openInEditor, openInFinder];
//#endregion
export { KNOWN_EDITORS, commonRpcFunctions, openInEditor, openInFinder };
