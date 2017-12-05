import React from 'react';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    return (<button>Todo</button>);
  }
}

module.exports = Todo;