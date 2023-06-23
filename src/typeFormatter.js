export default function () {
	let result = "";
	if (typeof type != "undefined" && type != "") {
		result = `[${type}] `;
	}
	return result;
}