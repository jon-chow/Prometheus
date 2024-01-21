import { useCallback, useState, useEffect, useRef } from 'react';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import '../styles/Bottombar.scss';

import { tracks } from '../data/tracks';
import VolumeSlider from './VolumeSlider';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

interface Props {}

const Bottombar = ({}: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const playingRef = useRef<number>();

  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPlaying(!isPlaying);
  };

  const repeat = useCallback(() => {
    if (audioRef.current && progressRef.current) {
      const currentTime = audioRef.current.currentTime * 1000;
      const normalizedTime = currentTime / audioRef.current.duration * 0.1;
      setProgress(currentTime);
      progressRef.current.value = normalizedTime.toString();
      progressRef.current.style.setProperty(
        'background', `linear-gradient(to right, #7a90ff ${normalizedTime}%, #aaa ${normalizedTime}%)`
      );
      playingRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressRef, setProgress]);

  useEffect(() => {
    if (audioRef.current)
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    playingRef.current = requestAnimationFrame(repeat);
  }, [audioRef, isPlaying, repeat]);

  useEffect(() => {
    if (audioRef.current && progressRef.current)
      setDuration(audioRef.current.duration * 1000);
  }, [currentTrack, audioRef, progressRef]);

  return (
    <>
      <audio src={currentTrack.src} ref={audioRef} />
      <div className="bottombar">
        <div className="left">
          <div className="art-cover">
            <img src={currentTrack.thumbnail.src} />
            <div className="art-cover-overlay">
              <button className="play-button" onClick={handlePlay}>
                {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
              </button>
            </div>
          </div>
          <div className="song-info">
            <div className="song-name">{currentTrack.title}</div>
            <div className="artist-name">{currentTrack.author}</div>
          </div>
        </div>

        <div className="center">
          <div className="player">
            <Controls
              audioRef={audioRef}
              tracks={tracks}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              isPlaying={isPlaying}
              handlePlay={handlePlay}
              setProgress={setProgress}
            />
            <ProgressBar
              audioRef={audioRef}
              progress={progress}
              progressRef={progressRef}
              duration={duration}
            />
          </div>
        </div>

        <div className="right">
          <VolumeSlider
            audioRef={audioRef}
          />
        </div>
      </div>
    </>
  );
};

export default Bottombar;
