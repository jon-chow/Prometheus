import { createContext, useContext, useEffect, useRef, type PropsWithChildren } from 'react';
import { useStore } from '@nanostores/react';
import { audioStore } from '../stores/audioStore.store';

import { RepeatMode } from '../classes/implements/AudioState';
import { fetchAllTracks } from '../data/tracks';

const AudioContext = createContext({
  audioRef: {} as React.RefObject<HTMLAudioElement>,
  onLoadedMetadata: () => {},
  handleNextTrack: () => {},
  handlePrevTrack: () => {},
  handleOnEnded: () => {},
  handlePlay: () => {},
  handleSeek: (secondsToSkip?: number, allowSkip?: boolean) => {},
  handleShuffle: (e: React.MouseEvent<HTMLButtonElement>) => {},
  handleRepeatMode: (e: React.MouseEvent<HTMLButtonElement>) => {}
});

export const useAudioContext = () => useContext(AudioContext);

const AudioContextProvider = ({ children }: PropsWithChildren) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const $audioState = useStore(audioStore);

  // Load track list
  useEffect(() => { 
    fetchAllTracks().then((tracks) => {
      audioStore.setKey('trackList', tracks);
    });
  }, []);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      audioStore.setKey('duration', audioRef.current.duration * 1000);
      audioRef.current.volume = $audioState.volume;
    }
  };

  const handleNextTrack = () => {
    if ($audioState.repeatMode === RepeatMode.RepeatOne) {
      (audioRef.current as HTMLAudioElement).currentTime = 0;
      return;
    }

    const next = (($audioState.currentTrackIndex ?? -1) + 1) % $audioState.trackList.length;
    audioStore.setKey('currentTrackIndex', next);
    audioStore.setKey('currentTrack', $audioState.trackList[next]);
  };

  const handlePrevTrack = () => {
    if ($audioState.repeatMode === RepeatMode.RepeatOne) {
      (audioRef.current as HTMLAudioElement).currentTime = 0;
      return;
    }

    const prev = (($audioState.currentTrackIndex ?? 1) - 1 + $audioState.trackList.length) % $audioState.trackList.length;
    audioStore.setKey('currentTrackIndex', prev);
    audioStore.setKey('currentTrack', $audioState.trackList[prev]);
  };

  const handleOnEnded = () => {
    if ($audioState.isPlaying)
      if ($audioState.repeatMode === RepeatMode.Off) {
        $audioState.currentTrackIndex !== $audioState.trackList.length - 1 ? handleNextTrack() : audioStore.setKey('isPlaying', false);
      } else if ($audioState.repeatMode === RepeatMode.Repeat) {
        handleNextTrack();
      }
  };

  const handlePlay = () => {
    if ($audioState.currentTrackIndex !== null) audioStore.setKey('isPlaying', !$audioState.isPlaying);
  };

  const handleRepeatMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const mode = ($audioState.repeatMode + 1) % (Object.keys(RepeatMode).length);
    const key = Object.keys(RepeatMode).at(mode) as keyof typeof RepeatMode;
    audioStore.setKey('repeatMode', RepeatMode[key]);
  };

  const handleShuffle = (e: React.MouseEvent<HTMLButtonElement>) => {
    audioStore.setKey('isShuffle', !$audioState.isShuffle);
  };

  const handleSeek = (secondsToSkip = 5, allowSkip = false) => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime + secondsToSkip;
      if (newTime > audioRef.current.duration && allowSkip) {
        handleNextTrack();
      } else if (newTime < 0 && allowSkip) {
        handlePrevTrack();
      } else {
        audioRef.current.currentTime = newTime;
        audioStore.setKey('progress', audioRef.current.currentTime * 1000);
      }
    }
  };

  // Shuffle
  useEffect(() => {
    if (audioStore.get().isShuffle) {
      const shuffled = audioStore.get().trackList;
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      shuffled.forEach((track) => (track.order = shuffled.indexOf(track)));
      const newId = shuffled.find((track) => track.id === $audioState.currentTrack?.id)?.order;
      if (newId !== undefined) audioStore.setKey('currentTrackIndex', newId);
      audioStore.setKey('trackList', shuffled);
    } else {
      const TRACKS = audioStore.get().trackList;
      TRACKS.forEach((track) => (track.order = TRACKS.indexOf(track)));
      const newId = TRACKS.find((track) => track.id === $audioState.currentTrack?.id)?.order;
      if (newId !== undefined) audioStore.setKey('currentTrackIndex', newId);
      audioStore.setKey('trackList', TRACKS);
    }
  }, [$audioState.isShuffle]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          handleSeek();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(-5);
          break;
        case ' ':
          e.preventDefault();
          handlePlay();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlay]);

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        onLoadedMetadata,
        handleNextTrack,
        handlePrevTrack,
        handleOnEnded,
        handlePlay,
        handleSeek,
        handleShuffle,
        handleRepeatMode
      }}
    >
      {$audioState.currentTrack?.src !== '' && (
        <audio
          src={$audioState.currentTrack?.src}
          ref={audioRef}
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
          onEnded={(e) => handleOnEnded()}
          loop={$audioState.repeatMode === RepeatMode.RepeatOne}
        />
      )}
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContextProvider;
