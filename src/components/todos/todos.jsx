import React from 'react';
import TodoService from '../../services/todo';

import Todo from './todo.jsx';
require('./todos.css')

class Todos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <article className="todos container">
        <h1>todos</h1>
      </article>
    );
  }
}

module.exports = Todos;