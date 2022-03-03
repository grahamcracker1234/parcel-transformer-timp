const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
	async transform({ asset, options }) {
		const html = await asset.getCode();
		const regexp = /<template[^>]*data-timp-src=["'](.*)["'][^>]*>(?:<\/template>)?/igm;

		const matches = html.matchAll(regexp);
    
		for (const match of matches) {
			console.log(match);
			console.log(match.index)
		}

		asset.setCode(html);
		return [asset];
	}
});