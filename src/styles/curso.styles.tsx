import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    fixedHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'absolute',
        zIndex: 10,
        top: 0,
        left: 0
    },

    backButton: {
        padding: 5
    },

    headerTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
        textAlign: 'center'
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },

    areaTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },

    moduleCard: {
        width: '100%',
        borderRadius: 15,
        padding: 15,
        marginTop: 20,
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
        borderRadius: 15,
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