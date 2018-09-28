import React from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import Header from '../components/Header';

//destucturing
export const PrivateRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest //stuff not destructured, could be named anything other than 'rest'
}) => (
    <Route {...rest} component={(props)=> (
        isAuthenticated ? (
            <div>
                <Header/>
                <Component {...props}></Component>
            </div>
        ) :(
            <Redirect to="/"/>
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated : !!state.auth.uid //convert to boolean
});

export default connect(mapStateToProps)(PrivateRoute);