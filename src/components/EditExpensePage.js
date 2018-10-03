import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

//edit existing expenses
//react-router passes props in and some can be useful
// const EditExpensePage = (props) => (
//     <div>
//         <ExpenseForm
//             expense={props.expense}
//             onSubmit={(expense) => {
//                 //dispatch action to edit the expense
//                 //redirect to dashboard
//                 props.dispatch(editExpense(props.expense.id, expense));
//                 props.history.push('/');
//             }}
//         />
//         <button onClick={() => {
//             props.dispatch(removeExpense({ id: props.expense.id }));
//             props.history.push('/');
//         }}>Remove</button>
//     </div>
// );

export class EditExpensePage extends React.Component {

    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    }

    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button 
                        className='button--secondary'
                        onClick={this.onRemove}
                    >Remove Expense
                    </button>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return ({
        expense: state.expenses.find((expense) => { //find the matching expense
            return expense.id === props.match.params.id;
        })
    });
}

const mapDispatchToProps = (dispatch,props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);