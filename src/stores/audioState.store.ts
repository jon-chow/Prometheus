import { map } from 'nanostores';

export const $audioState = map<IAudioState>({
  currentTrackIndex: 0,
  currentTrack: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  repeatMode: RepeatMode.Off,
  shuffle: false,
  volume: 0.5,
  isMuted: false
});
