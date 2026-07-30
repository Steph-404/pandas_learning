import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GRASS_COUNT = 40000;
const GRASS_WIDTH = 0.08;
const GRASS_HEIGHT = 0.6;

const vertexShader = `
  varying vec2 vUv;
  varying float vHeight;
  uniform float uTime;
  uniform vec2 uWindDirection;
  uniform float uWindSpeed;

  // Simple 2D noise for wind displacement
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vUv = uv;
    
    // Displace the vertex position before applying instance matrix
    // Shift position up so that y=0 is the bottom instead of center
    vec3 displacedPos = position;
    displacedPos.y += ${GRASS_HEIGHT.toFixed(1)} / 2.0;
    
    vHeight = displacedPos.y / ${GRASS_HEIGHT.toFixed(1)}; // 0 at bottom, 1 at top

    // Extract world position of this instance
    vec4 instanceWorldPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);

    // Wind calculation
    vec2 windPos = instanceWorldPos.xz + uWindDirection * uTime * uWindSpeed;
    float windNoise = noise(windPos * 0.5) * 2.0 - 1.0;
    
    // Displacement increases with height (pow(vHeight, 2) makes base stiff and tip flexible)
    float bendFactor = pow(vHeight, 1.5) * 0.4;
    
    // Add wind bending
    displacedPos.x += uWindDirection.x * windNoise * bendFactor;
    displacedPos.z += uWindDirection.y * windNoise * bendFactor;
    
    // Fake downward bend (grass leans over, so it loses height)
    displacedPos.y -= abs(windNoise) * bendFactor * 0.5;

    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(displacedPos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vHeight;

  void main() {
    // Colors from Hoshi-no-Tani palette modified for golden hour
    vec3 colorBase = vec3(0.20, 0.28, 0.15);
    vec3 colorMid = vec3(0.40, 0.55, 0.25);
    vec3 colorTip = vec3(0.68, 0.78, 0.30);
    
    vec3 color = mix(colorBase, colorMid, smoothstep(0.0, 0.5, vHeight));
    color = mix(color, colorTip, smoothstep(0.5, 1.0, vHeight));

    // Fake ambient occlusion at base
    color *= mix(0.3, 1.0, pow(vHeight, 0.5));

    gl_FragColor = vec4(color, 1.0);
  }
`;

export const ProceduralGrass: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWindDirection: { value: new THREE.Vector2(1.0, 0.5).normalize() },
      uWindSpeed: { value: 2.5 },
    }),
    []
  );

  // Generate grass instance matrices
  const { matrices } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const mats = new Float32Array(GRASS_COUNT * 16);

    let count = 0;
    while (count < GRASS_COUNT) {
      // Spawn area: x: [-25, 25], z: [-20, 60]
      const x = (Math.random() - 0.5) * 50;
      const z = Math.random() * 80 - 20;

      // Don't spawn on the road (x: -5 to 5, z: 0 to 60)
      if (Math.abs(x) < 5.5 && z > -5) continue;
      // Don't spawn on the forecourt/pavement (x: -12 to 12, z: -22 to 6)
      if (Math.abs(x) < 13 && z > -22 && z < 7) continue;
      // Don't spawn inside or around the lab building (Left wing)
      if (x > -22 && x < -8 && z > -30 && z < -10) continue;
      // Don't spawn inside the main building facade
      if (x >= -12 && x <= 12 && z > -25 && z < -18) continue;
      // Don't spawn inside the right wing
      if (x > 11 && x < 17 && z > -22 && z < -10) continue;
      
      dummy.position.set(x, 0, z);

      // Random rotation around Y axis
      dummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
      
      // Random height scale
      const scale = 0.6 + Math.random() * 0.8;
      dummy.scale.set(1, scale, 1);
      
      dummy.updateMatrix();
      dummy.matrix.toArray(mats, count * 16);
      count++;
    }

    return { matrices: mats };
  }, []);

  // Update instanced mesh matrices once on mount
  useMemo(() => {
    if (meshRef.current) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined as any, undefined as any, GRASS_COUNT]}
      receiveShadow
      castShadow
    >
      <planeGeometry args={[GRASS_WIDTH, GRASS_HEIGHT]}>
        <instancedBufferAttribute
          attach="attributes-instanceMatrix"
          args={[matrices, 16]}
        />
      </planeGeometry>
      {/* Shift geometry so origin is at the bottom (y=0) */}
      <meshBasicMaterial visible={false} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
};
