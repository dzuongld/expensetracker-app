import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

//dispatch can be accessed with spread operator
const ExpenseListItem = ({ id, description,amount,createdAt}) => {
    return (
        <div>
            <Link to={`/edit/${id}`}>
                <p>{description}</p>
            </Link>
            <p>{numeral(amount/100).format('$0,0.00')}</p>
            <p>{moment(createdAt).format('DD-MM-YYYY')}</p>
            
            <br />
        </div>
    );
};

export default ExpenseListItem;
