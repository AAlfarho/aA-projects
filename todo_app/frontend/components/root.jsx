
import React from 'react';
import {Provider} from 'react-redux';
import App from './app';
//can export at the same time as creating, doesnt have to be at bottom

//black magic stuff no need to understand under the hood
//the provider tags takes the store and makes it available to all the children of App
const Root = ({ store }) => (
  <Provider store={store}>
    <App /> 
  </Provider>
);

export default Root;
//props are ways to pass info, data from parents to child classes
// here(and in to_redux), Root is being passed the store

//NB: if exporting inline like above , its not default, so the import
//has to be destructured, using a single element {importing thingy}
