import axios from 'axios';

import LocalStorageService from './localstorage.js';

class RedditService {
  static getImages() {
    return new Promise((resolve, reject) => {
      if (LocalStorageService.lastFetch > Date.now() - 3600000) {
        resolve(LocalStorageService.images);
      } else {
        axios
          .get(`https://www.reddit.com/r/earthporn/top.json`)
          .then(result => {
            LocalStorageService.images = result.data.data.children.map(child => {
              
              let url = child.data.url;
              if (child.data.domain === 'imgur.com') {
                url = child.data.url.replace('imgur.com', 'i.imgur.com') + '.jpg'
              }

              return {
                author: child.data.author,
                title: child.data.title,
                url: url,
                permalink: child.data.permalink,
                domain: child.data.domain,
              }
            }).filter((child) => { return child.domain !== 'flickr.com'; });

            resolve(LocalStorageService.images);
          });
      }
    });
    
  }

  static getImage() {
    return new Promise((resolve, reject) => {
      let index = LocalStorageService.imageIndex;

      RedditService.getImages().then(images => {
        if (index >= images.length) {
          LocalStorageService.imageIndex = -1;
          index = 0;
        }

        resolve(images[index]);
        LocalStorageService.imageIndex = index;
      });      
    });
  }
}

module.exports = RedditService;