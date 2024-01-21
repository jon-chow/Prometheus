type Progress = {
  elapsed: number;
  total: number;
};

interface IAudioState {
  currentTrack: number;
  isPlaying: boolean;
  isMuted: boolean;
  repeatMode: RepeatMode;
  shuffle: boolean;
  progress: Progress;
  volume: number;
}
