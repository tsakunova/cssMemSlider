import * as images from '../images.json';

export default () => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (images) {
      resolve(images);
    } else {
      reject(new Error('Loading question error!'));
    }
  }, 500);
});
