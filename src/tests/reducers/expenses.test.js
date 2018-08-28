import expensesReducers from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducers(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducers(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducers(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add new expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            description: 'gum',
            note: '',
            amount: 200,
            createdAt: 0
        }
    }
    const state = expensesReducers(expenses, action);
    expect(state).toEqual([...expenses,action.expense]);
});

test('should edit existing expense', () => {
    const text = 'gummmm';
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            description: text
        }
    }
    const state = expensesReducers(expenses, action);
    expect(state[1].description).toBe(text);
});

test('should not edit non-existing expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-2',
        updates: {
            description: 'gummmm'
        }
    }
    const state = expensesReducers(expenses, action);
    expect(state).toEqual(expenses);
});

