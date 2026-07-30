import React, { useMemo } from 'react';
import * as THREE from 'three';

interface ProceduralTreeProps {
  position: [number, number, number];
  scale?: number;
}

export const ProceduralTree: React.FC<ProceduralTreeProps> = ({ position, scale = 1 }) => {
  // Generate random clustered spheres for a fluffy canopy look
  const clusters = useMemo(() => {
    const arr = [];
    const numClusters = 5 + Math.floor(Math.random() * 4);
    
    // Central core sphere
    arr.push({
      position: [0, 0, 0],
      scale: 1.8 + Math.random() * 0.4
    });

    // Surrounding smaller spheres
    for (let i = 0; i < numClusters; i++) {
      const angle = (i / numClusters) * Math.PI * 2 + (Math.random() * 0.5);
      const radius = 1.0 + Math.random() * 0.5;
      const height = -0.5 + Math.random() * 1.5;
      
      arr.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ],
        scale: 1.2 + Math.random() * 0.8
      });
    }
    return arr;
  }, []);

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.4, 3.0, 7]} />
        <meshStandardMaterial color="#5a4538" roughness={0.9} />
      </mesh>
      
      {/* Canopy Cluster */}
      <group position={[0, 4.0, 0]}>
        {clusters.map((cluster, i) => (
          <mesh key={i} position={cluster.position as [number, number, number]} scale={cluster.scale} castShadow receiveShadow>
            {/* Dodecahedron gives a slightly low-poly but round look suitable for stylized trees */}
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial 
              color="#689849" 
              roughness={1.0} 
              flatShading={false} 
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
