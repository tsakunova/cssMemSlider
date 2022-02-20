import {
  COUNT_QUESTION_IN_CATEGORIES,
} from '../constants';
import { modalResultStars } from '../selectors';
import { starGenerator } from '../utils';

/* eslint-disable no-undef */
const footerPage = () => `
<footer class="footer-menu-page">
<ul class="footer-list">
  <li><a href="https://github.com/tsakunova" target="_blank"><i class="fab fa-github-square" aria-hidden="true"></i></a>
  </li>
  <li>2021</li>
  <li><a href="https://rs.school/js/" target="_blank"><img src="https://rs.school/images/rs_school_js.svg" alt="rs-logo"></a></li>
</ul>
</footer>
`;
export const menuPageContainer = () => `<div class="menu-container">
<header class="header-menu-page">
<h1 class="logo"></h1>
</header>
<main class="main-menu-page">
<div class="menu-btn-painter-quiz menu-btn"><p>Artists <span>Quiz</span></p></div>
<div class="menu-btn-picture-quiz menu-btn"><p>Pictures <span>Quiz</span></p></div>
</main>
<div class="menu-btn-setting-quiz">Settings</div>
${footerPage()}
</div>`;

export const settingPageContainer = (v) => `
<div class="setting-container">
      <header class="header-setting-page">
      <h1 class="logo"></h1>
      <h2>Settings</h2>
      </header>
      <main class="main-setting-page">
      <div class="setting-volume-container setting">
        <div class="volume-img"></div>
        <div class="range-volume">
          <div class="volume-icon"></div>
          <input type="range" name="volume" id="volume-setting" value="${v}" min="0" max="1" step="0.1">
        </div>
      <h3>Volume</h3>
      </div>
      <div class="setting-time-container setting">
        <div class="timer-img"></div>
        <div class="checkbox-timer">
          <input type="checkbox" name="timer" id="timer-setting">
          <label for="timer-setting">
            
          </label>
          
        </div>
        <div class="time-range-container">
        <p class="time-range-text"></p>
        <input type="range" name="time-range" id="time-range" value="5" min="5" max="30" step="5">
        </div>
        
        <p>on/off</p>
        <h3>Time game</h3>
      </div>
      
      </main>
      <div class="setting-buttons">
        <div class="setting-btn-save">
        Save</div>
        <div class="setting-btn-default">
          Default</div>
      </div>
       ${footerPage()}
    </div>
   `;

const getCategoriesPageItem = (num, arr) => `<div class="categories-item">
    <div class='num-categories'>
      <div class="number-item">${num}</div>
      
      <div class="item-btn-score"><div class="question-on-item">Score: <span class="question-answered">${arr}</span>/<span class="amount-questions">10</span></div></div>
    </div> 
    <div class="categories-item-bg" style="background-image: url('assets/img/categories-img/${num}.jpg')"></div>
</div>`;

const getCategoriesPageItems = (arr) => {
  const container = document.createElement('main');
  container.classList.add('main-categories-page');
  for (let i = 1; i < 13; i += 1) {
    container.insertAdjacentHTML('beforeend', getCategoriesPageItem(i, arr[i - 1]));
  }
  return container.outerHTML;
};

export const categoriesPageContainer = (arr) => `<div class="categories-container">
    <header class="header-categories-page">
    <div>
     <div class="categories-page-home-btn categories-page-btn">Home</div>
     <h2>Categories</h2>
     <div class="logo"></div>
    </div>
   
    </header>
    ${getCategoriesPageItems(arr)}
    ${footerPage()}
  </div>`;

const getQuestionPageItem = (author) => `<div class="question-item">${author}</div>`;

export const getQuestionPageItems = (authors) => {
  const container = document.createElement('div');
  container.classList.add('question-items');
  [...authors].forEach((_, index) => {
    container.insertAdjacentHTML('beforeend', getQuestionPageItem(authors[index]));
  });
  return container.outerHTML;
};

export const modalCorrectOption = ({
  imageNumber,
  trueYear,
  trueName,
  trueAuthor,
}) => `
<div class="modal-wrapper">
 <div class="icon-answer"></div>
    <div class="img-correct-variant">
      <img src="assets/img/question-images/img/${imageNumber}.jpg" alt="true">
    </div>
    <div>
      <p>${trueAuthor}</p>
      <p>${trueName}</p>
      <p>${trueYear} г.</p>
    </div>
    
    <div class="next-question-btn">Next</div>
</div>
   
`;

export const getQuestionPageModal = (value) => {
  const container = document.createElement('div');
  container.classList.add('modal-window-container');
  container.insertAdjacentHTML('beforeend', modalCorrectOption(value));
  return container.outerHTML;
};

