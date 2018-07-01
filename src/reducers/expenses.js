//expenses reducer
const expenseReducerDefault = [];
const expenseReducer = (state=expenseReducerDefault, action) => {
    switch (action.type){
        case 'ADD_EXPENSE':
            //add to state list and return new instead of modifying existing values
            //use spread operator
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            //filter does not modify state - instead return a new one
            return state.filter(({id}) => {
                return id !== action.id;
            });
        case 'EDIT_EXPENSE':
            //go thru all expenses and find a match
            //update the match
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
}

export default expenseReducer;