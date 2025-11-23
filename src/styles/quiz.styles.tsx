import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    feedbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    errorText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },

    goBackText: {
        color: '#4A90E2',
        marginTop: 10,
        fontSize: 16
    },

    quizFinishedText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },

    content: {
        flex: 1,
        paddingHorizontal: 20
    },

    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(150, 150, 150, 0.2)'
    },

    progressText: {
        fontSize: 14
    },

    scoreText: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    questionContainer: {
        paddingVertical: 30,
        marginBottom: 20
    },

    questionText: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 30
    },

    optionsList: {
        flex: 1
    },

    optionButton: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 10,
        alignItems: 'center'
    },

    optionText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    }
});