import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({ children, onPress, style, mode }) {

    return (
        <View style={style} >
            <Pressable onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed}>
                <View style={[styles.buttonContainer, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttontext, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );

}
export default Button;

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    buttontext: {
        color: "white",
        textAlign: 'center',
    },
    flat: {
        backgroundColor: 'transparent',
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4,
        opacity: 0.75,
    },



});