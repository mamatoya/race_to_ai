import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { GameState } from '../../../types';

// Terrain height function
function getTerrainHeight(x: number, z: number): number {
  return Math.sin(x * 0.1) * Math.cos(z * 0.1) * 1.5 + Math.sin(x * 0.05 + 1) * Math.cos(z * 0.08) * 2;
}

// Ground component
function Ground() {
  const mesh = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    const vertices = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      vertices[i + 2] = getTerrainHeight(x, y);
    }

    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow geometry={mesh}>
      <meshLambertMaterial color={0x7cba5f} side={THREE.DoubleSide} />
    </mesh>
  );
}

// Tree component
function Tree({ position, scale }: { position: [number, number, number]; scale: number }) {
  const [x, , z] = position;
  const y = getTerrainHeight(x, z);

  return (
    <group position={[x, y, z]} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.5, 3, 8]} />
        <meshLambertMaterial color={0x8b5a2b} />
      </mesh>
      {/* Foliage layers */}
      {[
        { radius: 2, y: 4 },
        { radius: 1.7, y: 5.2 },
        { radius: 1.3, y: 6.2 },
        { radius: 0.8, y: 7 },
      ].map((layer, i) => (
        <mesh key={i} position={[0, layer.y, 0]} castShadow>
          <sphereGeometry args={[layer.radius, 8, 6]} />
          <meshLambertMaterial color={[0x228b22, 0x2e8b2e, 0x32cd32, 0x3cb371][i]} />
        </mesh>
      ))}
    </group>
  );
}

// Flower component
function Flower({ position, color, rotation }: { position: [number, number, number]; color: number; rotation: number }) {
  const [x, , z] = position;
  const y = getTerrainHeight(x, z);

  return (
    <group position={[x, y, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.5, 6]} />
        <meshLambertMaterial color={0x228b22} />
      </mesh>
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.08, 6, 4]} />
        <meshLambertMaterial color={0xffff00} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.12, 0.55, Math.sin(angle) * 0.12]}
            scale={[1, 0.5, 1]}
          >
            <sphereGeometry args={[0.15, 6, 4]} />
            <meshLambertMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}

