import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 60
  },

  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  formContainer: {
    width: '100%',
    marginVertical: 30
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16
  },

  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16
  },

  buttonPrimary: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1
  },

  footerContainer: {
    alignItems: 'center',
    marginBottom: 20
  },

  footerText: {
    fontSize: 14,
    marginBottom: 12
  },

  buttonSecondary: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonSecondaryText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});