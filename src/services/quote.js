import axios from 'axios';

import LocalStorageService from './localstorage.js';

class QuoteService {
  static getQuote() {

    if (LocalStorageService.quoteSavedDate === (new Date()).toDateString()) {
      return new Promise((resolve, reject) => {
        resolve(LocalStorageService.quote);
      });
    }

    return axios
      .get(`https://quotes.rest/qod.json`)
      .then(result => {
        let quote = result.data.contents.quotes[0];
        LocalStorageService.quote = quote;

        return quote;
      });
  }
}

module.exports = QuoteService;