import vert from './glsl/scanRadar.vert.glsl?raw'
import frag from './glsl/scanRadar.frag.glsl?raw'
import * as THREE from 'three'
/**
 * 参考：https://www.shadertoy.com/view/XdsXRf
 *
 */

export function getScanRadarShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      circleColor: { value: new THREE.Vector4(0.0, 0.0, 1.0, 1.0) },
      lineColor: { value: new THREE.Vector4(0.0, 0.0, 1.0, 1.0) }
    },
    vertexShader: vert,
    fragmentShader: frag
  })
}
