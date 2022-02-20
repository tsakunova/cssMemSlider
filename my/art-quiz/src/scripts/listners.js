import controllers from './controllers/controller';
import {
  categoriesBtnHome,
  menuBtnPainterQuiz,
  menuBtnPictureQuiz,
  settingBtnSave,
  menuBtnSettingQuiz,
  btnBackCategories,
  categoriesItems,
  nextQuestionBtn,
  questionItems,
  restartModalBtn,
  backModalBtn,
  volumeBigBtn,
  volumeSettingRange,
  audio,
  settingBtnDefault,
  timerSettingCheckbox,
  timeRange,
  timeRangeText,
  scoreItems,
  currentScoreContainer,
  modalWrapper,
  scoreItemsBtn,
} from './selectors';
import {
  generateDefaultSetting,
  handleRangeUpdate,
  muteBtnChange,
  stopPlay,
} from './services/audio';
import db from './services/dbService';
import local from './services/localeStorageService';
import {
  showModal,
  showRestartModal,
} from './services/modal';
import {
  checkAnswer,
} from './services/question-service';
import timer from './services/timer';
import {
  modalCorrectOption,
} from './templates/templates';

export const addListnersMenuPage = () => {
  menuBtnPainterQuiz().addEventListener('click', () => controllers.renderCategoriesPage('author'));
  menuBtnPictureQuiz().addEventListener('click', () => controllers.renderCategoriesPage('picture'));
  menuBtnSettingQuiz().addEventListener('click', () => controllers.renderSettingPage());
};

export const addListnerCategoriesPage = () => {
  categoriesBtnHome().addEventListener('click', () => controllers.renderMenuPage());
  categoriesItems().forEach((item, index) => {
    item.addEventListener('click', () => {
      controllers.renderQuizPage(index);
    });
  });
  scoreItemsBtn().forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      controllers.renderCurrentScorePage(index);
    });
  });
};

export const addListnerSettingPage = () => {
  settingBtnSave().addEventListener('click', () => controllers.renderMenuPage());
  volumeBigBtn().addEventListener('click', () => {
    muteBtnChange();
  });
  volumeSettingRange().addEventListener('click', handleRangeUpdate);
  timeRange().addEventListener('click', () => {
    const val = Number(timeRange().value);
    timer.setTimerDuration(val);
    timer.getTimerDuration(timeRange(), timeRangeText());
    local.setLocalCurrentTimeDuration(val);
  });

  audio().addEventListener('ended', stopPlay);
  timerSettingCheckbox().addEventListener('change', () => {
    local.setLocalTimerSetting(timerSettingCheckbox().checked);
    timerSettingCheckbox().setAttribute('checked', timerSettingCheckbox().checked);
  });
  settingBtnDefault().addEventListener('click', generateDefaultSetting);
};

export const addListnerQuestionPage = (i) => {
  btnBackCategories().addEventListener('click', () => controllers.renderCategoriesPage());
  nextQuestionBtn().addEventListener('click', () => {
    if (local.getLocalTimerSetting()) {
      db.setCurrentQuestionNumber();
      controllers.renderQuizPage(i);
    } else controllers.renderQuizPage(i);
  });
  questionItems().forEach((item) => {
    item.addEventListener('click', () => {
      checkAnswer(item);
      showModal(item.innerHTML, item.getAttribute('data-img'));
    });
  });
};

export const addListnerModal = (i) => {
  backModalBtn().addEventListener('click', () => controllers.renderCategoriesPage());
  restartModalBtn().addEventListener('click', () => {
    showRestartModal(i);
    controllers.renderQuizPage(i);
  });
};

export const addListnerCurrentScorePage = (i) => {
  btnBackCategories().addEventListener('click', () => {
    controllers.renderCategoriesPage(db.getTypeQuestion());
  });
  scoreItems().forEach((item, index) => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('undefined')) {
        const trueVar = db.generateQuestionAuthors(i, index);
        const html = modalCorrectOption(trueVar);
        if (modalWrapper()) {
          currentScoreContainer().removeChild(modalWrapper());
        }
        currentScoreContainer().insertAdjacentHTML('beforeend', html);
        modalWrapper().classList.add('show-modal');
        nextQuestionBtn().addEventListener('click', () => {
          modalWrapper().classList.remove('show-modal');
        });
      }
    });
  });
};
