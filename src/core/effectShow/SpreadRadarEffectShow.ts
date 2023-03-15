import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { removeObject } from '@/common/three/threeUtils'
import { getSpreadRadarShaderMaterial } from '../effects/spreadRadar'
export class SpreadRadarEffectShow extends BaseEffectShow {
  static effectName = '扩散雷达'
  circle = new THREE.Mesh(new THREE.CircleGeometry(100, 100), getSpreadRadarShaderMaterial())

  init() {
    this.app.scene.add(this.circle)

    this.circle.position.set(100, 100, 0)
    this.update = this.update.bind(this)
    this.app.addFrameRequestCallback(this.update)
  }

  update(delta: number) {
    this.circle.material.uniforms.time.value += delta
  }

  dispose() {
    removeObject(this.circle)
    this.app.removeFrameRequestCallback(this.update)
  }
}
