const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
	async transform({ asset, options }) {
		const html = await asset.getCode();
		const regexp = /<template[^>]*data-timp-src=["'](.*)["'][^>]*>(?:<\/template>)?/igm;
		console.log("Test");
		console.log(regexp.exec(html));


		asset.setCode(code);
		return [asset];
	}
});