// Cloud component
function Cloud({ position, speed, scale }: { position: [number, number, number]; speed: number; scale: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += speed;
      if (ref.current.position.x > 50) ref.current.position.x = -50;
    }
  });

  return (
    <group ref={ref} position={position} scale={[scale, scale * 0.6, scale]}>
      {[
        { x: 0, y: 0, z: 0, r: 2 },
        { x: 1.5, y: 0.3, z: 0, r: 1.5 },
        { x: -1.5, y: 0.2, z: 0, r: 1.7 },
        { x: 0.8, y: 0.5, z: 0.5, r: 1.3 },
        { x: -0.7, y: 0.4, z: -0.5, r: 1.4 },
      ].map((puff, i) => (
        <mesh key={i} position={[puff.x, puff.y, puff.z]}>
          <sphereGeometry args={[puff.r, 8, 6]} />
          <meshLambertMaterial color={0xffffff} transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Collectible Orb
interface OrbProps {
  position: [number, number, number];
  color: number;
  onCollect: () => void;
  playerPosition: THREE.Vector3;
}

function Orb({ position, color, onCollect, playerPosition }: OrbProps) {
  const ref = useRef<THREE.Group>(null);
  const [collected, setCollected] = useState(false);
  const [hidden, setHidden] = useState(false);
  const baseY = useRef(position[1]);

  useFrame(({ clock }) => {
    if (!ref.current || hidden) return;

    if (!collected) {
      // Floating animation
      ref.current.position.y = baseY.current + Math.sin(clock.getElapsedTime() * 2) * 0.2;
      ref.current.rotation.y += 0.01;

      // Collection check
      const dx = ref.current.position.x - playerPosition.x;
      const dz = ref.current.position.z - playerPosition.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < 2) {
        setCollected(true);
        onCollect();
      }
    } else {
      // Collect animation - shrink and float up
      ref.current.scale.multiplyScalar(0.85);
      ref.current.position.y += 0.15;

      if (ref.current.scale.x < 0.01) {
        setHidden(true);
      }
    }
  });

  if (hidden) return null;

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// Teleport sparkle effect for 3D world
interface TeleportSparklesProps {
  position: [number, number, number];
  isActive: boolean;
}

function TeleportSparkles({ position, isActive }: TeleportSparklesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sparklesRef = useRef<THREE.Points>(null);
  const ringsRef = useRef<THREE.Group>(null);

  // Create sparkle particles
  const sparkleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const sparkleColors = [
      [1, 0.84, 0],    // gold
      [0.8, 0.5, 1],   // purple
      [0, 1, 1],       // cyan
      [1, 0.4, 0.7],   // pink
      [1, 1, 1],       // white
    ];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const color = sparkleColors[i % sparkleColors.length];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || !isActive) return;

    // Rotate the whole effect
    groupRef.current.rotation.y = clock.getElapsedTime() * 2;

    // Animate sparkles upward
    if (sparklesRef.current) {
      const positions = sparklesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.05;
        if (positions[i + 1] > 2) positions[i + 1] = -1;
      }
      sparklesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Pulse rings
    if (ringsRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 5) * 0.2;
      ringsRef.current.scale.setScalar(scale);
    }
  });

  if (!isActive) return null;

  return (
    <group ref={groupRef} position={position}>
      {/* Sparkle particles */}
      <points ref={sparklesRef} geometry={sparkleGeometry}>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} />
      </points>

      {/* Glowing rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 1, 32]} />
          <meshBasicMaterial color={0x9370db} transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.5, 0]}>
          <ringGeometry args={[0.5, 0.7, 32]} />
          <meshBasicMaterial color={0x00ffff} transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]}>
          <ringGeometry args={[0.3, 0.5, 32]} />
          <meshBasicMaterial color={0xff69b4} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={0xffffff} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Player character
interface PlayerProps {
  onPositionChange: (pos: THREE.Vector3) => void;
  isVisible: boolean;
  isEntering: boolean;
  isLeaving: boolean;
}

function Player({ onPositionChange, isVisible, isEntering, isLeaving }: PlayerProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/RobotExpressive.glb');
  const { camera } = useThree();

  // Clone the scene using SkeletonUtils to properly handle skinned meshes
  const clonedScene = useMemo(() => {
    return cloneSkeleton(scene);
  }, [scene]);

  const { actions, mixer } = useAnimations(animations, group);

  const keys = useRef({ w: false, a: false, s: false, d: false, shift: false, space: false });
  const isJumping = useRef(false);
  const currentAction = useRef<THREE.AnimationAction | null>(null);
  const initialized = useRef(false);
  const fadeProgress = useRef(0);

  // Handle fade in/out effect
  useEffect(() => {
    if (!group.current) return;

    if (isEntering) {
      fadeProgress.current = 0;
    } else if (isLeaving) {
      fadeProgress.current = 1;
    }
  }, [isEntering, isLeaving]);

  // Initialize player
  useEffect(() => {
    if (!group.current || initialized.current) return;

    clonedScene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    // Setup jump action to play once
    if (actions['Jump']) {
      actions['Jump'].setLoop(THREE.LoopOnce, 1);
      actions['Jump'].clampWhenFinished = false;
    }

    // Place on terrain and start idle
    const startY = getTerrainHeight(0, 0);
    group.current.position.set(0, startY, 0);

    if (actions['Idle']) {
      actions['Idle'].play();
      currentAction.current = actions['Idle'];
    }

    initialized.current = true;
  }, [clonedScene, actions]);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': keys.current.w = true; break;
        case 'KeyA': keys.current.a = true; break;
        case 'KeyS': keys.current.s = true; break;
        case 'KeyD': keys.current.d = true; break;
        case 'ShiftLeft':
        case 'ShiftRight': keys.current.shift = true; break;
        case 'Space':
          if (!isJumping.current && actions['Jump']) {
            keys.current.space = true;
            isJumping.current = true;
            // Stop current action and play jump
            currentAction.current?.fadeOut(0.1);
            actions['Jump']?.stop();
            actions['Jump']?.reset();
            actions['Jump']?.setEffectiveTimeScale(1);
            actions['Jump']?.setEffectiveWeight(1);
            actions['Jump']?.fadeIn(0.1).play();
            currentAction.current = actions['Jump'] || null;

            // Fallback timeout to reset jump state (jump animation is ~1 second)
            setTimeout(() => {
              if (isJumping.current) {
                isJumping.current = false;
                keys.current.space = false;
              }
            }, 1200);
          }
          e.preventDefault();
          break;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': keys.current.w = false; break;
        case 'KeyA': keys.current.a = false; break;
        case 'KeyS': keys.current.s = false; break;
        case 'KeyD': keys.current.d = false; break;
        case 'ShiftLeft':
        case 'ShiftRight': keys.current.shift = false; break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [actions]);

  // Handle jump animation finish
  useEffect(() => {
    if (!mixer) return;

    const onFinished = (e: { action: THREE.AnimationAction }) => {
      if (e.action === actions['Jump']) {
        isJumping.current = false;
        keys.current.space = false;

        // Determine next action based on current movement
        const isMoving = keys.current.w || keys.current.a || keys.current.s || keys.current.d;
        const nextActionName = isMoving ? (keys.current.shift ? 'Running' : 'Walking') : 'Idle';
        const nextAction = actions[nextActionName];

        if (nextAction) {
          actions['Jump']?.fadeOut(0.2);
          nextAction.reset().fadeIn(0.2).play();
          currentAction.current = nextAction;
        }
      }
    };

    mixer.addEventListener('finished', onFinished);
    return () => mixer.removeEventListener('finished', onFinished);
  }, [mixer, actions]);

  useFrame((_, delta) => {
    if (!group.current) return;

    // Handle fade in/out
    if (isEntering && fadeProgress.current < 1) {
      fadeProgress.current = Math.min(fadeProgress.current + delta * 2.5, 1);
      const scale = 1.35 * fadeProgress.current;
      group.current.scale.setScalar(scale);
    } else if (isLeaving && fadeProgress.current > 0) {
      fadeProgress.current = Math.max(fadeProgress.current - delta * 2.5, 0);
      const scale = 1.35 * fadeProgress.current;
      group.current.scale.setScalar(scale);
    } else if (isVisible && !isEntering) {
      group.current.scale.setScalar(1.35);
    }

    // Only process movement when visible and not transitioning
    if (!isVisible || isLeaving) return;

    // Movement controls
    const moveDirection = new THREE.Vector3();
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));

    if (keys.current.w) moveDirection.add(cameraDirection);
    if (keys.current.s) moveDirection.sub(cameraDirection);
    if (keys.current.a) moveDirection.sub(cameraRight);
    if (keys.current.d) moveDirection.add(cameraRight);

    if (moveDirection.length() > 0) {
      moveDirection.normalize();
      const speed = keys.current.shift ? 10 : 5;

      group.current.position.x += moveDirection.x * speed * delta;
      group.current.position.z += moveDirection.z * speed * delta;

      // Rotate to face movement direction (add PI to correct for model orientation)
      const targetRotation = Math.atan2(moveDirection.x, moveDirection.z) + Math.PI;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation, 0.1);

      // Animation (only change if not jumping)
      if (!isJumping.current) {
        const targetAnim = keys.current.shift ? 'Running' : 'Walking';
        if (currentAction.current !== actions[targetAnim]) {
          currentAction.current?.fadeOut(0.2);
          actions[targetAnim]?.reset().fadeIn(0.2).play();
          currentAction.current = actions[targetAnim] || null;
        }
      }
    } else {
      // Only go to idle if not jumping
      if (!isJumping.current && currentAction.current !== actions['Idle']) {
        currentAction.current?.fadeOut(0.3);
        actions['Idle']?.reset().fadeIn(0.3).play();
        currentAction.current = actions['Idle'] || null;
      }
    }

    // Clamp to bounds
    group.current.position.x = THREE.MathUtils.clamp(group.current.position.x, -45, 45);
    group.current.position.z = THREE.MathUtils.clamp(group.current.position.z, -45, 45);

    // Terrain following
    const terrainY = getTerrainHeight(group.current.position.x, group.current.position.z);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, terrainY, 0.2);

    // Update camera target
    onPositionChange(group.current.position.clone());
  });

  // Set initial Y position
  const initialY = getTerrainHeight(0, 0);

  // Reset jump state when transitioning
  useEffect(() => {
    if (isEntering || isLeaving) {
      isJumping.current = false;
      keys.current.space = false;
    }
  }, [isEntering, isLeaving]);

  // Don't render if not visible and not transitioning
  if (!isVisible && !isEntering && !isLeaving) return null;

  const sparkleY = initialY + 1.5; // Position sparkles at character center height

  return (
    <>
      <group ref={group} position={[0, initialY, 0]} scale={[0, 0, 0]}>
        {/* Model faces -Z, so rotate it to face +Z (toward camera) */}
        <primitive object={clonedScene} rotation={[0, Math.PI, 0]} />
      </group>

      {/* Teleport sparkle effect */}
      <TeleportSparkles
        position={[group.current?.position.x || 0, sparkleY, group.current?.position.z || 0]}
        isActive={isEntering || isLeaving}
      />
    </>
  );
}

