import { createContext, useReducer } from "react";

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
//     {
//         id: '11',
//         description: 'Vegetables',
//         amount: 70.000,
//         date: new Date("2025-04-09"),
//     }, {
//         id: '12',
//         description: 'Auto',
//         amount: 20.95,
//         date: new Date("2025-04-08"),
//     },
// ];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, date, amount }) => { },
    setExpenses: (expenses) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, date, amount }) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            // const id = new Date().toString() + Math.random().toString();
            // return [{ ...action.payload, id: id }, ...state];
            return [action.payload, ...state];
        case "SET":
            const inverted = action.payload.reverse();
            return inverted;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data }; //{...old, ...new} means: take everything from old, but overwrite whatever is provided by new., here we are merging data
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {

    // const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES_DATA);
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData })
    }
    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: expenses })
    }
    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id })
    }
    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
    }

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    );
}

export default ExpensesContextProvider;