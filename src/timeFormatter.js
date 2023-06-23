import dayjs from "dayjs";

export default function (time_stamp, format) {
	return `[${dayjs(time_stamp).format(format)}] `;
}