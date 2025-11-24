import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 50
  },

  headerText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    lineHeight: 28
  },

  formContainer: {
    width: '100%'
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

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32
  },

  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 12, 
    borderWidth: 2,
    borderColor: '#B0B0B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'transparent'
  },

  checkboxChecked: {
    borderColor: '#4A90E2'
  },

  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4A90E2'
  },

  checkboxLabel: {
    fontSize: 14,
    flex: 1
  },

  buttonPrimary: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1
  }
});