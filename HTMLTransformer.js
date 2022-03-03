const { Transformer } = require("@parcel/plugin");
const url = require("url");

module.exports = new Transformer({
	async transform({ asset, options, resolve }) {
		// console.log(config);
		let html = await asset.getCode();
		let matches = [];
		const regexp = /<template[^>]*data-src=["'](.*)["'][^>]*>(?:<\/template>)?/igm;

		// Do while there are still matches. Used to support recursive templates within templates.
		do {
			// Each regexp match has 0: `template element` and 1: `data-timp-src`
			matches = Array.from(html.matchAll(regexp)).map(m => [m[0], m[1]]);
			for (const [textToReplace, filePath] of matches) {
				// Ideally, I would like to use `resolve` parameter, but it always returns error, so `url` module is used.
				const resolvedPath = decodeURI(url.resolve(asset.filePath, filePath));
				const text = await options.inputFS.readFile(resolvedPath, "utf-8");
				html = html.replace(textToReplace, text);
			}

			asset.setCode(html);
		} while (matches.length > 0);

		return [asset];
	}
});