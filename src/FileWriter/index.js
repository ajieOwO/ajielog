import { appendFile, mkdir, readdir } from "fs";

export default class Writer {
	#file_name_template;
	#split_by_date;
	#cache = new Array();
	#wait_for_dir = false;
	constructor({
		root_path,
		split_by_date,
		extension,
		file_name
	}) {
		this.#split_by_date = split_by_date;
		this.#file_name_template = [
			root_path,
			"/",
			file_name,
			"",
			".",
			extension
		];

		this.#wait_for_dir = new Promise(async (res, rej) => {
			let dir_name = root_path.split("/");
			for (let i = 1; i <= dir_name.length; i++) {
				// 递归确保路径存在
				await this.#ensureDirExist(dir_name.slice(0, i).join("/"));
			}
			res();
		});
	}

	/**
	 * 追加日志
	 */
	pushLog(log) {
		this.#cache.push(log);
	}

	/**
	 * 保存日志
	 */
	saveLog(time_stamp) {
		return new Promise(async (res, rej) => {
			if (this.#wait_for_dir) {
				await this.#wait_for_dir;
				this.#wait_for_dir = false;
			}

			// 若日志文件按日期分割
			if (this.#split_by_date) {
				let t = new Date(time_stamp);
				let file_name = `_${t.getFullYear()}-`;
				file_name += `0${t.getMonth() + 1}-`.slice(-3);
				file_name += `0${t.getDate()}`.slice(-2);
				this.#file_name_template[3] = file_name;
			}
			appendFile(this.#file_name_template.join(""), this.#cache.join("\n") + "\n", (err) => {
				if (err) {
					console.error(err);
					res();
				}
				this.#cache = [];
				res();
			});
		})
	}

	/**
	 * 确保文件夹存在
	 */
	#ensureDirExist(path) {
		return new Promise((res, rej) => {
			readdir(path, (err, files) => {
				if (err) {
					mkdir(path, (err) => {
						if (err) {
							console.error(err);
						}
						res();
					});
				}
				else {
					res();
				}
			});
		});
	}
}