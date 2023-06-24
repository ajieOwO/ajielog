export default function (content, format) {
	if (format.force_single_row) {
		return content.replaceAll("\n", "\\n");
	}
}