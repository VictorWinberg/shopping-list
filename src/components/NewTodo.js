import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTodo extends Component {
  constructor(props) {
    super(props);

    this.state = { todo: '' };
  }

  handleSubmit(event) {
    const { todo } = this.state;
    const { onNewTodoClick } = this.props;

    onNewTodoClick(todo);
    this.setState({ todo: '' });
    event.preventDefault();
  }

  render() {
    const { todo } = this.state;

    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <label htmlFor="newItem">
          <img
            className="add_icon"
            alt="add"
            src="/icons/add_icon.png"
            height="14px"
          />
        </label>
        <input
          id="newItem"
          type="text"
          value={todo}
          placeholder="New todo..."
          onChange={event => this.setState({ todo: event.target.value })}
        />
        <img
          className="clear_icon"
          alt="X"
          src="/icons/clear_icon.png"
          height="14px"
        />
      </form>
    );
  }
}

NewTodo.propTypes = {
  onNewTodoClick: PropTypes.func.isRequired,
};

export default NewTodo;
