const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
	async transform({ asset, options }) {
		let html = await asset.getCode();
		const fs = options.inputFS;
		const regexp = /<template[^>]*data-timp-src=["'](.*)["'][^>]*>(?:<\/template>)?/igm;

		// Each match has 0: `template element` and 1: `data-timp-src`
		let matches = html.matchAll(regexp);

		for (const match of matches) {
			console.log(match[0]);
			console.log(match[1]);
		}
		
		matches = Array.from(matches).map(m => [m[0], m[1]]);
		for (const [textToReplace, filePath] in matches) {
			console.log(fs)
			const text = await fs.readFile(filePath, "utf-8");
			console.log(text);
		}

		asset.setCode(html);
		return [asset];
	}
});