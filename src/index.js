import Writer from "./fileWriter.js";
import typeFormatter from "./typeFormatter.js";
import timeFormatter from "./timeFormatter.js";
import contentFormatter from "./contentFormatter.js";
import logLevel from "./logLevel.js";

const list = new Map();

export default class AjieLog {
	#saving = false; // 是否正在保存

	#writer;	// 日志写入模块

	#log_level;	// 日志等级Map

	#save_interval;	// 保存时间间隔
	#write_level;	// 文件写入日志等级
	#console_level;	// 控制台输出日志等级
	#time_format; // 日期时间格式
	#content_format; // 内容格式

	constructor(config = {}) {
		if (config?.name != "") { // 传入名称且名称不为空时，创建有名实例
			list.set(config.name, this);
		}

		// 初始化文件写入
		this.#writer = new Writer({
			root_path: "log",
			split_by_date: true,
			extension: "log",
			file_name: "myLog",
			...config?.file
		});

		this.#time_format = config?.time_format || "YYYY-MM-DD HH:mm:ss.SSS";

		this.#content_format = {
			force_single_row: true,
			...config?.format
		};

		// 初始化定时保存
		if (!isNaN(config?.save_interval) && config.save_interval > 0) {
			this.#save_interval = config.save_interval;
		}
		else {
			this.#save_interval = 5;
		}
		setInterval(this.saveLog.bind(this), this.#save_interval * 1000);

		this.#log_level = logLevel;	// 保存日志等级

		// 保存日志等级
		if (typeof config?.level == 'number') {	// 输入了单个日志等级
			this.#write_level = config.level;
			this.#console_level = config.level;
		}
		else {	// 输入了复合日志等级或未输入合法等级
			this.#write_level = config?.level?.file || 0;
			this.#console_level = config?.level?.console || 0;
		}
	}

	/**
	 * 获取一个实例
	 */
	static getInstace(name) {
		return list.get(name);
	}

	/**
	 * 指定类型写入一行日志
	 */
	log(content, type = "") {
		let log_level = this.#log_level.get(type) || 0;	// 获取日志类型等级
		if (log_level < this.#console_level && log_level < this.#write_level) {	// 若日志等级不足则不予输出
			return;
		}

		let time_text = timeFormatter(Date.now(), this.#time_format);	// 格式化日期
		let type_text = typeFormatter(type);	// 格式化类型
		let content_text = contentFormatter(content, this.#content_format);
		if (log_level >= this.#write_level) {
			this.#writer.pushLog(time_text + type_text + content_text);
		}
		if (log_level >= this.#console_level) {
			console.log(time_text + type_text + content_text);
			if (this.#save_interval === 0) {
				this.saveLog();
			}
		}
	}

	/**
	 * 写入一行debug类型日志
	 */
	debug(content) {
		this.log(content, "debug");
	}

	/**
	 * 写入一行debug类型日志
	 */
	info(content) {
		this.log(content, "info");
	}

	/**
	 * 写入一行warn类型日志
	 */
	warn(content) {
		this.log(content, "warn");
	}

	/**
	 * 写入一行err类型日志
	 */
	err(content) {
		this.log(content, "err");
	}

	/**
	 * 写入一行fatal类型日志
	 */
	fatal(content) {
		this.log(content, "fatal");
	}

	/**
	 * 手动保存日志
	 */
	saveLog() {
		return new Promise(async (res, rej) => {
			if (this.#saving) {
				await this.#saving;
			}
			this.#saving = this.#writer.saveLog(Date.now());
		});
	}
}