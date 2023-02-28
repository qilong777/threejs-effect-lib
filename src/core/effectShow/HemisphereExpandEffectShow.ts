import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { disposeObject } from '../common'
import { getShaderMaterial } from '../effects/shine'

export class HemisphereExpandEffectShow extends BaseEffectShow {
  static effectName = '半球膨胀'
  mesh = new THREE.Mesh(
    new THREE.SphereGeometry(100, 100, 100, 0, Math.PI, 0, Math.PI),
    getShaderMaterial()
  )

  init() {
    this.app.scene.add(this.mesh)

    this.update = this.update.bind(this)
    this.app.addFrameRequestCallback(this.update)
  }

  update(delta: number) {
    let scale = this.mesh.scale.x
    scale += delta
    scale = scale > 1 ? 0 : scale
    this.mesh.scale.set(scale, scale, scale)
  }

  dispose() {
    disposeObject(this.mesh)
    this.app.scene.remove(this.mesh)

    this.app.removeFrameRequestCallback(this.update)
  }
}
