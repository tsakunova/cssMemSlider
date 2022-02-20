import { getCategoriesCoof } from '../utils';

class Local {
  generateLocalStorage() {
    if (!localStorage.getItem('categoriesResults')) {
      localStorage.setItem('categoriesResults', JSON.stringify(Array.from({ length: 24 }, () => [])));
    }
  }

  generateSettingVolumeLocalStorage() {
    if (!localStorage.getItem('volume')) {
      localStorage.setItem('volume', JSON.stringify(0.5));
    }
  }

  generateDurationLocalStorage() {
    if (!localStorage.getItem('timer-duration')) {
      localStorage.setItem('timer-duration', JSON.stringify(5));
    }
  }

  generateSettingTimerLocalStorage() {
    if (!localStorage.getItem('timer')) {
      localStorage.setItem('timer', JSON.stringify(false));
    }
  }

  generateAllLocalStorage() {
    this.generateSettingTimerLocalStorage();
    this.generateDurationLocalStorage();
    this.generateSettingVolumeLocalStorage();
    this.generateLocalStorage();
  }

  setSettingVolume(value) {
    let localVol = this.getLocalVolumeSetting();
    localVol = value;
    localStorage.setItem('volume', JSON.stringify(localVol));
  }

  getLocalVolumeSetting() {
    return JSON.parse(localStorage.getItem('volume'));
  }

  getLocalTimerSetting() {
    return JSON.parse(localStorage.getItem('timer'));
  }

  setLocalTimerSetting(value) {
    let localTimer = this.getLocalTimerSetting();
    localTimer = value;
    localStorage.setItem('timer', JSON.stringify(localTimer));
  }

  getLocalCurrentTimeDuration() {
    return JSON.parse(localStorage.getItem('timer-duration'));
  }

  setLocalCurrentTimeDuration(value) {
    let localDuration = this.getLocalCurrentTimeDuration();
    localDuration = value;
    localStorage.setItem('timer-duration', JSON.stringify(localDuration));
  }

  getLocalData() {
    return JSON.parse(localStorage.getItem('categoriesResults'));
  }

  setLocalStorageArr(categories, question, value) {
    const local = this.getLocalData();
    local[categories][question - 1] = value;
    localStorage.setItem('categoriesResults', JSON.stringify(local));
  }

  getLocalStorageCurrentCategories(categories, coof) {
    const local = this.getLocalData();
    const currentArr = local[categories + coof];
    return currentArr;
  }

  clearCurrentCategories(categories, coof) {
    const data = this.getLocalData();
    data[categories + coof] = [];
    return data;
  }

  getLocalTrueAnswer(type) {
    const coof = getCategoriesCoof(type);
    const count = this.getLocalData();
    const sortArr = count.slice(0 + coof, 12 + coof).map((item) => item.filter((items) => items === 'true').length);
    return sortArr;
  }

  getLocalTrueAnswerResult(type, categories) {
    const curr = this.getLocalTrueAnswer(type);
    return curr[categories];
  }

  setNewLocal(arr, coof) {
    const clear = this.clearCurrentCategories(arr, coof);
    localStorage.setItem('categoriesResults', JSON.stringify(clear));
  }
}

export default new Local();
