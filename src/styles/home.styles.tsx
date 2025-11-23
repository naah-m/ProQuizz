import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.55;

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40
  },

  nicknameText: {
    fontWeight: 'bold'
  },

  instructionCard: {
    width: '100%',
    minHeight: 200,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60
  },

  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28
  },

  circularButton: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 30
  },

  dataFeedback: {
        minHeight: 80, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
  },

  errorContainer: {
        alignItems: 'center'
  },
  
  reloadText: {
        color: '#4A90E2',
        marginTop: 5,
        fontWeight: 'bold',
        fontSize: 14
  }
});