import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollStore } from '../../lib/scrollStore';

interface Node3DProps {
  position: [number, number, number];
  title: string;
  isActive: boolean;
  isGhosted?: boolean;
}

function NodeMesh({ position, isActive, isGhosted = false }: Node3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  const boxGeo = useMemo(() => new THREE.BoxGeometry(1.6, 1.0, 0.08), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.6, 1.0, 0.08)), []);

  const activeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x0071e3 }), []);
  const inactiveMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff }), []);
  const ghostedMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.35 }),
    []
  );

  const blueLineMat = useMemo(() => new THREE.LineBasicMaterial({ color: 0x0071e3, linewidth: 2 }), []);
  const grayLineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: isGhosted ? 0xd1d5db : 0xe5e7eb, linewidth: 1 }),
    [isGhosted]
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScale = isActive ? 1.12 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), delta * 8);
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        geometry={boxGeo}
        material={isActive ? activeMat : isGhosted ? ghostedMat : inactiveMat}
      />
      <lineSegments
        ref={edgesRef}
        geometry={edgesGeo}
        material={isActive ? blueLineMat : grayLineMat}
      />
    </group>
  );
}

function ConnectedRecordContent() {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollStore.subscribe(() => {
      const state = scrollStore.getState();
      setActiveNode(state.activeRecordNode);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Node 1: Workforce */}
      <NodeMesh position={[-2.6, 0, 0]} title="Workforce" isActive={activeNode >= 0} />

      {/* Node 2: Growth */}
      <NodeMesh position={[0, 0, 0]} title="Growth" isActive={activeNode >= 1} />

      {/* Node 3: Talent */}
      <NodeMesh position={[2.6, 0, 0]} title="Talent" isActive={activeNode >= 2} isGhosted={activeNode < 2} />
    </group>
  );
}

export const RecordScene: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '140px',
        maxWidth: '800px',
        margin: '0 auto 32px',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <ConnectedRecordContent />
      </Canvas>
    </div>
  );
};
