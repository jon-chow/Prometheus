import type { Track } from './Track';

export const RepeatMode = {
  Off: 0,
  Repeat: 1,
  RepeatOne: 2
} as const;

export class AudioState implements IAudioState {
  public isFetching: boolean;
  public trackList: Track[];
  public currentTrackIndex: number | null;
  public currentTrack: Track | null;
  public isPlaying: boolean;
  public progress: number;
  public duration: number;
  public repeatMode: RepeatMode;
  public isShuffle: boolean;
  public volume: number;
  public isMuted: boolean;
  public isSeeking: boolean;
  public searchTerm: string | null;

  constructor({
    isFetching,
    trackList,
    currentTrackIndex,
    currentTrack,
    isPlaying,
    progress,
    duration,
    repeatMode,
    isShuffle,
    volume,
    isMuted,
    isSeeking,
    searchTerm
  }: IAudioState) {
    this.isFetching = isFetching;
    this.trackList = trackList;
    this.currentTrackIndex = currentTrackIndex;
    this.currentTrack = currentTrack;
    this.isPlaying = isPlaying;
    this.progress = progress;
    this.duration = duration;
    this.repeatMode = repeatMode;
    this.isShuffle = isShuffle;
    this.volume = volume;
    this.isMuted = isMuted;
    this.isSeeking = isSeeking;
    this.searchTerm = searchTerm;
  }
}
