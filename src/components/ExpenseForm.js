import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


const now = moment();

export default class ExpenseForm extends React.Component {
  
  constructor(props) {
    super(props); 
    
    this.state = { // might be getting from EditExpense or AddExpense
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? props.expense.amount.toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: '',
      editMode: props.expense ? true : false
    };
  }


  onDescrChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    // e.persist();
    this.setState(() => ({ note }));
  };
  onAmountChange = (e) => {
    const amount = e.target.value;
    if(!amount || amount.match(/^\d+(\.\d{0,2})?$/)){
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({createdAt}));
    }
  };

  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.description || !this.state.amount) {
      // set errpr state equal to 
      this.setState(() => ({error: 'Please provide description and amount'}));
    } else {
      this.setState(() => ({error: ''}));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount).toFixed(2),
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.error && <span >{this.state.error}</span>}
        <form onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder="Description"
            autoFocus 
            value={this.state.description}
            onChange={this.onDescrChange}
          />
          <input
            type="text"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker 
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={ () => false }
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
            />
          <button type="submit">{this.state.editMode ? 'Edit Expense' : 'Add Expense'}</button>
        </form>
      </div>
    );
  };
}