import {
  audio,
  timeRange,
  timeRangeText,
  timerSettingCheckbox,
  volumeBigBtn,
  volumeIconBtn,
  volumeSettingRange,
} from '../selectors';
import local from './localeStorageService';

const audioTrack = (currentAudioAnswer) => {
  let currentAudioPlay;
  if (currentAudioAnswer === true) {
    currentAudioPlay = 'assets/audio/new_true.mp3';
  } else if (currentAudioAnswer === false) {
    currentAudioPlay = 'assets/audio/new_false.mp3';
  } else if (currentAudioAnswer === 'end') {
    currentAudioPlay = 'assets/audio/round_end.mp3';
  }
  audio().src = currentAudioPlay;
};

export const startAudio = (v) => {
  audioTrack(v);
  audio().play();
};

export const muteStyle = () => {
  const iconMute = audio().muted ? 'url(assets/img/icons/volume-off.svg) 50% 50%/contain no-repeat' : 'url(assets/img/icons/volume-on.svg) 50% 50%/contain no-repeat';
  volumeBigBtn().style.background = iconMute;
  volumeIconBtn().style.background = iconMute;
};

export const toggleMute = () => {
  if (audio().muted) {
    audio().muted = false;
    muteStyle();
  } else if (!audio().muted) {
    audio().muted = true;
    muteStyle();
  }
};

export const muteBtnChange = () => {
  toggleMute();
  if (audio().muted) {
    local.setSettingVolume(0);
    audio().volume = 0;
    volumeSettingRange().value = 0;
  } else {
    local.setSettingVolume(0.5);
    audio().volume = 0.5;
    volumeSettingRange().value = 0.5;
  }
};

export const handleRangeUpdate = () => {
  audio().volume = volumeSettingRange().value;
  local.setSettingVolume(audio().volume);
  if (audio().volume === 0) {
    audio().muted = true;
    volumeSettingRange().value = 0;
  } else {
    audio().muted = false;
  }
  muteStyle();
};

export const stopPlay = () => {
  audioTrack();
  audio().pause();
};

export const generateDefaultSetting = () => {
  volumeSettingRange().value = 0.5;
  local.setSettingVolume(Number(volumeSettingRange().value));
  timerSettingCheckbox().setAttribute('checked', false);
  local.setLocalTimerSetting(false);
  timeRange().value = 5;
  timeRangeText().innerHTML = timeRange().value;
  local.setLocalCurrentTimeDuration(timeRange().value);
};
