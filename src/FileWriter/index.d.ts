export = Writer;



export class Writer {
	constructor(config: {
		root_path: string | undefined,
		split_by_date: boolean | undefined,
		extension: string | undefined,
		file_name: string | undefined
	} | undefined);

	/**
	 * 追加日志
	 */
	pushLog(log: string): void

	/**
	 * 保存日志
	 */
	saveLog(time_stamp: number): void
}

