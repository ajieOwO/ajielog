export default class Formater {
	#force_single_row;	//是否强制单行
	constructor(conf) {
		this.#force_single_row = conf.force_single_row;
	}

	/**
	 * 格式化
	 */
	formatting(type, content) {
		let result = `[${type}]${content}`;
		if (this.#force_single_row) {
			result = result.replaceAll("\n", "\\n");
		}
		return result;
	}
}