import React from 'react';
import ReactDOM from 'react-dom';
import Container from './frontend/container';


document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  // ReactDOM.render(<Clock />, root);
  // ReactDOM.render(<Weather />, root);
  // ReactDOM.render(<Autocomplete names={names}/>, root);
  ReactDOM.render(<Container />, root);
});
