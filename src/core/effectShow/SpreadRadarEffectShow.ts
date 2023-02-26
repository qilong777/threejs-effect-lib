import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { disposeObject } from '../common'
import { getSpreadRadarShaderMaterial } from '../effects/spreadRadar'
export class SpreadRadarEffectShow extends BaseEffectShow {
  static effectName = 'spreadRadar'
  circle = new THREE.Mesh(new THREE.CircleGeometry(100, 100), getSpreadRadarShaderMaterial())

  init() {
    this.app.scene.add(this.circle)
    console.log(this.circle.geometry.attributes)

    this.circle.position.set(100, 100, 0)
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
    return SpreadRadarEffectShow.effectName
  }
}
