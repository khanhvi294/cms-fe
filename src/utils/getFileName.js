export const getFileName = (url) => {
	const arr = url.split('/');
	const raw = arr[arr.length - 1];
	const decode = decodeURIComponent(raw);
	return decode;
};
