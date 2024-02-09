declare const RepeatMode = {
  Off: 0,
  Repeat: 1,
  RepeatOne: 2
} as const;
type RepeatMode = typeof RepeatMode[keyof typeof RepeatMode];

interface IAudioState {
  trackList: Track[];
  currentTrackIndex: number | null;
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  repeatMode: RepeatMode;
  isShuffle: boolean;
  volume: number;
  isMuted: boolean;
  isSeeking: boolean;
}
