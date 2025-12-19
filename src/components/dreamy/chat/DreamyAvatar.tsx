import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';

interface RobotProps {
  onLoaded?: () => void;
}

function Robot({ onLoaded }: RobotProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/RobotExpressive.glb');
  const { camera } = useThree();

  // Clone the scene using SkeletonUtils to properly handle skinned meshes
  const clonedScene = useMemo(() => {
    return cloneSkeleton(scene);
  }, [scene]);

  const { actions } = useAnimations(animations, group);

  const headRef = useRef<THREE.Object3D | null>(null);
  const [mousePos] = useState(() => new THREE.Vector2());
  const targetLook = useRef(new THREE.Vector3(-2, 0, 0));

  useEffect(() => {
    // Find head bone in cloned scene
    clonedScene.traverse((child) => {
      if (child.name === 'Head') {
        headRef.current = child;
      }
    });

    // Position camera
    camera.position.set(-8, 1, 0);
    camera.lookAt(0, 0, 0);

    // Play idle and wave
    if (actions['Idle']) {
      actions['Idle'].play();
    }

    // Wave after a short delay
    setTimeout(() => {
      if (actions['Wave']) {
        actions['Wave'].reset().setLoop(THREE.LoopOnce, 1).clampWhenFinished = true;
        actions['Wave'].play();
      }
    }, 500);

    onLoaded?.();
  }, [clonedScene, actions, camera, onLoaded]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = (e.clientX / window.innerWidth) * 2 - 1 - 0.5;
      mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1 - 0.5;

      // Update target look position
      targetLook.current.set(-2 + mousePos.x * 2, mousePos.y * 2, mousePos.x * 3);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mousePos]);

  useFrame((_, delta) => {
    // Make head follow mouse
    if (headRef.current) {
      const currentLook = new THREE.Vector3();
      headRef.current.getWorldPosition(currentLook);
      currentLook.lerp(targetLook.current, delta * 3);
      headRef.current.lookAt(targetLook.current);
    }
  });

  return (
    <group ref={group}>
      <primitive object={clonedScene} position={[0, -3, 0]} rotation={[0, -Math.PI / 2 + 0.3, 0]} />
    </group>
  );
}

export function DreamyAvatar() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ width: '6rem', height: '6rem', position: 'relative' }}>
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            border: '2px solid var(--dsl-primary)',
            borderTopColor: 'transparent',
            borderRadius: '9999px',
            animation: 'spin 1s linear infinite',
          }} />
        </div>
      )}
      <Canvas
        camera={{ fov: 50 }}
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <ambientLight intensity={0.5} />
        <hemisphereLight groundColor={0x8d8d8d} intensity={1} position={[0, 20, 0]} />
        <directionalLight color={0xffffff} intensity={3} position={[0, 20, 10]} />
        <Robot onLoaded={() => setIsLoaded(true)} />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/RobotExpressive.glb');
