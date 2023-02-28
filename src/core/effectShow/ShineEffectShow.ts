import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { disposeObject } from '../common'
import { getShaderMaterial } from '../effects/shine'

const shader = getShaderMaterial()
export class ShineEffectShow extends BaseEffectShow {
  static effectName = '透明发光效果'
  group = new THREE.Group()
  meshes = [
    new THREE.Mesh(new THREE.SphereGeometry(100, 100, 100), shader),
    new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), shader),
    new THREE.Mesh(new THREE.CylinderGeometry(100, 100, 100, 100), shader)
  ]

  init() {
    this.meshes.forEach((mesh, index) => {
      this.group.add(mesh)
      mesh.position.set(index * 200, 0, 0)
    })
    this.app.scene.add(this.group)
    // this.update = this.update.bind(this)
    // this.app.addFrameRequestCallback(this.update)
  }

  update(delta: number) {}

  dispose() {
    disposeObject(this.group)
    this.app.scene.remove(this.group)

    // this.app.removeFrameRequestCallback(this.update)
  }
}
