import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { disposeObject } from '../common'
import { getGeometry, getShaderMaterial } from '../effects/wall'
import type { IPoint } from '../interfaces/IPrimitive'

const points: IPoint[] = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 100 },
  { x: 0, y: 100 },
  { x: 0, y: 0 }
]
export class WallEffectShow extends BaseEffectShow {
  static effectName = '墙体效果'
  wall = new THREE.Mesh(getGeometry(points, 100), getShaderMaterial())

  init() {
    this.app.scene.add(this.wall)
    this.update = this.update.bind(this)
    this.app.addFrameRequestCallback(this.update)
  }

  update(delta: number) {
    this.wall.material.uniforms.time.value += delta
    if (
      this.wall.material.uniforms.time.value >
      1 / this.wall.material.uniforms.stripeSpeed.value
    ) {
      this.wall.material.uniforms.time.value = 0.0
    }
  }

  dispose() {
    disposeObject(this.wall)
    this.app.scene.remove(this.wall)
    this.app.removeFrameRequestCallback(this.update)
  }
}
