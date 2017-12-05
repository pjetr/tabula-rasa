import React from 'react';

require('./quote.css');

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (! this.props.quote) {
      return null;
    }

    return (
      <div className="quote-container container">
        <div className="quote">{this.props.quote.quote}</div>
        <div className="author">{this.props.quote.author}</div>
      </div>
    );
  }
}

module.exports = Quote;