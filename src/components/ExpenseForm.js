import React from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

import moment from 'moment'; //moment.js

// const now = moment();
// console.log(now.format('MMM Do YYYY'));

//reusable in both add and edit pages
export default class ExpenseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props.expense ? moment((props.expense.createdAt)) : moment(), //initial value is current moment
            calendarFocused: false,
            error: ''
        }

    }

    //update description
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));

        //alternatively
        //e.persist()
        //this.setState(() => ({description: e.target.value}));
    }

    //update note
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    }

    //update amount
    onAmountChange = (e) => {
        const amount = e.target.value;
        //use regex => empty or 0*[.00]
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ amount }));
        }
    }

    //when a new date is picked
    onDateChange = (createdAt) => {
        //prevent date being cleared by user
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }

    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    }

    //when form is submitted
    onSubmit = (e) => {
        e.preventDefault(); //avoid full page refresh
        if (!this.state.description || !this.state.amount) {
            //render error
            this.setState(() => ({ error: 'Invalid input!' }));
        } else {
            //clear error
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, //append last 0 if necessary
                createdAt: this.state.createdAt.valueOf(), //convert moment object to timestamp in ms
                note: this.state.note
            });
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    type='text'
                    placeholder='Description'
                    autoFocus
                    value={this.state.description}
                    onChange={this.onDescriptionChange}
                    className="text-input"
                />
                <input
                    type='number'
                    placeholder='Amount'
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                    className="text-input"
                />
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false} //every day is available
                />
                <textarea
                    placeholder='Add note (optional)'
                    onChange={this.onNoteChange}
                    value={this.state.note}
                    className="text-area"
                >
                </textarea>
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>

        );
    }
}