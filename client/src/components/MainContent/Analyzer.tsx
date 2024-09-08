import { useEffect, useRef } from 'react';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Audio, AudioAnalyser, AudioListener, Color } from 'three';
import { useAudioContext } from '../../contexts/AudioContext';

function getColourFromFrequency(frequencies: Uint8Array): Color {
  let lowFreq = 0;
  let midFreq = 0;
  let highFreq = 0;

  const lowFreqRange = frequencies.slice(0, frequencies.length / 3);
  const midFreqRange = frequencies.slice(frequencies.length / 3, (2 * frequencies.length) / 3);
  const highFreqRange = frequencies.slice((2 * frequencies.length) / 3);
  lowFreq = lowFreqRange.reduce((sum, val) => sum + val, 0) / lowFreqRange.length;
  midFreq = midFreqRange.reduce((sum, val) => sum + val, 0) / midFreqRange.length;
  highFreq = highFreqRange.reduce((sum, val) => sum + val, 0) / highFreqRange.length;

  const total = lowFreq + midFreq + highFreq;
  const color = new Color();
  color.setRGB(lowFreq / total, midFreq / total, highFreq / total);
  return color;
}

const Analyzer = () => {
  const meshRef = useRef<any>();
  const analyzerRef = useRef<AudioAnalyser>();
  const audioContext = useAudioContext();

  useEffect(() => {
    if (!audioContext.audioRef.current) return;
    analyzerRef.current = new AudioAnalyser(new Audio(new AudioListener()).setMediaElementSource(audioContext.audioRef.current), 32);
  }, [audioContext.audioRef.current]);

  useFrame((_) => {
    if (!analyzerRef.current || !meshRef.current || !audioContext.audioRef.current) return;
    const avg = analyzerRef.current.getAverageFrequency();
    const raw = analyzerRef.current.getFrequencyData();
    meshRef.current.material.color = getColourFromFrequency(raw);
    meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = (avg / 100) * 2;
  });

  return (
    <>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshBasicMaterial />
      </Sphere>
    </>
  );
};

export default Analyzer;
