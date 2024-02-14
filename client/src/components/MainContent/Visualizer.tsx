import React, { Suspense, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { audioStore } from '../../stores/audioStore.store';
import { AudioAnalyser } from 'three';
import { AdaptiveDpr, Html, PositionalAudio, Sphere } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { EffectComposer, Vignette, DepthOfField } from '@react-three/postprocessing';

import Experience from './Experience';

/* -------------------------------------------------------------------------- */
/*                                  ANALYZER                                  */
/* -------------------------------------------------------------------------- */
interface AnalyzerProps {
  sound: React.MutableRefObject<THREE.PositionalAudio>;
}

const Analyzer = ({ sound }: AnalyzerProps) => {
  const meshRef = useRef<any>();
  const analyzerRef = useRef<AudioAnalyser>();

  useEffect(() => {
    analyzerRef.current = new AudioAnalyser(sound.current, 32);
  });

  useFrame((_) => {
    if (!analyzerRef.current || !meshRef.current) return;
    const data = analyzerRef.current.getAverageFrequency();
    meshRef.current.material.color.setRGB(data / 100, 0, 0);
    meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = (data / 100) * 2;
  });

  return (
    <>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshBasicMaterial />
      </Sphere>
    </>
  );
};

const Sound = () => {
  const soundRef = useRef<THREE.PositionalAudio>(null);

  const $audioState = useStore(audioStore);

  useEffect(() => {
    if (!soundRef.current) return;
    soundRef.current.play();
  }, [$audioState.currentTrack]);

  return $audioState.currentTrack !== null ? (
    <>
      <PositionalAudio url="../data/audio/coolsound.mp3" ref={soundRef} distance={10} />
      <Analyzer sound={soundRef as React.MutableRefObject<THREE.PositionalAudio>} />
    </>
  ) : (
    <></>
  );
};

/* -------------------------------------------------------------------------- */
/*                                 VISUALIZER                                 */
/* -------------------------------------------------------------------------- */

interface Props {}

const LoadingScreen = () => {
  return <Html>Loading...</Html>;
};

const Visualizer = ({}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <Canvas
        camera={{ position: [0, 5, 18], fov: 40, far: 100, near: 10 }}
        shadows
        ref={canvasRef}
        style={{
          pointerEvents: 'all',
          cursor: 'pointer'
        }}
        dpr={2}
      >
        <AdaptiveDpr pixelated />
        <EffectComposer multisampling={0.8}>
          <DepthOfField focusDistance={1.5} focalLength={0.02} bokehScale={0.2} height={canvasRef.current?.height} />
          <Vignette eskil={false} offset={0.1} darkness={0.75} />
        </EffectComposer>

        <Suspense fallback={<LoadingScreen />}>
          <Physics>
            {/* <Sound /> */}
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
};

export default Visualizer;
