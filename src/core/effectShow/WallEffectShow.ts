import { BaseEffectShow } from './BaseEffectShow'
import * as THREE from 'three'
import { removeObject } from '@/common/three/threeUtils'
import { getShaderMaterial } from '../effects/wall'
import type { IPoint } from '../interfaces/IPrimitive'
import type { BufferGeometry, ShaderMaterial } from 'three'
import { getWallGeometry } from '../common/geo.getter'

const points: IPoint[] = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 100 },
  { x: 0, y: 100 },
  { x: 0, y: 0 }
]

export class WallEffectShow extends BaseEffectShow {
  static effectName = '墙体效果'
  walls: THREE.Mesh<BufferGeometry, ShaderMaterial>[] = []

  init() {
    const shader = getShaderMaterial()
    for (let i = 0; i < 100; i++) {
      const wall = new THREE.Mesh(getWallGeometry(points, 100), shader)
      // wall.position.set(0, 0, i * 100)
      // 10 * 10
      wall.position.set(Math.floor(i / 10) * 150, (i % 10) * 150, 0)
      this.walls.push(wall)
      this.app.scene.add(wall)
    }

    this.update = this.update.bind(this)
    this.app.addFrameRequestCallback(this.update)
  }

  update(delta: number) {
    // this.walls.forEach((wall) => {

    // })
    this.walls[0].material.uniforms.time.value += delta
    if (
      this.walls[0].material.uniforms.time.value >
      1 / this.walls[0].material.uniforms.stripeSpeed.value
    ) {
      this.walls[0].material.uniforms.time.value = 0.0
    }
  }

  dispose() {
    this.walls.forEach((wall) => {
      removeObject(wall)
    })
    this.walls = []
    this.app.removeFrameRequestCallback(this.update)
  }
}
