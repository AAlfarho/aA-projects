import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', body: '', done: false };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitle(event) {
    this.setState({title: event.currentTarget.value});
  }

  handleBody(event) {
    this.setState({body: event.currentTarget.value});
  }

  handleCheckbox(event) {
    this.setState({done: event.currentTarget.checked});
  }

  handleSubmit(event){
    event.preventDefault();
    const todo = {
      id: this.uniqueId(),
      title: this.state.title,
      body: this.state.body,
      done: this.state.done
    };
    debugger;
    this.props.receiveTodo(todo);

  }

  uniqueId() {
    return new Date().getTime();
  }

  componentDidUpdate(){
    console.log(this.state);
  } //only for testing purposes

  render() {
    return(
      <form>
        <label>Title
          <input type="text" value={this.state.title} onChange={this.handleTitle}></input>
        </label>
        <label>Body
          <input type="text" value={this.state.body} onChange={this.handleBody}></input>
        </label>
        <label>Done?
          <input type="checkbox" onChange={this.handleCheckbox}></input>
        </label>

        <input type="submit" onClick={this.handleSubmit} value="Create Todo"></input>

      </form>
    );
  }

}

//{this.state.done ? "checked" : ""}

export default TodoForm;
