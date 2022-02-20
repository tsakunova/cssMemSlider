import { COOFICIENT_CATEGORIES, COUNT_CATEGORIES } from './constants';

export const generateNumber = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const generateRandomNumbers = (count, maxItems, trueAuthor, exclude) => {
  const arrRandom = [];
  while (arrRandom.length < count) {
    const variant = generateNumber(0, maxItems - 1);
    if ((!arrRandom.includes(variant)) && variant !== exclude && variant !== trueAuthor) {
      arrRandom.push(variant);
    }
  }
  return arrRandom;
};

export const shuffleArr = (arr) => {
  const copyArr = [...arr];
  for (let i = copyArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
  }

  return arr;
};

export const getCategoriesCoof = (type) => (type === COOFICIENT_CATEGORIES.author
  ? 0
  : COUNT_CATEGORIES);

export const starGenerator = (countTrueAnswers) => ((countTrueAnswers === 0)
  ? countTrueAnswers
  : Math.floor((countTrueAnswers + 1) / 3));
