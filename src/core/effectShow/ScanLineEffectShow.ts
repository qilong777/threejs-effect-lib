import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { disposeObject } from '../common'
import { getScanLineShaderMaterial } from '../effects/scanLine'
export class ScanLineEffectShow extends BaseEffectShow {
  static effectName = '扫描线'
  plan = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), getScanLineShaderMaterial())

  init() {
    this.app.scene.add(this.plan)
    this.update = this.update.bind(this)
    this.app.addFrameRequestCallback(this.update)
  }

  update(delta: number) {
    this.plan.material.uniforms.time.value += delta
    if (this.plan.material.uniforms.time.value > 1) {
      this.plan.material.uniforms.time.value = 0.0
    }
  }

  dispose() {
    disposeObject(this.plan)
    this.app.scene.remove(this.plan)
    this.app.removeFrameRequestCallback(this.update)
  }
}