// Camera controller
function CameraController({ target }: { target: THREE.Vector3 }) {
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.target.lerp(
        new THREE.Vector3(target.x, target.y + 1.5, target.z),
        0.05
      );
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxPolarAngle={Math.PI / 2.1}
      minDistance={5}
      maxDistance={40}
    />
  );
}

// Sky gradient
function Sky({ dayTime }: { dayTime: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = 2;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const gradient = ctx.createLinearGradient(0, 0, 0, 512);

    // Day sky
    if (dayTime > 0.25 && dayTime < 0.75) {
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(0.5, '#E0F6FF');
      gradient.addColorStop(1, '#FFF5E6');
    } else {
      // Night
      gradient.addColorStop(0, '#0a0a2e');
      gradient.addColorStop(0.5, '#1a1a3e');
      gradient.addColorStop(1, '#2a2a4e');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 2, 512);

    const texture = new THREE.CanvasTexture(canvas);
    (meshRef.current.material as THREE.MeshBasicMaterial).map = texture;
    (meshRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
  }, [dayTime]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 32, 32]} />
      <meshBasicMaterial side={THREE.BackSide} />
    </mesh>
  );
}

// Main scene
interface WorldSceneProps {
  gameState: GameState;
  onGameStateChange: (state: Partial<GameState>) => void;
  onPlayerPositionChange: (pos: { x: number; z: number }) => void;
  collectiblesRef: React.MutableRefObject<Array<{ x: number; z: number; collected: boolean }>>;
  showDreamy: boolean;
  isDreamyEntering: boolean;
  isDreamyLeaving: boolean;
}

