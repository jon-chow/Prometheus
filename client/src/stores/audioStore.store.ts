import { map } from 'nanostores';

import { AudioState, RepeatMode } from '../classes/implements/AudioState';

import { EMPTY_TRACK } from '../data/tracks';

export const audioStore = map<AudioState>(
  new AudioState({
    trackList: [],
    currentTrackIndex: null,
    currentTrack: EMPTY_TRACK,
    isPlaying: false,
    progress: 0,
    duration: 0,
    repeatMode: RepeatMode.Off,
    isShuffle: false,
    volume: 0.5,
    isMuted: false,
    isSeeking: false
  })
);
