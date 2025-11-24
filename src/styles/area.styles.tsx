import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1 
    },

    header: { 
        paddingHorizontal: 24, 
        marginBottom: 10 
    },

    backButton: { 
        marginBottom: 10 
    },

    headerTitle: { 
        fontSize: 28, 
        fontWeight: 'bold' 
    },

    headerSubtitle: { 
        fontSize: 16, 
        marginTop: 8 
    },

    listContent: { 
        paddingHorizontal: 24, 
        paddingBottom: 120 
    },

    card: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 12
    },

    cardHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 8
    },
    cardTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 4 
    },

    cardDesc: { 
        fontSize: 14 
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingTop: 20,
        backgroundColor: 'rgba(255,255,255,0.9)'
    },

    saveButton: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center'
    },

    saveButtonText: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        letterSpacing: 1 
    }
});