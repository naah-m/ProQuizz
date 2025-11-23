import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    header: {
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20
    },

    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
    },

    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    sectionSubtitle: {
        fontSize: 14,
        marginBottom: 15
    },

    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        width: '100%',
        marginBottom: 20
    },

    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },

    itemContent: {
        flex: 1,
        paddingRight: 15
    },

    itemTitle: {
        fontSize: 16,
        fontWeight: '600'
    },

    itemDescription: {
        fontSize: 12,
        marginTop: 2
    },

    logoutButton: {
        alignSelf: 'center',
        marginTop: 40,
        padding: 10,
        flexDirection: 'row',
        marginLeft: 10
    },

    logoutText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});