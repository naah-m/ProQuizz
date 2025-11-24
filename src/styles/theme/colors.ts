const palette = {
  white: '#FFFFFF',
  black: '#000000',
  grayLight: '#E0E0E0',
  grayDark: '#333333',
  grayText: '#666666',
  primary: '#4A90E2' 
};

export const theme = {
  light: {
    background: palette.white,
    text: palette.black,
    inputBackground: palette.grayLight,
    inputPlaceholder: palette.grayText,
    buttonBackground: palette.grayDark, 
    buttonText: palette.white,
    secondaryButton: palette.black
  },

  dark: {
    background: palette.black,
    text: palette.white,
    inputBackground: palette.grayDark,
    inputPlaceholder: palette.grayLight,
    buttonBackground: palette.grayLight,
    buttonText: palette.black,
    secondaryButton: palette.white
  }
};