import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { removeObject } from '@/common/three/threeUtils'
import { getShaderMaterial } from '../effects/pathFlow'
import type { IPoint } from '../interfaces/IPrimitive'
import { getPathGeometry } from '../common/geo.getter'

const points: IPoint[] = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 100 },
  { x: 0, y: 100 },
  { x: 0, y: 0 }
]

export class PathFlowEffectShow extends BaseEffectShow {
  static effectName = '路径流光效果'
  path!: THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>

  init() {
    const geo = getPathGeometry(points)
    const shaderMtr = getShaderMaterial(geo.getAttribute('current').count)

    this.path = new THREE.Points(getPathGeometry(points), shaderMtr)
    this.path.position.set(50, 50, 0)
    this.app.scene.add(this.path)
    this.update = this.update.bind(this)
    this.app.addFrameRequestCallback(this.update)
  }

  update(delta: number) {
    this.path.material.uniforms.time.value += delta
  }

  dispose() {
    removeObject(this.path)
    this.app.removeFrameRequestCallback(this.update)
  }
}
