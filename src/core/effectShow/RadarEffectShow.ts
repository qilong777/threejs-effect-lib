import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { disposeObject } from '../common'
import { getRadarShaderMaterial } from '../effects/radar'
export class RadarEffectShow extends BaseEffectShow {
  name = 'radar'
  circle = new THREE.Mesh(new THREE.CircleGeometry(100, 100), getRadarShaderMaterial())

  init() {
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
}
