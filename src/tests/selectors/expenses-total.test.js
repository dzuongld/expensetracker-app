import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expense', () => {
    const result = selectExpensesTotal([]);
    expect(result).toBe(0);
});

test('should correctly add up with a single expense', () => {
    const result = selectExpensesTotal([expenses[0]]);
    expect(result).toBe(expenses[0].amount);
});

test('should correctly add up with multiple expenses', () => {
    const result = selectExpensesTotal(expenses);
    expect(result).toBe(4700);
});

