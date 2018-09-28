import React from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

//destucturing
export const PublicRoute = ({
    isAuthenticated, 
    component: Component,
    ...rest //stuff not destructured, could be named anything other than 'rest'
}) => (
    <Route {...rest} component={(props)=> (
        isAuthenticated ? (
            <Redirect to="/dashboard"/>
        ) : (
            <Component {...props}></Component>
        )
    )}/>
);

const mapStateToProps = (state) => ({
    isAuthenticated : !!state.auth.uid //convert to boolean
});

export default connect(mapStateToProps)(PublicRoute);