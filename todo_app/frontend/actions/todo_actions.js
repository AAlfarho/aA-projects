export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_TODO = 'RECEIVE_TODO';
//exporting above because the reducers need access to them.


//The parenthesis outside the curly brackets black magic return statement
export const receiveTodos = (todos) => ({
  type: RECEIVE_TODOS,
  todos: todos
});

//This export only works with destructure
export const receiveTodo = (todo) => ({
  type: RECEIVE_TODO,
  todo: todo
});
