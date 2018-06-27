import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

//whenever matches 'path', render 'component'
//only 1 component inside BrowserRouter, so need a div to add multiple routes
//id is dynamic part, edit is static
//header does not have access to props as not configured as component of route
const AppRouter = () => (
    <BrowserRouter>
        <div>
        <Header></Header>
        <Switch>
            <Route path='/' component={ExpenseDashboardPage} exact={true}/>
            <Route path='/create' component={AddExpensePage}/>
            <Route path='/edit/:id' component={EditExpensePage}/>
            <Route path='/help' component={HelpPage}/>
            <Route component={NotFoundPage}/>
        </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;