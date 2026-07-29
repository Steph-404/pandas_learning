import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Preload textures
export const useAssets = () => {
  const vehicleTex = useTexture('/src/assets/vehicle.jpg');
  const assistantTex = useTexture('/src/assets/assistant.jpg');
  
  // Configure textures (black background isolation can be handled via blending)
  vehicleTex.colorSpace = THREE.SRGBColorSpace;
  assistantTex.colorSpace = THREE.SRGBColorSpace;

  return { vehicleTex, assistantTex };
};

// We will use Suspense in the main Scene to load this safely
