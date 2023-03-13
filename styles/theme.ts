const baseTheme = {
    primaryColor: "#e31a44",
    secondaryColor: "#07151f",
    backgroundColor: "#ebf6f8",
    cardBackground: "#ffffff",
    highlightColor: "#f7ef09",
    accentColor: "#e65f53",
    textColor: "#333333",
    white: "#ffffff",

    successColor: "#19e378",
    errorColor: "#e33119",
    warningColor: "#19ade3",

    visitedColor: "348EC7",
    borderColor: "#cccccc",

    fontFamily: "Open Sans, sans-serif",
    fontSize: "14px",
    lineHeight: "1.5",
    spacing: "16px",
    appBarHeight: "4em",
    appBarReducedHeight: "2em",
    footerHeight: "2em",

    // Device types
    //mobile: "(max-aspect-ratio: 1/1)",
    portrait: "(max-aspect-ratio: 1)",
    landscape: "(min-aspect-ratio: 1)",
};

const lightTheme = Object.assign({}, baseTheme, {
    //backgroundColor: "#f5f5f5",
    //textColor: "#333333",
});

const darkTheme = Object.assign({}, baseTheme, {
    //primaryColor: "#994B37",
    //secondaryColor: "#663F1B",
    //backgroundColor: "#333333",
    //textColor: "#f5f5f5",
    //cardBackground: "#948270",
});

export { lightTheme, darkTheme };