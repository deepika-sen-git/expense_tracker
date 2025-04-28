import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expense_context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingFeedback from "../components/UI/LoadingFeedback";
import ErrorFeedback from "../components/UI/ErrorFeedback";

function ManageExpense({ route, navigation }) {

    const [isPosting, setIsPosting] = useState(false);
    const [error, setError] = useState()

    const expensesCtx = useContext(ExpensesContext);

    const editExpenseId = route.params?.expenseId; //params? -> JS syntax to check if given properties are defined or not
    const isEditing = !!editExpenseId; //JS syntax to convert any value to boolean.

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions(
            { title: isEditing ? 'Edit Expense' : 'Add Expense', });
    }, [navigation, isEditing]);

    async function trashClickHandler() {

        setIsPosting(true);
        try {
            await deleteExpense(editExpenseId);
            expensesCtx.deleteExpense(editExpenseId);
            navigation.goBack(); //equivalent to back button

        } catch (error) {
            setError('Could not Delete Expense');
            setIsPosting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {

        setIsPosting(true);

        try {

            if (isEditing) {


                // setIsPosting(true);
                expensesCtx.updateExpense(editExpenseId,
                    // { description: 'TestUpdate', amount: 100, date: new Date('2025-04-09') } // passing dummy data
                    expenseData);
                await updateExpense(editExpenseId, expenseData);
                // setIsPosting(false);
                navigation.goBack();

            }
            else {
                // storeExpense(expenseData)
                // setIsPosting(true);

                // expensesCtx.addExpense(
                //     // { description: 'TestAdd', amount: 20,date: new Date('2025-04-03') }
                //     expenseData);
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({ ...expenseData, id: id });
                // setIsPosting(false);
                navigation.goBack();

            }
        } catch (error) {
            setError('Could not Save Expense data - Please Try Again Later');
            setIsPosting(false);
        }
    }

    if (error && !isPosting) {
        return <ErrorFeedback message={error} />
    }

    if (isPosting) {
        return <LoadingFeedback />
    }

    return (
        <View style={styles.container}>
            <ExpenseForm submitButtonLabel={isEditing ? 'Update' : 'Add'}
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                defaultValues={selectedExpense}
            />
            {/*labels, input fields, cancel, update, add */}

            {/* <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler}>Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View> */}
            {/* <Text>ManageExpense</Text> */}

            {isEditing && (
                <View style={styles.trashContainer}>
                    <IconButton iconName='trash' size={36} color='white' onPress={trashClickHandler} />
                </View>
            )}
        </View>
    );

}
export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary800,
        padding: 24,

    },
    // buttons: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // button: {
    //     minWidth: 120,
    //     marginHorizontal: 8,
    // },
    trashContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }

});