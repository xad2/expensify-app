// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      console.log('ADD', action.expense);
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      console.log('REMOVE', action.expense);
      return state.filter( (expense) => 
        expense.id !== action.id 
      );
    case 'EDIT_EXPENSE':
      return state.map( (expense) => {
        if( expense.id === action.id ) {
          console.log('EDIT', action.updates);
          return {
            ...expense,
            ...action.updates // spread object
          };
        } else {
          return expense;
        };
      });
    default: return state;
  }
};

export default expensesReducer;