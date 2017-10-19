import React from 'react';
import Clock from './clock';
import Weather from './weather';
import Autocomplete from './autocomplete';
import Tabs from './tabs';

const names = ["Andres", "Betty", "Brian", "Carmen", "Jimmy", "Kenta", "Rebekah"];
const tabs = [{title: 1, content: "this is uno"},
  {title: 2, content: "this is dos"},
  {title: 3, content: "this is tres"}];
const Container = () => (
  <div>
    NEW CONTAINER
    <Clock />
    <Weather />
    <Autocomplete names={names} />
    <Tabs tabs={tabs}/>
  </div>
);

export default Container;
