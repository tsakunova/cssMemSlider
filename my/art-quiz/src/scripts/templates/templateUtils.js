import { COUNT_CATEGORIES } from '../constants';
import { categoriesItems, modalResultStars, root } from '../selectors';
import { getCategoriesCoof } from '../utils';

export const changeInnerRoot = (htmlBlock) => {
  root.insertAdjacentHTML('afterbegin', htmlBlock);
};

export const begginerCategories = (v, type) => {
  const coficient = getCategoriesCoof(type);
  for (let i = 0; i < COUNT_CATEGORIES; i += 1) {
    if (v[i + coficient].length === 0) {
      categoriesItems()[i].classList.add('unactive');
    }
  }
};

export const viewBgImage = (src, block) => {
  const img = new Image();
  const currBlock = block;
  img.src = src;
  img.onload = () => {
    currBlock.style.backgroundImage = `url(${src})`;
  };
};

export const animateStars = () => {
  modalResultStars().forEach((item) => {
    item.addEventListner('onload', () => {
      item.classList.add('show-result');
    });
  });
};
