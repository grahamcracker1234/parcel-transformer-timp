const { Transformer } = require("@parcel/plugin");

module.exports = new Transformer({
	async transform({ asset, options }) {
		console.log(options.inputFS);
		const code = await asset.getCode();



		asset.setCode(code);
		return [asset];
	}
});