import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40
    },

    areaHeader: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },

    areaTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    moduleCard: {
        width: '100%',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },

    moduleTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    moduleDescription: {
        fontSize: 14,
        marginBottom: 8
    },

    statusText: {
        fontSize: 12,
        fontWeight: '600'
    },

    quizButton: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    quizButtonText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});