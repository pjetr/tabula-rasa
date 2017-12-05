
export default class LocalStorageService {
  
  static get PREFIX() {
    return 'tabula_rasa_';
  }
  static get QOD() {
    return LocalStorageService.PREFIX + 'qod';
  }
  static get QOD_DATE() {
    return LocalStorageService.PREFIX + 'qod_date';
  }
  static get FETCH_TIME() {
    return LocalStorageService.PREFIX + 'fetch_time';
  }
  static get IMAGES() {
    return LocalStorageService.PREFIX + 'images';
  }
  static get IMAGE_INDEX() {
    return LocalStorageService.PREFIX + 'image_index';
  }

  static get quoteSavedDate() {
    return localStorage.getItem(LocalStorageService.QOD_DATE);
  }

  static get quote() {
   return JSON.parse(localStorage.getItem(LocalStorageService.QOD)); 
  }
  static set quote(quote) {
   localStorage.setItem(LocalStorageService.QOD_DATE, (new Date()).toDateString()); 
   
   localStorage.setItem(LocalStorageService.QOD, JSON.stringify(quote)); 
  }

  static get lastFetch() {
    return parseInt(localStorage.getItem(LocalStorageService.FETCH_TIME) || 0);
    
  }
  static set lastFetch(value) {
    localStorage.setItem(LocalStorageService.FETCH_TIME, value); 
  }

  static get images() {
    return JSON.parse(localStorage.getItem(LocalStorageService.IMAGES));
  }

  static set images(images) {
    LocalStorageService.lastFetch = Date.now();

    localStorage.setItem(LocalStorageService.IMAGES, JSON.stringify(images));
  }

  static get imageIndex() {
    return parseInt(localStorage.getItem(LocalStorageService.IMAGE_INDEX) || -1) + 1
  }
  static set imageIndex(index) {
    localStorage.setItem(LocalStorageService.IMAGE_INDEX, index)
  }
}