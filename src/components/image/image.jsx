import React from 'react';
import _ from 'lodash';

require('./image.css');

class Image extends React.Component {

  constructor(props) {
    super(props);

    let url = this.props.url;

    if (this.props.url.match(/^https:\/\/imgur.com/) !== null) {
      url = this.props.url.replace(/^https:\/\/imgur.com/, 'https://i.imgur.com') + '.jpg'
    }


    let dimensionsResult = props.title.match(/\[? ?(\d+) ?x ?(\d+) ?\]?/);
    let dimensions = {
      width: 0,
      height: 0,
    };

    if (dimensionsResult !== null) {
      dimensions.originalWidth = parseInt(dimensionsResult[1]);
      dimensions.originalHeight = parseInt(dimensionsResult[2]);
      dimensions.ratio = dimensions.originalWidth / dimensions.originalHeight;
      dimensions.width = window.innerWidth;
      dimensions.height = window.innerWidth * dimensions.ratio;

      if (dimensions.height < window.innerHeight) {
        dimensions.height = window.innerHeight;
        dimensions.width = window.innerHeight * dimensions.ratio;
      }
    }

    this.state= {
      dimensions: dimensions,
      url: url,
    };
  }

  updateDimensions() {
    let dimensions = Object.assign(this.state.dimensions);

    dimensions.ratio = dimensions.originalWidth / dimensions.originalHeight;
    dimensions.width = window.innerWidth;
    dimensions.height = window.innerWidth / dimensions.ratio;

    if (dimensions.height < window.innerHeight) {
      dimensions.height = window.innerHeight;
      dimensions.width = window.innerHeight * dimensions.ratio;
    }

    this.setState({
      width: window.innerWidth, 
      height: window.innerHeight, 
      dimensions: dimensions,
    });
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", () => { this.updateDimensions(); });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", ()=>{ this.updateDimensions; });
  }

  render() {
    return (
      <article>
        <section className="image-background">
          <div style={{
            backgroundImage: `url(${this.state.url})`, 
            width: this.state.dimensions.width, 
            height: this.state.dimensions.height,
            backgroundSize: this.state.dimensions.width + 'px ' + this.state.dimensions.height + 'px ',
          }} />
        </section>
        <div className="image-container container">
          <img src={require('../../assets/reddit.svg')} alt="From Reddit:" height="22" />
          <a className="title" href={'https://reddit.com'+this.props.permalink} target="_BLANK">{this.props.title}</a>
          <div className="author">{this.props.author}</div>
        </div>
        <p>{this.state.width} x {this.state.height}</p>
      </article>
      );
  }
}

module.exports = Image;