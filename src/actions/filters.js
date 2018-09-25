
//SET TEXT FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//SORT BY DATE
export const sortByDate = (sortBy = 'date') => ({
    type: 'SORT_BY_DATE',
    sortBy
});

//SORT BY AMOUNT
export const sortByAmount = (sortBy = 'amount') => ({
    type: 'SORT_BY_AMOUNT',
    sortBy
});

//SET START DATE
export const setStartDate = (startDate = undefined)  => ({
    type: 'SET_START_DATE',
    startDate
});

//SET END DATE
export const setEndDate = (endDate = undefined)  => ({
    type: 'SET_END_DATE',
    endDate
});