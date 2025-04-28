import { View, Text, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

// const DUMMY_EXPENSES_DATA = [

//     {
//         id: '1',
//         description: 'Some Vegetables',
//         amount: 40.00,
//         date: new Date("2025-04-05"),
//     },
//     {
//         id: '2',
//         description: 'Clothes',
//         amount: 999.99,
//         date: new Date("2025-04-03"),
//     }, {
//         id: '3',
//         description: 'Stationary',
//         amount: 390.80,
//         date: new Date("2025-03-24"),
//     }, {
//         id: '4',
//         description: 'Shoes',
//         amount: 400.000,
//         date: new Date("2025-03-22"),
//     }, {
//         id: '5',
//         description: 'Nuts-Almonds',
//         amount: 495.95,
//         date: new Date("2025-03-21"),
//     },
//     {
//         id: '6',
//         description: 'Some Vegetables',
//         amount: 40.00,
//         date: new Date("2025-04-05"),
//     },
//     {
//         id: '7',
//         description: 'Clothes',
//         amount: 999.99,
//         date: new Date("2025-04-03"),
//     }, {
//         id: '8',
//         description: 'Stationary',
//         amount: 390.80,
//         date: new Date("2025-03-24"),
//     }, {
//         id: '9',
//         description: 'Shoes',
//         amount: 400.000,
//         date: new Date("2025-03-22"),
//     }, {
//         id: '10',
//         description: 'Nuts-Almonds',
//         amount: 495.95,
//         date: new Date("2025-03-21"),
//     },
// ];

function ExpensesOutput({ expenses, expensesPeriod, fallBackText }) {

    let content = <Text style={styles.infoText}>{fallBackText}</Text>;

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />;
    }

    return (
        <View style={styles.outputContainer}>
            {/* Summary:
            <Text>Last 7 days</Text>
            <Text>total: ₹5000.00</Text>
            List of Expenses:
            <View>
                <FlatList data={expenses}/>
            </View> */}

            <ExpensesSummary expenses={expenses} periodText={expensesPeriod} />
            {content}
            {/* <ExpensesList expenses={expenses} /> */}
        </View>
    );

}
export default ExpensesOutput;

const styles = StyleSheet.create({

    outputContainer: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary800,
        padding: 24,
    },
    infoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 32,
    },

});