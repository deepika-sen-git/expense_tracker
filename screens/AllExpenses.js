import { ExpensesContext } from "../store/expense_context";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { useContext } from "react";

function AllExpenses() {

    const expensesCtx = useContext(ExpensesContext);
    const msgForEmptyList = 'No Expense Yet';

    return <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod='Total' fallBackText={msgForEmptyList} />
}
export default AllExpenses;