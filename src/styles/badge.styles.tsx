import { StyleSheet, Dimensions } from "react-native";

const NUM_COLUMNS = 2;
const ITEM_SIZE = Dimensions.get('window').width / NUM_COLUMNS - 30;

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 60,
    marginBottom: 20
  },

  feedbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  errorText: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20
  },

  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20
  },

  badgeCard: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 1.2,
    margin: 10,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },

  badgeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center'
  },

  badgeDescription: {
    fontSize: 12,
    marginTop: 5
  },

  unlockedText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#C76422',
      marginTop: 8
  }
});