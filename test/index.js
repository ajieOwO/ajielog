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
t.log("my_type", "指定类型的日志");
t.saveLog();