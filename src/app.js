import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore();
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

store.dispatch(addExpense({description:'water bill',amount:100, createdAt:1000 }));
store.dispatch(addExpense({description:'gas bill',amount:1000, createdAt:0 }));
store.dispatch(addExpense({description:'rent',amount:500, createdAt:-100 }));

// store.dispatch(setTextFilter('bill'));
// store.dispatch(setTextFilter('water'));

//linking react and redux
const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
    
);

ReactDOM.render(jsx, document.getElementById('app'));
