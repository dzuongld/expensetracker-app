import React from 'react';

//edit existing expenses
//react-router passes props in and some can be useful
const EditExpensePage = (props) => (
    <div>
        Edit expense id of {props.match.params.id}
    </div>
);

export default EditExpensePage;