export function WorldScene({
  gameState,
  onGameStateChange,
  onPlayerPositionChange,
  collectiblesRef,
  showDreamy,
  isDreamyEntering,
  isDreamyLeaving,
}: WorldSceneProps) {
  const playerPos = useRef(new THREE.Vector3(0, 0, 0));

  // Generate positions with stable random values
  const treeData = useMemo(() => [
    { position: [15, 0, 10] as [number, number, number], scale: 1.1 },
    { position: [-12, 0, 8] as [number, number, number], scale: 0.9 },
    { position: [8, 0, -15] as [number, number, number], scale: 1.2 },
    { position: [-18, 0, -12] as [number, number, number], scale: 0.85 },
    { position: [20, 0, -8] as [number, number, number], scale: 1.0 },
    { position: [-8, 0, 18] as [number, number, number], scale: 1.15 },
    { position: [25, 0, 15] as [number, number, number], scale: 0.95 },
    { position: [-22, 0, 20] as [number, number, number], scale: 1.05 },
  ], []);

  const flowerData = useMemo(() => {
    const colors = [0xff69b4, 0xffd700, 0xff6347, 0xda70d6, 0x00ced1, 0xffa500];
    // Use seeded positions instead of random
    const flowers = [];
    for (let i = 0; i < 100; i++) {
      const angle = (i / 100) * Math.PI * 2 + (i * 0.3);
      const radius = 10 + (i % 35);
      flowers.push({
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number],
        color: colors[i % colors.length],
        rotation: (i * 1.7) % (Math.PI * 2),
      });
    }
    return flowers;
  }, []);

  const cloudData = useMemo(() => [
    { position: [-30, 22, -20] as [number, number, number], speed: 0.003, scale: 1.2 },
    { position: [10, 25, 15] as [number, number, number], speed: 0.004, scale: 0.9 },
    { position: [-15, 28, 30] as [number, number, number], speed: 0.0025, scale: 1.4 },
    { position: [35, 23, -10] as [number, number, number], speed: 0.0035, scale: 1.0 },
    { position: [-5, 30, -35] as [number, number, number], speed: 0.0045, scale: 1.1 },
    { position: [20, 26, 25] as [number, number, number], speed: 0.003, scale: 0.85 },
    { position: [-25, 24, 5] as [number, number, number], speed: 0.0038, scale: 1.3 },
    { position: [0, 27, -25] as [number, number, number], speed: 0.0032, scale: 1.15 },
  ], []);

  const orbData = useMemo(() => {
    const colors = [0xffd700, 0xff69b4, 0x00ffff, 0xff6347, 0x9370db];
    const orbs: Array<{ position: [number, number, number]; color: number; points: number }> = [];

    // Nearby orbs
    [[5, 0], [0, 5], [-5, 0], [0, -5], [7, 7]].forEach(([x, z], i) => {
      const y = getTerrainHeight(x, z) + 1.5;
      orbs.push({ position: [x, y, z], color: colors[i % colors.length], points: 10 + i * 5 });
    });

    // Distant orbs - use deterministic positions
    const distantRadii = [18, 22, 28, 20, 35, 25, 30, 17, 33, 24, 27, 19, 31, 23, 26];
    const pointValues = [15, 20, 12, 18, 25, 14, 22, 16, 28, 13, 19, 24, 17, 21, 30];
    for (let i = 5; i < 20; i++) {
      const angle = ((i - 5) / 15) * Math.PI * 2;
      const radius = distantRadii[i - 5];
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = getTerrainHeight(x, z) + 1.5;
      orbs.push({
        position: [x, y, z],
        color: colors[i % colors.length],
        points: pointValues[i - 5],
      });
    }

    // Initialize collectibles ref
    collectiblesRef.current = orbs.map((o) => ({ x: o.position[0], z: o.position[2], collected: false }));

    return orbs;
  }, [collectiblesRef]);

  const handleCollect = (index: number, points: number) => {
    collectiblesRef.current[index].collected = true;
    onGameStateChange({
      score: gameState.score + points,
      orbsCollected: gameState.orbsCollected + 1,
    });
  };

  const handlePlayerMove = (pos: THREE.Vector3) => {
    playerPos.current.copy(pos);
    onPlayerPositionChange({ x: pos.x, z: pos.z });
  };

  return (
    <Canvas
      shadows
      camera={{ fov: 50, position: [0, 8, 15] }}
      style={{ width: '100%', height: '100%' }}
    >
      <Sky dayTime={gameState.dayTime} />
      <fog attach="fog" args={[0xe0f6ff, 30, 100]} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <hemisphereLight args={[0x87ceeb, 0x98d982, 0.6]} position={[0, 50, 0]} />
      <directionalLight
        position={[20, 30, 20]}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* World */}
      <Ground />
      {treeData.map((t, i) => <Tree key={`tree-${i}`} position={t.position} scale={t.scale} />)}
      {flowerData.map((f, i) => <Flower key={`flower-${i}`} position={f.position} color={f.color} rotation={f.rotation} />)}
      {cloudData.map((c, i) => <Cloud key={`cloud-${i}`} position={c.position} speed={c.speed} scale={c.scale} />)}

      {/* Collectibles */}
      {orbData.map((orb, i) => (
        <Orb
          key={`orb-${i}`}
          position={orb.position}
          color={orb.color}
          playerPosition={playerPos.current}
          onCollect={() => handleCollect(i, orb.points)}
        />
      ))}

      {/* Player */}
      <Player
        onPositionChange={handlePlayerMove}
        isVisible={showDreamy}
        isEntering={isDreamyEntering}
        isLeaving={isDreamyLeaving}
      />
      <CameraController target={playerPos.current} />
    </Canvas>
  );
}

useGLTF.preload('/RobotExpressive.glb');
