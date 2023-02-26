import vert from './glsl/radar.vert.glsl?raw'
import frag from './glsl/radar.frag.glsl?raw'
import * as THREE from 'three'

export function getRadarShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: vert,
    fragmentShader: frag
  })
}
