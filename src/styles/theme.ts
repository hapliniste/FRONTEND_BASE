import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      accent: {
        primary: string;
        light: string;
        gradient: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      backgrounds: {
        default: string;
        white: string;
      };
      basic: {
        white: string;
        dark: string;
        medium: string;
      };
    };
    borders: {
      radius: string;
    };
    spacing: {
      xsmall: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      section: {
        paddingX: {
          mobile: string;
          desktop: string;
        };
        paddingY: {
          mobile: string;
          desktop: string;
        };
      };
    };
    sizes: {
      maxWidth: string;
    };
    accentPrimary: string;
    baseMedium: string;
    baseDark: string;
  }
}

const baseTheme = {
  borders: {
    radius: '1rem',
  },
  spacing: {
    xsmall: '0.5rem',
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
    xlarge: '3rem',
    xxlarge: '4rem',
    section: {
      paddingX: {
        mobile: '1.5rem',
        desktop: '8%',
      },
      paddingY: {
        mobile: '3rem',
        desktop: '5rem',
      },
    },
  },
  sizes: {
    maxWidth: '1400px',
  },
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    accent: {
      primary: '#FF6B6B',
      light: '#FF8787',
      gradient: 'linear-gradient(90deg, #FF6B6B 0%, #FF8787 100%)',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
    backgrounds: {
      default: '#FFFFFF',
      white: '#FFFFFF',
    },
    basic: {
      white: '#FFFFFF',
      dark: '#2D3436',
      medium: '#636E72',
    },
  },
  accentPrimary: '#FF6B6B',
  baseMedium: '#636E72',
  baseDark: '#2D3436',
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    accent: {
      primary: '#FF6B6B',
      light: '#FF8787',
      gradient: 'linear-gradient(90deg, #FF6B6B 0%, #FF8787 100%)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B2BEC3',
    },
    backgrounds: {
      default: '#2D3436',
      white: '#2D3436',
    },
    basic: {
      white: '#FFFFFF',
      dark: '#1E2527',
      medium: '#B2BEC3',
    },
  },
  accentPrimary: '#FF6B6B',
  baseMedium: '#B2BEC3',
  baseDark: '#1E2527',
}; 