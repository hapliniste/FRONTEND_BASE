/*
Basic colors:
- black: #000000
- white: #ffffff
- light: #f2f2f2

Base colors:
- dark: #f2f2f2
- medium: #042137
- light: #083968

accent colors:
- primary: #e41b39
- light: #fe4a4a
- highlight: #fff000
*/


const baseTheme = {
    // Basic colors:
    black: '#000000',
    white: '#ffffff',
    light: '#f2f2f2',

    // Base colors:
    baseDark: '#07151f',
    baseMedium: '#042137',
    baseLight: '#083968',

    // Accent colors:
    accentPrimary: '#e41b39',
    accentLight: '#fe4a4a',
    highlight: '#fff000',

    //OLD
    backgroundColor: "#ffffff",
    textColor: "#222222",

    successColor: "#19e378",
    errorColor: "#e33119",
    warningColor: "#19ade3",

    visitedColor: "#348EC7",
    borderColor: "#cccccc",

    fontFamily: "Open Sans, sans-serif",
    fontSize: "14pt",
    lineHeight: "1.5",
    spacing: "2em",
    borderRadius: "2em",
    appBarHeight: "4em",
    appBarReducedHeight: "2em",
    footerHeight: "2em",

    // Device types
    //mobile: "(max-aspect-ratio: 1/1)",
    portrait: "(max-aspect-ratio: 1)",
    landscape: "(min-aspect-ratio: 1)",
};

const lightTheme = Object.assign({}, baseTheme, {
});

const darkTheme = Object.assign({}, baseTheme, {
});

export { lightTheme, darkTheme };