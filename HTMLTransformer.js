const { Transformer } = require("@parcel/plugin");
const { MemoryFS } = require("@parcel/fs");
const { createWorkerFarm } = require("@parcel/core");

const workerFarm = createWorkerFarm();
const outputFS = new MemoryFS(workerFarm);

module.exports = new Transformer({
	async transform({ asset, options }) {
		let html = await asset.getCode();
		// const fs = options.inputFS;
		const regexp = /<template[^>]*data-timp-src=["'](.*)["'][^>]*>(?:<\/template>)?/igm;

		// Each match has 0: `template element` and 1: `data-timp-src`
		let matches = html.matchAll(regexp);

		matches = Array.from(matches).map(m => [m[0], m[1]]);
		console.log(matches);
		for (const [textToReplace, filePath] of matches) {
			console.log(textToReplace, filePath)
			const text = await outputFS.readFile(filePath, "utf-8");
			console.log(text);
		}

		asset.setCode(html);
		return [asset];
	}
});