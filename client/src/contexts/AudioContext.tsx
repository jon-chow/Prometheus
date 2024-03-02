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

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      audioStore.setKey('duration', audioRef.current.duration * 1000);
      audioRef.current.volume = $audioState.volume;
    }
  };

  const handleNextTrack = () => {
    try {
      if ($audioState.repeatMode === RepeatMode.RepeatOne) {
        (audioRef.current as HTMLAudioElement).currentTime = 0;
        return;
      }

      const next = (($audioState.currentTrackIndex ?? -1) + 1) % $audioState.trackList.length;
      audioStore.setKey('currentTrackIndex', next);
      audioStore.setKey('currentTrack', $audioState.trackList[next]);

      if (!$audioState.isPlaying) audioStore.setKey('isPlaying', true);
    } catch (error) {}
  };

  const handlePrevTrack = () => {
    try {
      if ($audioState.repeatMode === RepeatMode.RepeatOne) {
        (audioRef.current as HTMLAudioElement).currentTime = 0;
        return;
      }

      const prev = (($audioState.currentTrackIndex ?? 1) - 1 + $audioState.trackList.length) % $audioState.trackList.length;
      audioStore.setKey('currentTrackIndex', prev);
      audioStore.setKey('currentTrack', $audioState.trackList[prev]);
      
      if (!$audioState.isPlaying) audioStore.setKey('isPlaying', true);
    } catch (error) {}
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
    const mode = ($audioState.repeatMode + 1) % Object.keys(RepeatMode).length;
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

  // Load track list
  useEffect(() => {
    $audioState.isFetching = true;
    fetchAllTracks().then((tracks) => {
      audioStore.setKey('isFetching', false);
      audioStore.setKey('trackList', tracks);
    });
  }, []);

  // Handle shuffle functionality
  useEffect(() => {
    if (audioStore.get().trackList === undefined) return;
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
      let unshuffledTracks = audioStore.get().trackList.map((track) => {
        track.order = track.unshuffledOrder;
        return track;
      });
      const newId = unshuffledTracks.find((track) => track.id === $audioState.currentTrack?.id)?.order;
      if (newId !== undefined) audioStore.setKey('currentTrackIndex', newId);
      audioStore.setKey('trackList', unshuffledTracks.sort((a, b) => a.order - b.order));
    }
  }, [$audioState.isShuffle]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd')) {
        // Next track
        e.preventDefault();
        handleNextTrack();
        return;
      } else if (e.ctrlKey && (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a')) {
        // Previous track
        e.preventDefault();
        handlePrevTrack();
        return;
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        // Seek forward
        e.preventDefault();
        handleSeek();
        return;
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        // Seek back
        e.preventDefault();
        handleSeek(-5);
        return;
      } else if (e.key === ' ') {
        // Play/Pause
        e.preventDefault();
        handlePlay();
        return;
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
