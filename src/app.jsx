require('normalize.css');
require('./newtab.css');

import React from 'react';
import ReactDOM from 'react-dom';

import RedditService from './services/reddit';
import QuoteService from './services/quote';

import Loader from './components/loader/loader.jsx';
import Image from './components/image/image.jsx';
import Quote from './components/quote/quote.jsx';

class Application extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      image: null,
    };

    RedditService.getImages().then((result) => {
      var images = result.data.data.children.map(child => {
        return {
          author: child.data.author,
          title: child.data.title,
          url: child.data.url,
          permalink: child.data.permalink,
          domain: child.data.domain,
        }
      }).filter((child) => { return child.domain !== 'flickr.com'; });

      var lastIndex = parseInt(localStorage.getItem('last-index'));
      lastIndex = (lastIndex !== null) ? lastIndex : -1;

      var index = (lastIndex + 1 ) < images.length ? lastIndex + 1 : 0; 
      let image = images[index];
      localStorage.setItem('last-index', index);

      this.setState(Object.assign(this.state, { image: image, loading: false }));
    });

    QuoteService.getQuote().then((result) => {
      this.setState(Object.assign(this.state, { quote: result.data.contents.quotes[0] }));
    });
  }
  render() {
    if (this.state.loading) {
      return (
        <Loader />
      );
    }
    
    return (
      <article>
        <Image 
          author={this.state.image.author} 
          title={this.state.image.title}
          permalink={this.state.image.permalink}
          url={this.state.image.url}
        />
        <Quote
          author={this.state.quote.author}
          quote={this.state.quote.quote}
        />
      </article>
    );
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);