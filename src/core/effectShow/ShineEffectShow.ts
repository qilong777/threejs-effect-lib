import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { disposeObject } from '../common'
import { getShaderMaterial } from '../effects/shine'

export class ShineEffectShow extends BaseEffectShow {
  static effectName = '发光效果'
  mesh = new THREE.Mesh(new THREE.SphereGeometry(100, 100, 100), getShaderMaterial())

  init() {
    this.app.scene.add(this.mesh)

    // this.update = this.update.bind(this)
    // this.app.addFrameRequestCallback(this.update)
  }

  update(delta: number) {}

  dispose() {
    disposeObject(this.mesh)
    this.app.scene.remove(this.mesh)

    // this.app.removeFrameRequestCallback(this.update)
  }
}
