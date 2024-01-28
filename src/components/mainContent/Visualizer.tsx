import { Suspense, useRef } from 'react';
import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useStore } from '@nanostores/react';
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
      >
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
