/*
Basic colors:
- black: #000000
- white: #ffffff
- light: #f2f2f2

Base colors:
- dark: #07151f
- medium: #042137
- light: #083968

Accent colors:
- primary: #e41b39
- light: #fe4a4a
- highlight: #fff000
*/


interface Theme {
  colors: {
    basic: {
      black: string;
      white: string;
      light: string;
    };
    base: {
      dark: string;
      medium: string;
      light: string;
    };
    accent: {
      primary: string;
      light: string;
      highlight: string;
    };
    backgrounds: {
      default: string;
      white: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    borders: {
      color: string;
    };
  };
  spacing: {
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
  };
  borders: {
    radius: string;
    width: string;
  };
  sizes: {
    appBarHeight: string;
    appBarReducedHeight: string;
    footerHeight: string;
  };
  breakpoints: {
    portrait: string;
    landscape: string;
  };
}

const baseTheme: Theme = {
  colors: {
    basic: {
      black: '#000000',
      white: '#ffffff',
      light: '#f2f2f2',
    },
    base: {
      dark: '#07151f',
      medium: '#042137',
      light: '#083968',
    },
    accent: {
      primary: '#e41b39',
      light: '#fe4a4a',
      highlight: '#fff000',
    },
    backgrounds: {
      default: '#ffffff', // Renamed for clarity
      white: '#ffffff',
    },
    text: {
      primary: '#222222',
      secondary: '#555555', // Added for additional text styling
    },
    borders: {
      color: '#cccccc',
    },
  },
  spacing: {
    xsmall: '0.25rem',  // 4px
    small: '0.5rem',     // 8px
    medium: '1rem',      // 16px
    large: '2rem',       // 32px
    xlarge: '4rem',      // 64px
  },
  typography: {
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '1rem',    // Base font size (16px)
    lineHeight: '1.5',
  },
  borders: {
    radius: '0.125rem',  // 2px
    width: '0.125rem',   // 2px for border widths
  },
  sizes: {
    appBarHeight: '4rem',          // 64px
    appBarReducedHeight: '2rem',   // 32px
    footerHeight: '2rem',          // 32px
  },
  breakpoints: {
    portrait: '(max-aspect-ratio: 1)',
    landscape: '(min-aspect-ratio: 1)',
  },
};

const lightTheme: Theme = {
  ...baseTheme,
  // Add light mode specific overrides here if needed
};

const darkTheme: Theme = {
  ...baseTheme,
  // Add dark mode specific overrides here if needed
};

export { lightTheme, darkTheme };