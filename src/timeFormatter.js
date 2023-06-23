import dayjs from "dayjs";

export default class TimeFormater {
	#format;
	constructor(format) {
		this.#format = format;
	}

	/**
	 * 格式化
	 */
	formatting(time_stamp) {
		return `[${dayjs(time_stamp).format(this.#format)}] `;
	}
}