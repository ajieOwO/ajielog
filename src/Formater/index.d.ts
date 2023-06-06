export = Formater;

declare class Formater {
	constructor(conf: {
		force_single_row: boolean
	});

	/**
	 * 格式化
	 */
	formatting(type: string, content: string): string;
}