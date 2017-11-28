import axios from 'axios';

class RedditService {
  static getImages() {
    return axios.get(`https://www.reddit.com/r/earthporn/top.json`);
  }
}

module.exports = RedditService;