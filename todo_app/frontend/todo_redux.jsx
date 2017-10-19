import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import {receiveTodos, receiveTodo} from './actions/todo_actions';
import configureStore from './store/store';
import {allTodos} from './reducers/selectors';


document.addEventListener('DOMContentLoaded', () => {
  //all window assignments are purely for testing purposes in console
  const store = configureStore(); //this func creates and returns store
  window.store = store; //testing
  window.receiveTodos = receiveTodos;
  window.receiveTodo = receiveTodo;
  window.allTodos = allTodos;
  //NB sometimes, Root needs info passed in
  //we do this with props below 'store' and 'kenta'
  //can pass in objects already created or just make it up/hard code it in here
  ReactDOM.render(<Root store={store} />, document.getElementById('content'));
});
