import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

//whenever matches 'path', render 'component'
//only 1 component inside BrowserRouter, so need a div to add multiple routes
//id is dynamic part, edit is static
//header does not have access to props as not configured as component of route
//use router with separate history rather than browserrouter with history built in
const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path='/' component={LoginPage} exact={true} />
                <PrivateRoute path='/dashboard' component={ExpenseDashboardPage} />
                <PrivateRoute path='/create' component={AddExpensePage} />
                <PrivateRoute path='/edit/:id' component={EditExpensePage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;

//<Route path='/help' component={HelpPage}/>
                