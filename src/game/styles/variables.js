const size = {
	mobile: 480,
	tablet: 750,
	desktop: 1920
};
export const DEVICE = {
	MOBILE: `(max-width: ${size.mobile}px)`,
	TABLET: `(max-width: ${size.tablet}px)`,
	DESKTOP: `(min-width: ${size.mobile} px)`
};

export const COLOR = {
	WHITE: '#FDFDFD',
	WHITE_FULL: '#FFFFFF',
	GREY: '#878f99',
	LIGHTGREY: 'LightGrey',
	DARK: '#878f99',
	BLACK: '#090909',
	MAIN: '#0F2965',
	MAIN_LIGHT: '#1E90FF',
	MAIN_LIGHTER: '#EEEEFF',
	MAIN_DARK: '#040F2A',
	DOOR: 'DarkMagenta',
	BUG: 'Green'
};

export const FONT = {
	SIZE: {
		TITLE: '36px',
		TEXT: '16px',
		LITTLE_TEXT: '14px',
		MOBILE_TITLE: '24px',
		MOBILE_TEXT: '14px',
		MOBILE_LITTLE_TEXT: '12px'
	},
	FAMILY: {
		MAIN: "'Helvetica', 'Arial', sans-serif",
		TITLE: 'Bookman Old Style'
	}
};
