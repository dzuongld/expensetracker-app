import React from 'react';
import {Link} from 'react-router-dom';


//dispatch can be accessed with spread operator
const ExpenseListItem = ({ id, description,amount,createdAt}) => {
    return (
        <div>
            <Link to={`/edit/${id}`}>
                <p>{description}</p>
            </Link>
            <p>{amount}</p>
            <p>{createdAt}</p>
            
            <br />
        </div>
    );
};

export default ExpenseListItem;
