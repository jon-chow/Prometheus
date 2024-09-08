import { Suspense, useRef } from 'react';
import { AdaptiveDpr, Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { EffectComposer, Vignette, DepthOfField } from '@react-three/postprocessing';

import Experience from './Experience';
import Analyzer from './Analyzer';

const LoadingScreen = () => {
  return <Html>Loading...</Html>;
};

const Visualizer = () => {
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
          <Analyzer />
          <Physics>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </>
  );
};

export default Visualizer;
