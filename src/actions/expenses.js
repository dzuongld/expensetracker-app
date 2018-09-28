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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        const {
            description = '', note = '', amount = 0, createdAt = 0
        } = expenseData;

        //save data to firebase db
        const expense = { description, note, amount, createdAt }
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
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

export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }));
        });
    }
}

//EDIT EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    }
}

// SET EXPENSE
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    //return a function that has access to dispatch
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        //fetch all expenses once
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
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

