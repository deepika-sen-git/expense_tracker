import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";


function ErrorFeedback({ message }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error Occurred!!</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}
export default ErrorFeedback;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});