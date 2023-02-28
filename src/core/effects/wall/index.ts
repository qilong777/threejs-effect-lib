import vert from './glsl/vert.glsl?raw'
import frag from './glsl/frag.glsl?raw'
import * as THREE from 'three'
import type { IPoint } from '@/core/interfaces/IPrimitive'

// 点数组需要逆时针
export function getGeometry(points: IPoint[], height: number) {
  const positions: number[] = []
  const uvs: number[] = []
  for (let i = 0, j = positions.length, t = uvs.length; i < points.length - 1; i++) {
    const vUvyMax = 1
    const left = points[i]
    const right = points[i + 1]
    positions[j++] = left.x
    positions[j++] = left.y
    positions[j++] = 0
    uvs[t++] = 0
    uvs[t++] = 0

    positions[j++] = right.x
    positions[j++] = right.y
    positions[j++] = 0
    uvs[t++] = 1
    uvs[t++] = 0

    positions[j++] = left.x
    positions[j++] = left.y
    positions[j++] = height
    uvs[t++] = 0
    uvs[t++] = vUvyMax

    positions[j++] = left.x
    positions[j++] = left.y
    positions[j++] = height
    uvs[t++] = 0
    uvs[t++] = vUvyMax

    positions[j++] = right.x
    positions[j++] = right.y
    positions[j++] = 0
    uvs[t++] = 1
    uvs[t++] = 0

    positions[j++] = right.x
    positions[j++] = right.y
    positions[j++] = height
    uvs[t++] = 1
    uvs[t++] = vUvyMax
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2))
  return geometry
}
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
    side: THREE.FrontSide,
    depthTest: true,
    transparent: true
  })
}
