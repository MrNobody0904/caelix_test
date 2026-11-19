import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollStore } from '../../lib/scrollStore';

interface NodeData {
  initialPos: [number, number, number];
  targetPos: [number, number, number];
  isBlue: boolean;
  scale: [number, number, number];
  seed: number;
}

// Check WebGL availability safely
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function SceneContent({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  // Generate ~24 nodes representing people, tasks, and projects
  const nodes = useMemo<NodeData[]>(() => {
    const items: NodeData[] = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      // Wide constellation around hero text
      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
      const radius = 2.8 + Math.random() * 2.8;
      const x = Math.cos(angle) * radius * 1.5;
      const y = (Math.sin(angle) * radius * 0.8) + (Math.random() * 1.2 - 0.6);
      const z = (Math.random() - 0.5) * 1.5;

      // Converged target behind mockup (centered, lower)
      const tx = (Math.random() - 0.5) * 3.5;
      const ty = -1.5 + (Math.random() - 0.5) * 1.5;
      const tz = -1.2 + (Math.random() - 0.5) * 1.0;

      items.push({
        initialPos: [x, y, z],
        targetPos: [tx, ty, tz],
        isBlue: i % 5 === 0, // A few solid primary blue cards
        scale: [0.38 + Math.random() * 0.2, 0.24 + Math.random() * 0.1, 0.02],
        seed: i * 1.37,
      });
    }
    return items;
   Tom:
    return items;
  }, []);

  // Compute connections between nearby nodes
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const p1 = nodes[i].initialPos;
        const p2 = nodes[j].initialPos;
        const dist = Math.hypot(p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]);
        if (dist < 2.4) {
          positions.push(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
        }
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, [nodes]);

  // Rounded card mesh geometries and materials
  const cardGeo = useMemo(() => new THREE.BoxGeometry(1, 1, 0.05), []);
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 0.05)), []);

  const whiteMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const blueMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x0071e3 }), []);
  const outlineMat = useMemo(() => new THREE.LineBasicMaterial({ color: 0xd0e4ff, linewidth: 1 }), []);
  const networkLineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: 0xe5e7eb, transparent: true, opacity: 0.6 }),
    []
  );

  // Animation frame loop: idle drift, mouse parallax (max 6 deg tilt), and scroll convergence
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { heroConvergence, isReducedMotion } = scrollStore.getState();

    if (groupRef.current) {
      if (!isReducedMotion) {
        // Idle subtle sine drift
        groupRef.current.position.y = Math.sin(t * 0.8) * 0.08 - heroConvergence * 1.2;

        // Mouse parallax: max 6 degrees (approx 0.10 rad)
        const targetRotY = (mousePos.current.x * 0.08);
        const targetRotX = -(mousePos.current.y * 0.06);
        groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 4, delta);
        groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 4, delta);

        // Scale & convergence inwards
        const s = 1 - heroConvergence * 0.35;
        groupRef.current.scale.set(s, s, s);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network lines */}
      <lineSegments ref={lineRef} geometry={lineGeometry} material={networkLineMat} />

      {/* Nodes / cards */}
      {nodes.map((node, i) => (
        <group
          key={i}
          position={node.initialPos}
          scale={node.scale}
        >
          <mesh
            geometry={cardGeo}
            material={node.isBlue ? blueMat : whiteMat}
          />
          {!node.isBlue && (
            <lineSegments geometry={edgeGeo} material={outlineMat} />
          )}
        </group>
      ))}
    </group>
  );
}

export const HeroScene: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) {
    // Pure CSS fallback for low-power or WebGL-disabled devices
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(0, 113, 227, 0.08) 0%, transparent 65%)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <SceneContent mousePos={mousePos} />
      </Canvas>
    </div>
  );
};
