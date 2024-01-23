declare enum RepeatMode {
  Off,
  Track,
  Playlist
}

interface IAudioState {
  currentTrackIndex: number;
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  repeatMode: RepeatMode;
  shuffle: boolean;
  volume: number;
  isMuted: boolean;
}
