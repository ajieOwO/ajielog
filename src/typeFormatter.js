export default class TypeFormater {
	#force_single_row;	//是否强制单行
	constructor(conf) {
		this.#force_single_row = conf.force_single_row;
	}

	/**
	 * 格式化
	 */
	formatting(content, type) {
		let result = "";
		if (typeof type != "undefined" && type != "") {
			result += `[${type}] `;
		}
		result += content;
		if (this.#force_single_row) {
			result = result.replaceAll("\n", "\\n");
		}
		return result;
	}
}