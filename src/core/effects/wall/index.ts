import vert from './glsl/vert.glsl?raw'
import frag from './glsl/frag.glsl?raw'
import * as THREE from 'three'
import type { IPoint } from '@/core/interfaces/IPrimitive'

export function getShaderMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: {
        value: 0.0 //时间
      },
      stripeNum: {
        value: 1
      },
      stripeWidth: {
        value: 0.1 //闪光条的宽度
      },
      stripeColor: {
        value: new THREE.Vector4(0, 0, 1, 1) //闪光条的光颜色
      },
      stripeSpeed: {
        value: 0.4 //闪光条的速度
      },
      uColor: {
        value: new THREE.Vector4(0, 0, 1, 1) //
      }
    },
    vertexShader: vert,
    fragmentShader: frag,
    side: THREE.DoubleSide,
    depthTest: true,
    transparent: true
  })
}
