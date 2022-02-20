import {
  restartModal,
  root,
  timeRange,
  timeRangeText,
  timerContainer,
  timerSettingCheckbox,
} from '../selectors';
import {
  addListnerQuestionPage,
  addListnerSettingPage,
  addListnerCategoriesPage,
  addListnersMenuPage,
  addListnerModal,
  addListnerCurrentScorePage,
} from '../listners';
import {
  categoriesPageContainer,
  menuPageContainer,
  questionPageContainer,
  settingPageContainer,
  drawStarResult,
  scoreCurrentCategoriesPage,
} from '../templates/templates';
import db from '../services/dbService';
import {
  begginerCategories,
  changeInnerRoot,
} from '../templates/templateUtils';
import local from '../services/localeStorageService';
import {
  getCategoriesCoof,
} from '../utils';
import {
  COUNT_QUESTION_IN_CATEGORIES,
} from '../constants';
import {
  handleRangeUpdate,
  muteStyle,
  startAudio,
} from '../services/audio';
import timer from '../services/timer';
import {
  checkAnswer,
} from '../services/question-service';
import {
  showModal,
} from '../services/modal';

class Controllers {
  resetContainer() {
    root.innerHTML = '';
  }

  renderMenuPage() {
    this.resetContainer();
    const html = menuPageContainer();
    changeInnerRoot(html);
    addListnersMenuPage();
  }

  renderCategoriesPage(variant) {
    timer.finishTimer();
    db.setNewCategories();
    this.resetContainer();
    const v = local.getLocalData();
    if (variant) {
      db.setTypeQuestion(variant);
    }
    const currentVariant = variant || db.getTypeQuestion();
    const countTrue = local.getLocalTrueAnswer(currentVariant);
    const html = categoriesPageContainer(countTrue);
    changeInnerRoot(html);
    document.querySelector('h2').innerHTML = `${currentVariant}s Categories`;
    begginerCategories(v, currentVariant);
    addListnerCategoriesPage();
  }

  renderSettingPage() {
    this.resetContainer();
    const storage = local.getLocalVolumeSetting();
    const html = settingPageContainer(storage);
    changeInnerRoot(html);
    handleRangeUpdate();
    muteStyle();
    const timerSet = local.getLocalTimerSetting();
    timerSettingCheckbox().setAttribute('checked', timerSet);
    const duration = local.getLocalCurrentTimeDuration();
    timer.setTimerDuration(duration);
    timeRange().value = duration;
    timeRangeText().innerHTML = duration;
    addListnerSettingPage();
  }

  renderAfterTimer() {
    showModal();
    checkAnswer();
  }

  renderQuizPage(i) {
    const coof = getCategoriesCoof(db.getTypeQuestion());
    const localQ = local.getLocalStorageCurrentCategories(i, coof).length;
    db.setCurrentCategories(i);
    db.resetCurrentQuestionNumber(localQ);
    const type = db.getTypeQuestion();
    const v = db.generateQuestionAuthors(i, localQ);
    const locArrCurrCat = local.getLocalStorageCurrentCategories(v.currentCategories, coof);

    const res = local.getLocalTrueAnswerResult(db.getTypeQuestion(), i);
    const isTimer = local.getLocalTimerSetting();
    const restart = locArrCurrCat.length === COUNT_QUESTION_IN_CATEGORIES;
    this.resetContainer();
    changeInnerRoot(questionPageContainer(v, locArrCurrCat, restart, res, type));
    if (isTimer) {
      timer.startTimer(() => this.renderAfterTimer(), timer.getTimeSet(), timerContainer());
    }
    if (restart) {
      restartModal().classList.add('show-modal');
      timer.finishTimer();
      startAudio('end');
      drawStarResult(res);
      addListnerModal(i);
    }
    addListnerQuestionPage(v.currentCategories);
    db.setCurrentQuestionNumber();
  }

  renderCurrentScorePage(i) {
    const coof = getCategoriesCoof(db.getTypeQuestion());
    db.setCurrentCategories(i);
    const v = db.getCurrentCategories();
    const locArrCurrCat = local.getLocalStorageCurrentCategories(i, coof);
    const html = scoreCurrentCategoriesPage(v, locArrCurrCat);
    this.resetContainer();
    changeInnerRoot(html);
    addListnerCurrentScorePage(i);
  }
}

export default new Controllers();
