import { map } from 'nanostores';

import { RepeatMode } from '../enums/RepeatMode';

import { EMPTY_TRACK } from '../data/tracks';

export const audioStore = map<IAudioState>({
  currentTrackIndex: null,
  currentTrack: EMPTY_TRACK,
  isPlaying: false,
  progress: 0,
  duration: 0,
  repeatMode: RepeatMode.Off,
  isShuffle: false,
  volume: 0.5,
  isMuted: false
});
