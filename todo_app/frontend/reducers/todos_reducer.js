
import merge from 'lodash/merge';
import {RECEIVE_TODOS, RECEIVE_TODO} from '../actions/todo_actions';
//destructuring is necessary above, means specifying components of the import
//file to import. Necessary because theres no default export,
//if we do it normally, it will grab the container file but not the internal functions

//default
const initialState = {
  1: {
    id: 1,
    title: 'wash car',
    body: 'with soap',
    done: false
  },
  2: {
    id: 2,
    title: 'wash dog',
    body: 'with shampoo',
    done: true
  },
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TODOS:
      const newState = {};
      action.todos.forEach((todo) => {
        newState[todo.id] = todo;
      });
      return newState;
    case RECEIVE_TODO:
      const nextState = merge({}, state);
      nextState[action.todo.id] = action.todo;
      return nextState;
    default:
      return state;
  }
};

export default todosReducer;
