import vert from './glsl/spreadRadar.vert.glsl?raw'
import frag from './glsl/spreadRadar.frag.glsl?raw'
import * as THREE from 'three'

export function getSpreadRadarShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: vert,
    fragmentShader: frag
  })
}
