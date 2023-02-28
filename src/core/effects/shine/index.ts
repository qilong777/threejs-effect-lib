import vert from './glsl/vert.glsl?raw'
import frag from './glsl/frag.glsl?raw'
import * as THREE from 'three'
/**
 * 参考：https://zhuanlan.zhihu.com/p/38548428
 */

export function getShaderMaterial(
  params = {
    bias: 1.0,
    power: 2,
    scale: -1,
    color: new THREE.Vector3(0, 1, 1)
  }
) {
  return new THREE.ShaderMaterial({
    uniforms: {
      bias: {
        value: params.bias
      },
      power: {
        value: params.power
      },
      scale: {
        value: params.scale
      },
      color: {
        value: params.color
      }
    },
    vertexShader: vert,
    fragmentShader: frag,
    // side: THREE.FrontSide,
    // depthTest: true,
    transparent: true
  })
}
