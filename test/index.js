import AjieLog from "ajielog";

let t = new AjieLog({
	name: "日志1",	// 日志模块名称
	file: {
		root_path: "my_log_dir", // 日志文件保存根路径
		split_by_date: true,	// 日志是否按日期分割
		extension: "",	// 日志文件拓展名
		file_name: ""	// 日志文件前缀
	},
	format: {
		force_single_row: true	// 日志是否强制单行
	},
	level: {
		file: 2,	// 文件保存的日志等级
		console: 0	// 控制台输出的日志等级
	},
	time_format: "YYYY-MM-DD HH:mm:ss.SSS",	// 时间日期的格式
	save_interval: 0	// 日志文件保存间隔（0为立即保存）
});

t.debug("debug content");
t.info("info content");
t.warn("warn content");
t.err("err content");
t.fatal("fatal content\n");
t.log("指定类型的日志", "my_type");
t.log("空类型日志1", "");
t.log("空类型日志2");
t.saveLog();
