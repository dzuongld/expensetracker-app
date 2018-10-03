import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

//login page, will be shown first
export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expense Tracker</h1>
            <p>Keep your expenses under control and spend responsibly.</p>
            <button className="btn-google" onClick={startLogin}>
                
            </button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);