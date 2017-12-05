import axios from 'axios';

import * as credentials from '../credentials/spotify';

class SpotifyService {
  static getImages() {
    return axios.get(`https://www.reddit.com/r/earthporn/top.json`);
  }
}

module.exports = SpotifyService;