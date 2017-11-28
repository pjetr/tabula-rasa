import React from 'react';

require('./quote.css');

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="quote-container container">
        <div className="quote">{this.props.quote}</div>
        <div className="author">{this.props.author}</div>
      </div>
    );
  }
}

module.exports = Quote;