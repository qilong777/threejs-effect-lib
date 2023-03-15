import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { removeObject } from '@/common/three/threeUtils'
import { getScanRadarShaderMaterial } from '../effects/scanRadar'
export class ScanRadarEffectShow extends BaseEffectShow {
  static effectName = '扫描雷达'
  circle = new THREE.Mesh(new THREE.CircleGeometry(100, 100), getScanRadarShaderMaterial())

  init() {
    this.circle.position.set(100, 100, 0)
    this.app.scene.add(this.circle)
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