export const questionSliderCircle = (arr) => {
  const container = document.createElement('div');
  container.classList.add('question-slider');
  Array.from({ length: COUNT_QUESTION_IN_CATEGORIES }).forEach((_, index) => {
    container.insertAdjacentHTML('beforeend', `<div class="slider-item ${arr[index]}"></div>`);
  });
  return container.outerHTML;
};
const getQuestionPicturePageItem = (pic) => `<div class="question-item" style="background-image:url('assets/img/question-images/full/${pic}full.jpg')" data-img='${pic}'></div>`;

const getQuestionPicturePageItems = (pics) => {
  const container = document.createElement('div');
  container.classList.add('question-items-pics');
  for (let i = 0; i < pics.length; i += 1) {
    container.insertAdjacentHTML('beforeend', getQuestionPicturePageItem(pics[i]));
  }
  return container.outerHTML;
};
const questionAboutAuthor = (variant, imageNumber, local) => `<main class="main-question-page">
    <div class="header-question-page">
     <h2 class="new-question">Кто автор этой картины?</h2>
    </div>
  <div class="img-question-author" style="background-image: url('assets/img/question-images/full/${imageNumber}full.jpg');">
  
  </div>
  
  ${questionSliderCircle(local)}
  ${getQuestionPageItems(variant)}
  
  </main>`;

const questionAboutPicture = (variants, trueAuthor, local) => `<main class="main-question-page">
  <div class="header-question-page">
   <h2 class="new-question">Какую из картин написал ${trueAuthor}</h2>
  </div>
${getQuestionPicturePageItems(variants)}

${questionSliderCircle(local)}


</main>`;

export const drawStarResult = (res) => {
  const countStars = starGenerator(res);
  modalResultStars().forEach((item, index) => {
    setTimeout(() => {
      if (index < countStars) {
        // eslint-disable-next-line no-param-reassign
        item.style.backgroundImage = "url('assets/img/icons/starOn.png')";
      } else {
        // eslint-disable-next-line no-param-reassign
        item.style.backgroundImage = "url('assets/img/icons/star.png')";
      }
      item.classList.add('show-result');
    }, 100 * index);
  });
};

export const restartModalContainer = (result) => `
<div class="restart-wrapper">
<div class="result">Result</div>
<div class="result-info">${result} / ${COUNT_QUESTION_IN_CATEGORIES}</div>
<div class="result-images">
  <div class="modal-result-img"></div>
  <div class="modal-result-img"></div>
  <div class="modal-result-img"></div>
</div>
    <div class="restart-modal-btn">Restart</div>
    <div class="back-modal-btn">Back</div>
</div>
    
`;

export const getRestartModal = (isTrue, result) => {
  if (isTrue) {
    const container = document.createElement('div');
    container.classList.add('restart-modal');
    container.insertAdjacentHTML('beforeend', restartModalContainer(result));
    return container.outerHTML;
  }

  return '';
};

export const questionPageContainer = (variant, local, isTrue, result, type) => {
  const {
    variantsAnswer,
    variantsPictureAnswer,
    currentCategories,
    imageNumber,
    trueAuthor,
  } = variant;
  return `<div class='question-page-container'>
  <header class="menu-question-page">
    <div class="btn-back-categories">Back</div>
    <div class="timer"></div>
    <div class="current-categories">${currentCategories + 1}</div>
  </header>
${(type === 'author')
    ? questionAboutAuthor(variantsAnswer, imageNumber, local)
    : questionAboutPicture(variantsPictureAnswer, trueAuthor, local)}
${getRestartModal(isTrue, result)}
${getQuestionPageModal(variant)}
</div>`;
};

const scoreItemsRender = (localArr, variant) => {
  const container = document.createElement('div');
  container.classList.add('score-items');
  Array.from({ length: COUNT_QUESTION_IN_CATEGORIES }).forEach((_, i) => {
    const block = document.createElement('div');
    block.style.backgroundImage = `url('assets/img/question-images/img/${variant * COUNT_QUESTION_IN_CATEGORIES + i}.jpg')`;
    block.classList.add('score-item');
    block.classList.add(`${localArr[i]}`);
    const span = document.createElement('span');
    span.innerHTML = `${i + 1}`;
    block.insertAdjacentHTML('beforeend', span.outerHTML);
    container.insertAdjacentHTML('beforeend', block.outerHTML);
  });
  return container.outerHTML;
};

export const scoreCurrentCategoriesPage = (variant, localArr) => `
  <div class='current-score-container'>
  <header class="menu-score-page">
    <div class="btn-back-categories">Back</div>
    <h2>Score - category ${variant + 1}</h2>
    <div class="current-categories">${variant + 1}</div>
  </header>
  ${scoreItemsRender(localArr, variant)}
  </div>
  `;
