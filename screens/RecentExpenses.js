import { useContext, useState, useEffect } from "react";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense_context";
import { getDateMinusGivenDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingFeedback from "../components/UI/LoadingFeedback";
import ErrorFeedback from "../components/UI/ErrorFeedback";

function RecentExpenses() {

    // const [fetchedExpenses, setFetchedExpenses] = useState([]);

    // useEffect(() => {
    //     fetchExpenses();
    // }, []);

    // useEffect(() => {
    //     async function getExpenses() {
    //         let expenses = await fetchExpenses();
    //     }
    //     getExpenses();
    // }, []);

    const [isFetching, setIsFetching] = useState(true);

    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {

            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
                // setFetchedExpenses(expenses);

            } catch (error) {
                setError('Could Not Fetch Data');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);

    if (error && !isFetching) {
        return <ErrorFeedback message={error} />
    }

    if (isFetching) {
        return <LoadingFeedback />
    }

    const msgForEmptyList = "No Recent Expenses";

    // const recentExpenses = fetchedExpenses.filter((expense) => {
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusGivenDays(today, 7);
        return expense.date > date7DaysAgo; // if date is greater then add it to recentExpenses
    });

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 days' fallBackText={msgForEmptyList} />

}
export default RecentExpenses;