import getQuestion from '../api';
import db from './dbService';
import local from './localeStorageService';

export const loadQuestions = () => {
  getQuestion().then((result) => {
    db.saveImagesArr(result);
    db.generateAutorsArray(result);
  });
};

export const checkAnswer = (item) => {
  const currentQ = db.getCurrentQuestionNumber();
  if (!item) {
    return local.setLocalStorageArr(db.getCurrentCategories(), currentQ, 'false');
  }
  const trueAnswer = db.getAllTrue();

  local.setLocalStorageArr(db.getCurrentCategories(), currentQ, `${(item.textContent === trueAnswer.trueAuthor || item.getAttribute('data-img') === trueAnswer.imageNumber)}`);
  return null;
};
