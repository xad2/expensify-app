import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    // this.props.editExpense(this.props.match.params.id, expense);
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };
  onClickRemove = () => {
    this.props.removeExpense(this.props.expense);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
      <p>Edit the expense with id of {this.props.expense.id}</p>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button type="submit" onClick={ this.onClickRemove }>Remove</button>
      </div>
    );   
  };
}



const mapStateToProps = (state, props) => { // gives ExpenseForm component current state to this.props
  return {
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (expense) => dispatch(removeExpense(expense)),
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);