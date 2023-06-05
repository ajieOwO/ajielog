import Writer from "./FileWriter/index.js";

const list = new Map();

export default class AjieLog {
	#writer;
	#save_interval;
	getInstace(name) {
		return list.get(name);
	}
	constructor(config = {}) {
		if (config?.name != "") { // 传入名称且名称不为空时，创建有名实例
			list.set(config.name, this);
		}

		this.#writer = new Writer({
			root_path: "log",
			split_by_date: true,
			extension: "log",
			file_name: "myLog",
			...config?.file
		});

		// 默认保存时间间隔为5秒
		if (!isNaN(config?.save_interval) && config.save_interval > 0) {
			this.#save_interval = config.save_interval;
		}
		else {
			this.#save_interval = 5;
		}
		setInterval(() => {
			this.saveLog();
		}, this.#save_interval * 1000);
	}


	saveLog() {
		this.#writer.pushLog(`${new Date().toISOString()}`);
		return this.#writer.saveLog(Date.now());
	}
}