export default (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount,0);
    return total;
}