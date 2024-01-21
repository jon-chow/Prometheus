import { useState, type SyntheticEvent, type MouseEventHandler } from 'react';
import { BsPlayFill, BsPauseFill, BsSkipForwardFill, BsSkipBackwardFill, BsShuffle, BsRepeat, BsRepeat1 } from 'react-icons/bs';
import { IoVolumeHigh, IoVolumeMedium, IoVolumeLow, IoVolumeOff, IoVolumeMute } from 'react-icons/io5';
import '../styles/Bottombar.scss';

import { tracks } from '../data/tracks';

interface Props {}

export enum RepeatMode {
  Off = 0,
  Repeat = 1,
  RepeatOne = 2
}

const Bottombar = ({}: Props) => {
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [repeatMode, setRepeatMode] = useState(RepeatMode.Off);
  const [shuffleToggled, setShuffleToggled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [progress, setProgress] = useState<Progress>({ elapsed: 30 * 1000, total: 60 * 1000 }); // replace with async Resource
  const [volume, setVolume] = useState(0.5);

  const switchRepeatMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    setRepeatMode(repeatMode + (1 % 3));
  };

  const toggleShuffle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShuffleToggled(!shuffleToggled);
  };

  const togglePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsMuted(!isMuted);
  };

  const adjustVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMuted) setIsMuted(false);
    setVolume(parseInt(e.target.value) / 100);
  };

  const adjustProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress({ ...progress, elapsed: parseInt(e.target.value) });
  };

  const handleTrackEnd = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    if (repeatMode !== RepeatMode.RepeatOne) nextTrack();
  };

  const nextTrack = () => {
    if (repeatMode === RepeatMode.RepeatOne) return;

    if (shuffleToggled)
      // TODO: Shuffle
      setCurrentTrack(Math.floor(Math.random() * tracks.length));
    else setCurrentTrack((currentTrack + 1) % tracks.length);
  };

  const prevTrack = () => {
    if (repeatMode === RepeatMode.RepeatOne) return;

    if (shuffleToggled)
      // TODO: Shuffle
      setCurrentTrack(Math.floor(Math.random() * tracks.length));
    else setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length);
  };

  function formatTime(milliseconds: number) {
    const seconds = Math.floor(milliseconds / 1000);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toFixed(0).toString().padStart(2, '0')}`;
  }

  function normalizeProgress(value: number) {
    return (value / progress.total) * 100;
  }

  function checkVolume() {
    return isMuted ? 0 : volume * 100;
  }

  return (
    <>
      <audio src={tracks[currentTrack].src} onEnded={handleTrackEnd} />
      <div className="bottombar">
        <div className="left">
          <div className="art-cover">
            <img src={tracks[currentTrack].thumbnail.src} />
            <div className="art-cover-overlay">
              <button className="play-button" onClick={togglePlay}>
                {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
              </button>
            </div>
          </div>
          <div className="song-info">
            <div className="song-name">{tracks[currentTrack].title}</div>
            <div className="artist-name">{tracks[currentTrack].author}</div>
          </div>
        </div>

        <div className="center">
          <div className="player">
            <div className="controls">
              <button className={'shuffle-button' + (shuffleToggled ? ' enabled' : '')} onClick={toggleShuffle}>
                <BsShuffle />
              </button>
              <button className="skip-button" onClick={(e) => prevTrack()}>
                <BsSkipBackwardFill />
              </button>
              <button className="play-button" onClick={togglePlay}>
                {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
              </button>
              <button className="skip-button" onClick={(e) => nextTrack()}>
                <BsSkipForwardFill />
              </button>
              <button className={'repeat-button' + (repeatMode === RepeatMode.Off ? '' : ' enabled')} onClick={switchRepeatMode}>
                {repeatMode === RepeatMode.RepeatOne ? <BsRepeat1 /> : <BsRepeat />}
              </button>
            </div>

            <div className="progress">
              <div className="time-elapsed">{formatTime(progress.elapsed)}</div>
              <input
                className="progress-bar"
                type="range"
                min="0"
                max={progress.total}
                value={progress.elapsed}
                onInput={adjustProgress}
                id="progress"
                style={{
                  background: `linear-gradient(to right, #7a90ff ${normalizeProgress(progress.elapsed)}%, #aaa ${normalizeProgress(progress.elapsed)}%)`
                }}
              />
              <div className="total-time">{formatTime(progress.total)}</div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="volume" title={`${(volume * 100).toFixed(0).toString()}%`}>
            <button className="volume-icon" onClick={toggleMute}>
              {isMuted ? (
                <IoVolumeMute />
              ) : volume === 0 ? (
                <IoVolumeOff />
              ) : volume < 0.33 ? (
                <IoVolumeLow />
              ) : volume < 0.67 ? (
                <IoVolumeMedium />
              ) : (
                <IoVolumeHigh />
              )}
            </button>
            <input
              className="volume-bar"
              type="range"
              min="0"
              max="100"
              value={checkVolume()}
              onInput={adjustVolume}
              id="volume"
              style={{
                background: `linear-gradient(to right, #7a90ff ${checkVolume()}%, #aaa ${checkVolume()}%)`
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bottombar;
