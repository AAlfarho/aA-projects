import {combineReducers} from 'redux';
//necessary in order to combine reducers into root reducers
//again have to destructure because we only want this specific
 import todosReducer from './todos_reducer';

 const rootReducer = combineReducers({
   todos: todosReducer
 });

 export default rootReducer;
