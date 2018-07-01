//filter reducer

import moment from 'moment';

const filterReducerDefault = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'), //beginning of current month
    endDate: moment().endOf('month') //end of current month
};
const filterReducer = (state=filterReducerDefault, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
}

export default filterReducer;