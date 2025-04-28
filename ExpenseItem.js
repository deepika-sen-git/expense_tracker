import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles'
import getFormattedDate from '../../util/date'
import { useNavigation } from '@react-navigation/native'


export default function ExpenseItem({ id, description, amount, date }) {

    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: id,
        });
    }
    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expenseItemContainer}>
                <View style={styles.innerContainer}>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    pressed: {
        opacity: 0.75
    },

    expenseItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        backgroundColor: GlobalStyles.colors.primary400,
        shadowColor: GlobalStyles.colors.gray500,
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.25,
        elevation: 4,
        marginVertical: 12,
        padding: 12,

    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    innerContainer: {
        flexDirection: 'column',
    },
    amountContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        minWidth: 80,

    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
})