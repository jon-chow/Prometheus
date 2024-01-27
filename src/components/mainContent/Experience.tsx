import { Cylinder, MeshReflectorMaterial, OrbitControls } from '@react-three/drei';
import { RigidBody, CylinderCollider } from '@react-three/rapier';

const Experience = () => {
  return (
    <>
      <OrbitControls
        enablePan={false}
        enableRotate={true}
        enableZoom={true}
        minDistance={15}
        maxDistance={25}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
      />

      {/* AMBIENCE */}
      {/* <color args={['#fff']} attach="background" /> */}
      <fog attach="fog" color={'#e3dbf8'} near={30} far={80} />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow color={'#9e69da'} />

      {/* STAGE */}
      <RigidBody colliders={false} type="fixed" position={[0, -3.5, 0]} rotation={[0, 0, 0]}>
        <CylinderCollider args={[1, 5]} />
        <Cylinder scale={[1, 1, 1]} args={[4, 5]} receiveShadow castShadow>
          <meshStandardMaterial color={'#ecc481'} />
        </Cylinder>
        <Cylinder scale={[1, 1.25, 1]} args={[5.5, 7]} position={[0, -1, 0]} receiveShadow>
          <meshStandardMaterial color={'#ecc481'} />
        </Cylinder>
      </RigidBody>

      {/* OBJECTS */}
    </>
  );
};

export default Experience;
