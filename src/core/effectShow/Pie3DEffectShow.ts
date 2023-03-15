import { Pie3D, Pie3DItem } from './../effects/pie3D/interface'
import { removeObject, removeObjectChildren } from '@/common/three/threeUtils'
import { Pie3DObject } from '@/core/effects/pie3D/Pie3DObject'

import { BaseEffectShow } from './BaseEffectShow'
import { AmbientLight, DirectionalLight } from 'three'

export class Pie3DEffectShow extends BaseEffectShow {
  static effectName = '3D饼图'
  pie3DObject = new Pie3DObject()

  pie3D = new Pie3D({
    height: 40,
    radius: 200,
    holeRatio: 0.8,
    data: [
      new Pie3DItem({
        key: 'A',
        value: 25,
        materialParams: {
          color: 0xff0000,
          roughness: 0.5,
          metalness: 0.5
        }
      }),
      new Pie3DItem({
        key: 'B',
        value: 25,
        materialParams: {
          color: 0x00ff00,
          roughness: 0.5,
          metalness: 0.5
        }
      }),
      new Pie3DItem({
        key: 'C',
        value: 25,
        materialParams: {
          color: 0x0000ff,
          roughness: 0.5,
          metalness: 0.5
        }
      })
    ]
  })

  init() {
    this.app.scene.add(this.pie3DObject)
    // 添加光
    this.app.scene.add(new AmbientLight(0xffffff, 0.8))
    const light = new DirectionalLight(0xffffff, 0.5)
    light.position.set(0, 0, 1)
    this.app.scene.add(light)
    this.pie3DObject.draw(this.pie3D)

    this.update = this.update.bind(this)
    this.app.addFrameRequestCallback(this.update)
  }

  update(delta: number) {}

  dispose() {
    this.app.resetScene()
    this.app.removeFrameRequestCallback(this.update)
  }
}
