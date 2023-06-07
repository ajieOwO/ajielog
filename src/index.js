import Writer from "./FileWriter/index.js";
import TypeFormatter from "./TypeFormatter/index.js";
import TimeFormater from "./TimeFormatter/index.js";

const list = new Map();

export default class AjieLog {
	#saving = false; // 是否正在保存

	#writer;
	#save_interval;
	#type_formatter;
	#time_formatter;

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

		this.#type_formatter = new TypeFormatter({
			force_single_row: true,
			...config?.format
		});

		this.#time_formatter = new TimeFormater(config?.time_format || "YYYY-MM-DD HH:mm:ss.SSS");

		// 初始化定时保存
		if (!isNaN(config?.save_interval) && config.save_interval > 0) {
			this.#save_interval = config.save_interval;
		}
		else {
			this.#save_interval = 5;
		}
		setInterval(async () => {
			// 只有当前一次保存任务执行完毕，才会再保存一次
			if (!this.#saving) {
				await this.saveLog();
				this.#saving = false;
			}
		}, this.#save_interval * 1000);
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
		let time = this.#time_formatter.formatting(Date.now());
		let formatted_content = this.#type_formatter.formatting(content, type)
		this.#writer.pushLog(time + formatted_content);
		console.log(time + formatted_content);
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
		return this.#writer.saveLog(Date.now());
	}
}