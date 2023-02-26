import vert from './glsl/scanRadar.vert.glsl?raw'
import frag from './glsl/scanRadar.frag.glsl?raw'
import * as THREE from 'three'

export function getScanRadarShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: vert,
    fragmentShader: frag
  })
}
