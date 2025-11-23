const palette = {
  white: '#FFFFFF',
  black: '#000000',
  grayLight: '#E0E0E0',
  grayDark: '#333333',
  grayText: '#666666',
  primary: '#4A90E2' // Um azul exemplo (pode mudar depois)
};

export const theme = {
  light: {
    background: palette.white,
    text: palette.black,
    inputBackground: palette.grayLight,
    inputPlaceholder: palette.grayText,
    buttonBackground: palette.grayDark, // Botão Entrar (Cinza escuro na imagem)
    buttonText: palette.white,
    secondaryButton: palette.black // Botão Cadastre-se
  },

  dark: {
    background: palette.black,
    text: palette.white,
    inputBackground: palette.grayDark,
    inputPlaceholder: palette.grayLight,
    buttonBackground: palette.grayLight, // Inverte para dar contraste
    buttonText: palette.black,
    secondaryButton: palette.white
  }
};