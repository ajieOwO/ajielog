# AjieLog日志模块

## 基础使用

1. 安装日志模块
	```shell
	npm install ajielog
	```

2. 创建日志模块实例
	```javascript
	let logger = new AjieLog();
	```

3. 输出日志
	```javascript
	logger.debug("debug类型日志");
	logger.info("info类型日志");
	logger.warn("warn类型日志");
	logger.err("err类型日志");
	logger.fatal("fatal类型日志\n");
	logger.log("指定类型的日志", "my_type");
	logger.log("空类型日志1", "");
	logger.log("空类型日志2");
	logger.saveLog();
	```

4. 注意事项

	- 日志模块应在结束应用时手动保存所有数据，否则可能出现缓冲区中日志未写入日志文件的问题。

## 接口

```typescript
declare class AjieLog {
	constructor(config: {
		name: string | undefined,	// 日志模块名称（默认为匿名模块）
		file: {
			root_path: string | undefined, // 日志文件保存根路径（默认为log）
			split_by_date: boolean | undefined,	// 日志是否按日期分割（默认为true）
			extension: string | undefined,	// 日志文件拓展名（默认为log）
			file_name: string | undefined	// 日志文件前缀（默认为myLog）
		} | undefined,
		format: {
			force_single_row: boolean	// 日志是否强制单行（默认为true）
		},
		level: {
			file: number,	// 文件保存的日志等级（默认为0）
			console: number	// 控制台输出的日志等级（默认为0）
		} | number | undefined,	// 一次性设置文件保存和控制台输出的日志等级（默认为0）
		time_format: string | undefined,	// 时间日期的格式（默认为"YYYY-MM-DD HH:mm:ss.SSS"）
		save_interval: number,	// 日志文件保存间隔，单位秒。0为立即保存（默认为5）
	} | undefined);

	/**
	 * 获取一个实例
	 */
	static getInstance(name: string): AjieLog;

	/**
	 * 指定类型写入一行日志
	 */
	log(content: string, type: ?string): void;

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
```

## 