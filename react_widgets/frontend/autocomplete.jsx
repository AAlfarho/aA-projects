import React from 'react';

export default class Autocomplete extends React.Component {
  constructor(props){
    super(props);
    this.state = { inputValue : "" };
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({inputValue: event.currentTarget.textContent});
  }

  handleInput(event) {
    this.setState({inputValue: event.currentTarget.value});
  }

  getMatches(inputValue) {
    return this.props.names.filter(el => {
      return el.toLowerCase().startsWith(inputValue.toLowerCase());
    });
  }

  render(){
    const {inputValue} = this.state;
    const people = this.getMatches(inputValue);

    return(
      <div className="box autocomplete">
        <h3>AUTOCOMPLETE!</h3>

        <input type="text" onChange={this.handleInput} value={inputValue}></input>
        <br />
        <ul className="people">
          {
            people.map( (el, idx) => (
              <li
                onClick={this.handleClick}
                key={el + '-' + idx}>{el}</li>
            ))
          }
        </ul>
      </div>

    );
  }
}
