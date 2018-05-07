import moment from 'moment';

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'amount',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      console.log('TEXT_FILTER', action.text);
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      console.log('SORT_AMOUNT');
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      console.log('SORT_DATE');
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      console.log('START_DATE', action.startDate);
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      console.log('END_DATE', action.endDate);
      return {
        ...state,
        endDate: action.endDate
      };
    default: return state;
  }
};

export default filtersReducer;