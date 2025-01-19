export const getObjSelectedFields = <T, K extends keyof T>(obj: T, keys: K[]): Partial<T> => {
	const selectedObj: Partial<T> = {};
	keys.forEach((key) => {
		selectedObj[key] = obj[key];
	});

	return selectedObj;
};

export const i = null;
