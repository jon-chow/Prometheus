import { map } from 'nanostores';

const audioState = map<IAudioState>({
  currentTrack: 0,
  isPlaying: false,
  isMuted: false,
  repeatMode: RepeatMode.Off,
  shuffle: false,
  progress: { elapsed: 30 * 1000, total: 60 * 1000 },
  volume: 0.5
});

export default audioState;
