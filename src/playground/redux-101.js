import {createStore} from 'redux';

// Action generators - functions that return action objects

const incrementCount = ({ incrementBy = 1} = {}) => ({ // destructure and set default
  type: 'INCREMENT',
  incrementBy: incrementBy
});
const decrementCount = ({ decrementBy = 1} = {}) => ({ // destructure and set default
  type: 'DECREMENT',
  decrementBy: decrementBy
});

const resetCount = () => ({
  type: 'RESET'
});

const setCount = ({ count } = {}) => ({
  type: 'SET',
  count: count
});


const countReducer = (state = {
  count: 0
}, action) => {

  switch (action.type) {
    case 'INCREMENT':
      const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      };
    case 'DECREMENT':
    const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
      return{
        count: state.count - decrementBy
      };
    case 'RESET':
      return{
        count: 0
      };
    case 'SET':
      const count = typeof action.count === 'number' ?  action.count : state.count;
      return{
        count: count
      };
    default:
      return state;
  }
};

const store = createStore(countReducer);


const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
//console.log(store.getState());

// Actions - an object that gets sent to the store

// I'd like to reset the count to zero
// I'd like to increment the count

store.dispatch(incrementCount({ incrementBy: 5}));

store.dispatch(resetCount());

store.dispatch(decrementCount({ decrementBy: 15}));

store.dispatch(setCount({ count: 256}));
