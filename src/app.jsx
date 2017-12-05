require('normalize.css');
require('./newtab.css');

import React from 'react';
import ReactDOM from 'react-dom';

import RedditService from './services/reddit';
import QuoteService from './services/quote';

import Loader from './components/loader/loader.jsx';
import Image from './components/image/image.jsx';
import Quote from './components/quote/quote.jsx';
import Todos from './components/todos/todos.jsx';

const fallback = require('./assets/fallback.jpg');

class Application extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      image: {
        url: fallback,
        domain: 'local',
        title: 'Sunset, crashing waves, and solitude on the Washington coast [OC][3000x2000]',
        author: 'Protophobic',
        permalink: 'https://www.reddit.com/r/EarthPorn/comments/7g1ixs/sunset_crashing_waves_and_solitude_on_the/',
      },
    };

    RedditService.getImage()
    .then((image) => {
      console.info(image);
      this.setState({ image: image });
      
      return QuoteService.getQuote();
    })
    .then((result) => {
      this.setState({ quote: result });
    })
    .catch( (err) => {
      console.warn(err);
      this.setState({ error: err });
    })
    .then(() => {
      this.setState({ loading: false });
    });
  }
  render() {
    return (
      <article>
        <Loader loading={this.state.loading} />
        <Image 
          author={this.state.image.author}
          domain={this.state.image.domain}
          permalink={this.state.image.permalink}
          title={this.state.image.title}
          url={this.state.image.url}
        />
        <Quote
          quote={this.state.quote}
        />
        <Todos />
      </article>
    );
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);