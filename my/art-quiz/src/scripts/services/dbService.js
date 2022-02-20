import { COUNT_QUESTION_IN_CATEGORIES, COUNT_RANDOM_ITEMS } from '../constants';
import { generateRandomNumbers, getCategoriesCoof, shuffleArr } from '../utils';

class Db {
  constructor() {
    this.db = {
      images: [],
      authors: [],
      results: {},
      currentQuestion: null,
      currentQuestionNumber: 0,
      currentCategories: 0,
      currentTypeCategories: '',
    };
  }

  setTypeQuestion(value) {
    this.db.currentTypeCategories = value;
  }

  getTypeQuestion() {
    return this.db.currentTypeCategories;
  }

  saveImagesArr(value) {
    this.db.images = value;
  }

  generateAutorsArray(initialImages) {
    this.db.authors = [...new Set(initialImages.map((item) => item.author))];
  }

  getCurrentCategories() {
    return this.db.currentCategories;
  }

  setCurrentCategories(i) {
    const coof = getCategoriesCoof(this.db.currentTypeCategories);
    this.db.currentCategories = i + coof;
  }

  setCurrentQuestionNumber() {
    this.db.currentQuestionNumber += 1;
  }

  resetCurrentQuestionNumber(i) {
    this.db.currentQuestionNumber = i;
  }

  getCurrentQuestionNumber() {
    return this.db.currentQuestionNumber;
  }

  generateQuestionAuthors(categoriesNumber, questionNumber) {
    const coof = getCategoriesCoof(this.db.currentTypeCategories);
    const trueVariant = this.db.images[
      (categoriesNumber + coof) * COUNT_QUESTION_IN_CATEGORIES + questionNumber
    ];
    const excludeAuthor = this.db.authors.findIndex((item) => item === trueVariant.author);
    const variantsAnswer = [
      ...generateRandomNumbers(3, this.db.authors.length, trueVariant.author, excludeAuthor)
        .map((item) => this.db.authors[item]),
      trueVariant.author,
    ];
    const variantsPictureAnswer = [
      ...generateRandomNumbers(
        COUNT_RANDOM_ITEMS, this.db.images.length - 1, trueVariant.author, trueVariant.imageNum,
      )
        .map((item) => this.db.images[item].imageNum),
      trueVariant.imageNum,

    ];
    const result = {
      imageNumber: trueVariant.imageNum,
      trueAuthor: trueVariant.author,
      variantsAnswer: shuffleArr(variantsAnswer),
      variantsPictureAnswer: shuffleArr(variantsPictureAnswer),
      trueYear: trueVariant.year,
      trueName: trueVariant.name,
      currentCategories: categoriesNumber,
    };
    this.db.currentQuestion = result;
    return result;
  }

  generateVariants() {
    this.db.authors = images.map((item) => item.authors);
  }

  getVariants() {
    return this.db.variants;
  }

  setNewCategories() {
    this.db.currentQuestionNumber = 0;
  }

  getAllTrue() {
    return this.db.currentQuestion;
  }
}
const db = new Db();

export default db;
