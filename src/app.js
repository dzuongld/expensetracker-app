import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
// import {addExpense} from './actions/expenses';
// import {setTextFilter} from './actions/filters';
// import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
// import './test/promises';

const store = configureStore();
// console.log("test");

// store.subscribe(() => {
//     const state = store.getState();
//     const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);
// });

// store.dispatch(addExpense({description:'water bill',amount:100, createdAt:1000 }));
// store.dispatch(addExpense({description:'gas bill',amount:1000, createdAt:0 }));
// store.dispatch(addExpense({description:'rent',amount:500, createdAt:-100 }));

// store.dispatch(setTextFilter('bill'));
// store.dispatch(setTextFilter('water'));

//linking react and redux
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>

);

//to verify the app is rendered only once
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered =true;
    }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));


//when authentication changes
//only run once when the app loads
firebase.auth().onAuthStateChanged((user) => {
    //if logged in
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();

            //only redirect if on login page
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/'); //redirect to login page regardless of location
    }
});
