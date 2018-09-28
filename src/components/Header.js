import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

//will show up on all pages
export const Header = ({startLogout}) => (
    <header>
        <h1>Expense Tracker</h1>
        <NavLink to='/dashboard' activeClassName="is-active">Dashboard</NavLink>
        <NavLink to='/create' activeClassName="is-active">Create Expense</NavLink>
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

//undefined because no need of state
export default connect(undefined, mapDispatchToProps)(Header);

//<NavLink to='/help' activeClassName="is-active">Help</NavLink>
                