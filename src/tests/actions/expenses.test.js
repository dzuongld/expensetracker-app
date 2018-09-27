import { 
    addExpense, 
    editExpense, 
    removeExpense, 
    setExpenses, 
    startAddExpense, 
    startSetExpenses,
    startRemoveExpense,
    startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const data = {};
    expenses.forEach(({id,description,note,amount,createdAt}) => {
        data[id] = {description, note,amount, createdAt}
    });
    database.ref('expenses').set(data).then(() => {
        done(); //because beforeeach wont wait for this func to complete
    });
});

//REMOVE
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({ //compare 2 objects
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore();
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

//EDIT
test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'new note value' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: { note: 'new note value' }
    });
});

test('should edit expense on firebase',(done) => {
    const store = createMockStore();
    const id = expenses[2].id;
    const updates = {amount: 100000}
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});

//ADD
test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

//add 'done' to denote success or failure when done is called
//if not the dispatched call only happens long after the function returns
//due to waiting for firebase etc
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const data = {
        description: 'item',
        amount: 3000,
        note: 'new stuff',
        createdAt: 2000
    }

    store.dispatch(startAddExpense(data)).then(() => {
        const actions = store.getActions(); //return an array
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...data
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(data);
        done();
    });
    //set up asynchorous test case
    //use promise chaining - chain calls on promises
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions(); //return an array
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '',
                note: '',
                amount: 0,
                createdAt: 0
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        });
        done();
    });
});

// test('should setup add expense action object with default', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description : '',
//             note : '',
//             amount : 0,
//             createdAt : 0
//         }
//     });
// });

test('should setup set expense action object with data',() => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore();
    store.dispatch(startSetExpenses()).then(()=> {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

