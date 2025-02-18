export const colorSchemes = {
	indigo: ['indigo', 'violet'],
	orange: ['orange', 'red'],
	green: ['green', 'teal'],
	blue: ['blue', 'indigo'],
	purple: ['violet', 'grape'],
	pink: ['grape', 'pink'],
	cyan: ['cyan', 'blue'],
	red: ['red', 'pink'],
	gray: ['gray', 'dark'],
	yellow: ['yellow', 'orange'],
};

export type IColorSchemes = keyof typeof colorSchemes;
