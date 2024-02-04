import { Suspense, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { EffectComposer, Vignette, DepthOfField } from '@react-three/postprocessing';
import { audioStore } from '../../stores/audioStore.store';
// import '../../styles/Visualizer.scss';

import Experience from './Experience';

interface Props {}

const LoadingScreen = () => {
  return <Html>Loading...</Html>;
};

const Visualizer = ({}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const $audioState = useStore(audioStore);

  return (
    <>
      <Canvas
        camera={{ position: [0, 5, 18], fov: 40 }}
        shadows
        ref={canvasRef}
        style={{
          pointerEvents: 'all',
          cursor: 'pointer'
        }}
        dpr={2}
      >
        <EffectComposer multisampling={0.8}>
          <DepthOfField focusDistance={1.5} focalLength={0.02} bokehScale={0.2} height={canvasRef.current?.height} />
          <Vignette eskil={false} offset={0.1} darkness={0.75} />
        </EffectComposer>
        <Suspense fallback={<LoadingScreen />}>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
};

export default Visualizer;
