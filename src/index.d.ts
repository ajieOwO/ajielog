import Writer from "./FileWriter";

export = AjieLog;

export class AjieLog {
	constructor(config: {
		name: string | undefined,
		file: {
			root_path: string | undefined,
			split_by_date: boolean | undefined,
			extension: string | undefined,
			file_name: string | undefined
		} | undefined,
		save_interval: number,
	} | undefined);
	/**
	 * 保存日志
	 */
	saveLog(): Promise
}

let t = new AjieLog()

