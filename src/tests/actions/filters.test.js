import {setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter} from '../../actions/filters';
import moment from 'moment';

test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    });
});

test('should generate sort by amount action object',() => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT',
        sortBy: 'amount'
    });
});

test('should generate sort by date action object',() => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE',
        sortBy: 'date'
    });
});

test('should generate set text filter action object',() => {
    const text = 'some text';
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: text
    });
});

test('should generate set text filter action object',() => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

