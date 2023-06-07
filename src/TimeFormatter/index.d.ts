export = TimeFormater;

declare class TimeFormater {
	constructor(format: string);

	/**
	 * 格式化
	 */
	formatting(time_stamp: number): string;
}