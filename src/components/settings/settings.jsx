import React from 'react';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false;
    };
  }

  render() {
    return (<button>SETTINGS</button);
  }
}

module.exports = Settings;