import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function AssistantModel({ animation = 'Idle', ...props }: any) {
  const group = React.useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/Soldier.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone) as any
  const { actions } = useAnimations(animations, group)
  
  const waveTime = useRef(0);

  useEffect(() => {
    // Map custom animations to available ones
    let targetAnim = animation;
    if (animation === 'Wave' || animation === 'Talking' || animation === 'Sitting') targetAnim = 'Idle';
    if (animation === 'Walking') targetAnim = 'Walk';
    
    if (actions && actions[targetAnim]) {
      const action = actions[targetAnim];
      if (action) {
        // Play animation
        action.reset().fadeIn(0.3).play();
        
        return () => { action.fadeOut(0.3); }
      }
    }
  }, [animation, actions]);
  
  useFrame((_, delta) => {
     if (animation === 'Wave') {
         waveTime.current += delta;
         // Wave twice (one wave cycle = ~1s, so 2 waves = 2s)
         if (waveTime.current < 2.0 && nodes.mixamorigRightArm) {
             const rightArm = nodes.mixamorigRightArm;
             // Basic programmatic wave
             rightArm.rotation.z = Math.sin(waveTime.current * Math.PI * 2) * 0.4 + 1.0;
             rightArm.rotation.x = 0.5;
         }
     } else {
         waveTime.current = 0;
     }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Character" rotation={[-Math.PI / 2, 0, 0]} scale={0.013}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="vanguard_Mesh" geometry={nodes.vanguard_Mesh.geometry} material={materials.VanguardBodyMat} skeleton={nodes.vanguard_Mesh.skeleton} />
          <skinnedMesh name="vanguard_visor" geometry={nodes.vanguard_visor.geometry} material={materials.Vanguard_VisorMat} skeleton={nodes.vanguard_visor.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Soldier.glb')
