import { Cylinder, OrbitControls, Sky, Text } from '@react-three/drei';
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
        minPolarAngle={80 * (Math.PI / 180)}
        maxPolarAngle={90 * (Math.PI / 180)}
        rotateSpeed={0.5}
      />

      {/* AMBIENCE */}
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow color={'#9e69da'} />
      {/* <color args={['#76d6ff']} attach="background" /> */}
      <fog attach="fog" color={'#005493'} near={30} far={180} />
      <Sky distance={10000} sunPosition={[1000, 200, 1000]} />

      {/* STAGE */}
      <RigidBody colliders={false} type="fixed" position={[0, -3.5, 0]} rotation={[0, 0, 0]}>
        <CylinderCollider args={[1, 5]} />
        <Cylinder scale={[2, 1.5, 2]} args={[4.5, 5.25]} receiveShadow castShadow>
          <meshStandardMaterial color={'#ecc481'} />
        </Cylinder>
        <Cylinder scale={[2, 1.25, 2]} args={[5.75, 6.5]} position={[0, -1.25, 0]} receiveShadow>
          <meshStandardMaterial color={'#ecc481'} />
        </Cylinder>
        <Cylinder scale={[1, 0.5, 1]} position={[0, -5, 0]} args={[1, 400]} receiveShadow>
          <meshStandardMaterial color={'#3697d9'} roughness={0.5} metalness={0.1} />
        </Cylinder>
      </RigidBody>

      {/* OBJECTS */}
    </>
  );
};

export default Experience;
