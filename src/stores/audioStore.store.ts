import { map } from 'nanostores';

import { RepeatMode } from '../enums/RepeatMode';

import { tracks } from '../data/tracks';

export const audioStore = map<IAudioState>({
  currentTrackIndex: 0,
  currentTrack: tracks[0],
  isPlaying: false,
  progress: 0,
  duration: 0,
  repeatMode: RepeatMode.Off,
  isShuffle: false,
  volume: 0.5,
  isMuted: false
});
