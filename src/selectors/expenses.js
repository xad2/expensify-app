import moment from 'moment';

// Get visible expenses (filter)
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense, index) => {
    const createdAtMoment = moment(expense.createdAt);
    
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;

    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

    const textMatch = expense.description.toLowerCase().trim().includes(text.toLowerCase().trim());


    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => { // if return is -1 put a before b, else if a return 1 put b before a, else return same 
    if (sortBy === 'date'){ // if a < b return 1, else a > b return 1, else a = b return 0
      return a.createdAt < b.createdAt? 1 : -1; // from latest 
    }else if( sortBy === 'amount'){
      return a.amount < b.amount? 1 : -1; // from greatest to lowest
    }
  });
};

export default getVisibleExpenses;