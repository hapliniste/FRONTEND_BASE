import { Montserrat } from 'next/font/google';
import { Plus_Jakarta_Sans } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
});

export const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

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
      gradient: string;
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
    status: {
      success: string;
      successLight: string;
    }
  };
  spacing: {
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    xxlarge: string;
    xxxlarge: string;
    section: {
      paddingY: {
        mobile: string;
        desktop: string;
      },
      paddingX: {
        mobile: string;
        desktop: string;
      }
    }
  };
  typography: {
    fontFamily: string;
    headingFontFamily: string;
    fontSize: string;
    lineHeight: string;
    sectionTitle: {
      fontSize: {
        desktop: string;
        mobile: string;
      };
      fontWeight: number;
      letterSpacing: string;
      marginBottom: string;
      underline: {
        width: string;
        height: string;
        color: string;
        offset: string;
      };
    };
  };
  borders: {
    radius: string;
    radiusLarge: string;
    width: string;
  };
  sizes: {
    appBarHeight: string;
    appBarReducedHeight: string;
    footerHeight: string;
    maxWidth: string;
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
      primary: '#d52a1d',
      light: '#fe4a4a',
      highlight: '#fff000',
      gradient: 'linear-gradient(115deg, #d52a1d 0%, #fe4a4a 100%)',
    },
    backgrounds: {
      default: '#fafafa',
      white: '#ffffff',
    },
    text: {
      primary: '#222222',
      secondary: '#555555', // Added for additional text styling
    },
    borders: {
      color: '#cccccc',
    },
    status: {
      success: '#34C759',  // Apple's SF Symbols green
      successLight: '#34C75910', // Very light version for backgrounds
    }
  },
  spacing: {
    xsmall: '0.25rem',  // 4px
    small: '0.5rem',     // 8px
    medium: '1rem',      // 16px
    large: '2rem',       // 32px
    xlarge: '4rem',      // 64px
    xxlarge: '8rem',     // 128px
    xxxlarge: '16rem',   // 256px
    section: {
      paddingY: {
        mobile: '0rem',
        desktop: '0rem',
      },
      paddingX: {
        mobile: '1rem',
        desktop: '8%',
      }
    }
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
    headingFontFamily: jakarta.style.fontFamily,
    fontSize: '1rem',
    lineHeight: '1.5',
    sectionTitle: {
      fontSize: {
        desktop: '3.25rem',
        mobile: '2rem'
      },
      fontWeight: 300,
      letterSpacing: '-0.03em',
      marginBottom: '4rem',
      underline: {
        width: '5rem',
        height: '4px',
        color: '#222222',
        offset: '1rem'
      }
    }
  },
  borders: {
    radius: '1.25rem', 
    radiusLarge: '3rem',
    width: '0.125rem',   // 2px for border widths
  },
  sizes: {
    appBarHeight: '4rem',          // 64px
    appBarReducedHeight: '2rem',   // 32px
    footerHeight: '2rem',          // 32px
    maxWidth: '1200px',
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