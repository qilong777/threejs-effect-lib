import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { disposeObject } from '../common'
import { getShinyCircleShaderMaterial } from '../effects/shinyCircle'
export class ShinyCircleEffectShow extends BaseEffectShow {
  static effectName = 'shinyCircle'
  circle = new THREE.Mesh(new THREE.CircleGeometry(100, 100), getShinyCircleShaderMaterial())

  init() {
    this.circle.position.set(100, 100, 0)
    this.app.scene.add(this.circle)
    this.update = this.update.bind(this)
    this.app.addFrameRequestCallback(this.update)
  }

  update() {
    this.circle.material.uniforms.uTime.value += 0.01
  }

  dispose() {
    disposeObject(this.circle)
    this.app.scene.remove(this.circle)
    this.app.removeFrameRequestCallback(this.update)
  }

  getEffectName() {
    return ShinyCircleEffectShow.effectName
  }
}
