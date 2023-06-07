export = TypeFormatter;

declare class TypeFormatter {
	constructor(conf: {
		force_single_row: boolean
	});

	/**
	 * 格式化
	 */
	formatting(content: string, type: ?string): string;
}