import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'

const Input = ({ label, textInputConfig, style, isInvalid }) => {


    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.multilineInput);
    }
    if (isInvalid) {
        inputStyles.push(styles.invalidText);
    }

    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.label, isInvalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        color: GlobalStyles.colors.primary100,
        fontSize: 16
    },
    input: {
        fontSize: 20,
        marginBottom: 4,
        color: GlobalStyles.colors.primary700,
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,

    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500
    },
    invalidText: {
        backgroundColor: GlobalStyles.colors.error50
    }

})