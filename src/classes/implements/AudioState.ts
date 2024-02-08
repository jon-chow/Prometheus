export enum RepeatMode {
  Off = 0,
  Repeat = 1,
  RepeatOne = 2
}

export class AudioState implements IAudioState {
  public trackList: ITrack[];
  public currentTrackIndex: number | null;
  public currentTrack: ITrack | null;
  public isPlaying: boolean;
  public progress: number;
  public duration: number;
  public repeatMode: RepeatMode;
  public isShuffle: boolean;
  public volume: number;
  public isMuted: boolean;
  public isSeeking: boolean;

  constructor({
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
    isSeeking
  }: IAudioState) {
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
  }
}
