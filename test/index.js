import AjieLog from "ajielog";

let t = new AjieLog({
	format: {
		force_single_row: true
	}
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