import axios from 'axios';

class QuoteService {
  static getQuote() {
    return axios.get(`https://quotes.rest/qod.json`);
  }
}

module.exports = QuoteService;