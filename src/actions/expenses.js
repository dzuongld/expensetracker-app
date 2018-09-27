// import uuid from 'uuid'; //unique id
import database from '../firebase/firebase';

//ACTION GENERATOR
//componet calls action generator
//action generator returns object
//component dispatches object
//redux store changes

//with database(firebare)
//componet calls action generator
//action generator returns function
//component dispatches function
//function executed (do whatever it likes => put firebase code there)


//ADD EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    //called internally by redux
    return (dispatch) => {
        const {
            description = '', note = '', amount = 0, createdAt = 0
        } = expenseData;

        //save data to firebase db
        const expense = { description, note, amount, createdAt }
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    }
}

//REMOVE EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

//EDIT EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// SET EXPENSE
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    //return a function that has access to dispatch
    return (dispatch) => {
        //fetch all expenses once
        return database.ref('expenses').once('value').then((snapshot) => {
            //parse data into an array
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            //finally call dispatch
            dispatch(setExpenses(expenses));
        });
    }
};

