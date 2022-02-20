import './styles/main.scss';
import controllers from './scripts/controllers/controller';
import {
  loadQuestions,
} from './scripts/services/question-service';
import local from './scripts/services/localeStorageService';

controllers.renderMenuPage();
loadQuestions();
local.generateAllLocalStorage();
