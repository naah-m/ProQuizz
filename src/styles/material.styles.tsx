import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10
  },

  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  errorText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },

  reloadButton: {
    color: '#4A90E2', 
    fontWeight: 'bold'
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20
  },

  cardContainer: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: 8,
    alignItems: 'center'
  },

  cardIcon: {
      fontSize: 24,
      marginRight: 15
  },

  cardContent: {
    flex: 1
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  cardDescription: {
    fontSize: 14,
    marginTop: 4
  }
});