declare enum RepeatMode {
  Off = 0,
  Repeat = 1,
  RepeatOne = 2
}

interface IAudioState {
  currentTrackIndex: number | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  repeatMode: RepeatMode;
  isShuffle: boolean;
  volume: number;
  isMuted: boolean;
}
