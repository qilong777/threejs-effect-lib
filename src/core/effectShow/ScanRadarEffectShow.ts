import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { disposeObject } from '../common'
import { getScanRadarShaderMaterial } from '../effects/scanRadar'
export class ScanRadarEffectShow extends BaseEffectShow {
  static effectName = 'scanRadar'
  circle = new THREE.Mesh(new THREE.CircleGeometry(100, 100), getScanRadarShaderMaterial())

  init() {
    this.circle.position.set(100, 100, 0)
    this.app.scene.add(this.circle)
    this.update = this.update.bind(this)
    this.app.addFrameRequestCallback(this.update)
  }

  update() {
    this.circle.material.uniforms.time.value += 0.01
  }

  dispose() {
    disposeObject(this.circle)
    this.app.scene.remove(this.circle)
    this.app.removeFrameRequestCallback(this.update)
  }

  getEffectName() {
    return ScanRadarEffectShow.effectName
  }
}
