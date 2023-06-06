import Writer from "./FileWriter";

export = AjieLog;

declare class AjieLog {
	constructor(config: {
		name: string | undefined,
		file: {
			root_path: string | undefined,
			split_by_date: boolean | undefined,
			extension: string | undefined,
			file_name: string | undefined
		} | undefined,
		format: {
			force_single_row: boolean
		},
		save_interval: number,
	} | undefined);

	/**
	 * 获取一个实例
	 */
	static getInstance(name: string): AjieLog;

	/**
	 * 指定类型写入一行日志
	 */
	log(type: string,
		content: string): void;

	/**
	 * 写入一行debug类型日志
	 */
	debug(content: string): void;

	/**
	 * 写入一行debug类型日志
	 */
	info(content: string): void;

	/**
	 * 写入一行warn类型日志
	 */
	warn(content: string): void;

	/**
	 * 写入一行err类型日志
	 */
	err(content: string): void;

	/**
	 * 写入一行fatal类型日志
	 */
	fatal(content: string): void;

	/**
	 * 手动保存日志
	 */
	saveLog(): Promise<void>
}

