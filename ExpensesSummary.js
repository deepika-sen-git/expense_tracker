import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary = ({ expenses, periodText }) => {

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0);
    return (
        <View style={styles.summaryContainer}>
            {/* <Text>Last 7 days</Text> */}
            <Text style={styles.period}>{periodText}</Text>
            {/* <Text>total: ₹5000.00</Text> */}
            <Text style={styles.sumContainer}>₹{expensesSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary


const styles = StyleSheet.create({

    summaryContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal: 20,
        // marginVertical: 15,
        // height: "10%",
        // width: "80%",
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        // borderWidth: 4,
        padding: 8,

    },
    period: {
        fontSize: 14,
        color: GlobalStyles.colors.primary400,
    },
    sumContainer: {
        fontSize: 16,
        borderRadius: 5,
        padding: 8,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    },
});