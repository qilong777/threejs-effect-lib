import vert from './glsl/vert.glsl?raw'
import frag from './glsl/frag.glsl?raw'
import * as THREE from 'three'

export function getShaderMaterial(count: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    // blending: THREE.AdditiveBlending,
    uniforms: {
      uSize: {
        // 点的大小
        value: 5
      },
      time: {
        value: 0.0 //时间
      }, // 时间
      uColor: {
        // 颜色
        value: new THREE.Color(0x00ffff)
      },
      uRange: {
        // 飞线长度
        value: 50
      },
      uTotal: {
        // 轨迹总长度，（点的总个数）
        value: count
      },
      uSpeed: {
        // 飞行速度
        value: 200
      }
    },
    vertexShader: vert,
    fragmentShader: frag
  })
}
