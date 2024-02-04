import { createContext, useContext, useEffect, useRef, type PropsWithChildren } from 'react';
import { useFrame } from '@react-three/fiber';
import { Audio, AudioAnalyser } from 'three';
import { useStore } from '@nanostores/react';
import { audioStore } from '../stores/audioStore.store';

import { tracks } from '../data/tracks';
import { RepeatMode } from '../enums/RepeatMode';

/* -------------------------------------------------------------------------- */
/*                                  ANALYZER                                  */
/* -------------------------------------------------------------------------- */
interface AnalyzerProps {
  sound: React.MutableRefObject<Audio>;
}

const Analyzer = ({ sound }: AnalyzerProps) => {
  const meshRef = useRef<any>();
  const analyzerRef = useRef<AudioAnalyser>();

  const avg = (arr: Uint8Array) => Math.floor(arr.reduce((a, b) => a + b, 0) / arr.length);

  useEffect(() => {
    analyzerRef.current = new AudioAnalyser(sound.current, 128);
  });

  useFrame((_) => {
    if (!analyzerRef.current || !meshRef.current) return;
    let freqDataArr = analyzerRef.current.getFrequencyData();
    const kickArr = freqDataArr.slice(0, 10);
    const zoom = Math.min(avg(kickArr) / 100, 0.7);
    meshRef.current.scale.set(1, zoom, 1);
  });

  return (
    <>
      <mesh ref={meshRef} scale={1}>
        <cylinderGeometry args={[0.5, 0.5, 0.01, 32]} />
        <meshBasicMaterial color={'#9e69da'} />
      </mesh>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/*                                AUDIO CONTEXT                               */
/* -------------------------------------------------------------------------- */
const AudioContext = createContext({
  audioRef: {} as React.RefObject<HTMLAudioElement>,
  onLoadedMetadata: () => {},
  handleNextTrack: () => {},
  handlePrevTrack: () => {},
  handleOnEnded: () => {},
  handlePlay: (e: React.MouseEvent<HTMLButtonElement>) => {}
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

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ($audioState.currentTrackIndex !== null) audioStore.setKey('isPlaying', !$audioState.isPlaying);
  };

  // Shuffle
  useEffect(() => {
    if (audioStore.get().isShuffle) {
      const shuffled = [...tracks];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      shuffled.forEach((track) => (track.order = shuffled.indexOf(track)));
      const newId = shuffled.find((track) => track.id === $audioState.currentTrack?.id)?.order;
      if (newId !== undefined) audioStore.setKey('currentTrackIndex', newId);
      audioStore.setKey('trackList', shuffled);
    } else {
      tracks.forEach((track) => (track.order = tracks.indexOf(track)));
      const newId = tracks.find((track) => track.id === $audioState.currentTrack?.id)?.order;
      if (newId !== undefined) audioStore.setKey('currentTrackIndex', newId);
      audioStore.setKey('trackList', tracks);
    }
  }, [$audioState.isShuffle]);

  return (
    <AudioContext.Provider value={{ audioRef, onLoadedMetadata, handleNextTrack, handlePrevTrack, handleOnEnded, handlePlay }}>
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
