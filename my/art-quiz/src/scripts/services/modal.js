import { iconAnswer, modalWindowContainer } from '../selectors';
import { getCategoriesCoof } from '../utils';
import { startAudio } from './audio';

import db from './dbService';
import local from './localeStorageService';

export const showModal = (answer, answerPic) => {
  modalWindowContainer().classList.toggle('show-modal');
  const v = db.getAllTrue();
  if (answer === v.trueAuthor || answerPic === v.imageNumber) {
    startAudio(true);
    iconAnswer().style.background = 'url("assets/img/icons/check.png") no-repeat center/60% #91b780';
  } else {
    startAudio(false);
    iconAnswer().style.background = 'url("assets/img/icons/close.png") no-repeat center/60% #85315b';
  }
};

export const showRestartModal = (i) => {
  const coof = getCategoriesCoof(db.getTypeQuestion());
  local.setNewLocal(i, coof);
  db.setNewCategories();
};
