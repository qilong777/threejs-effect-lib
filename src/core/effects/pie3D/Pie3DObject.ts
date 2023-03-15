import type { IPie3D } from './interface'
import * as THREE from 'three'
import { removeObjectChildren } from '@/common/three/threeUtils'
import { degToRad } from '@/common/mathUtils'
import { MeshStandardMaterial } from 'three'

export class Pie3DObject extends THREE.Group {
  draw(pie3D: IPie3D) {
    this.removeAll()
    const { data, radius, height, holeRatio, isHeightSame, curveSegments } = pie3D
    const visibleItemList = data.filter((item) => item.visible)

    const sum = visibleItemList.reduce((res, { value }) => res + value, 0)

    const max = Math.max(...visibleItemList.map((item) => item.value))

    let currentStartDeg = 0

    visibleItemList.forEach((pieItem) => {
      const { value, materialParams } = pieItem
      const currentEndDeg = currentStartDeg + (value / sum) * 360
      const realHeight = isHeightSame ? height : height * (value / max)

      const geomertry = this.createSectorGeometry(
        radius * holeRatio,
        radius,
        currentStartDeg,
        currentEndDeg,
        realHeight,
        curveSegments
      )
      const mesh = new THREE.Mesh(geomertry, new MeshStandardMaterial(materialParams))
      mesh.userData = {
        pieItem: pieItem,
        percentage: parseFloat(((value / sum) * 100).toFixed(2))
      }
      this.add(mesh)
      currentStartDeg = currentEndDeg
    })
  }

  removeAll() {
    removeObjectChildren(this)
  }

  /**
   * 创建扇形几何体
   */
  createSectorGeometry(
    innerRadius: number,
    outerRadius: number,
    startDeg: number,
    endDeg: number,
    height: number,
    curveSegments: number
  ) {
    const startRad = degToRad(startDeg)
    const endRad = degToRad(endDeg)
    const shape = new THREE.Shape()
    shape.absarc(0, 0, innerRadius, startRad, endRad, false)
    shape.lineTo(outerRadius * Math.cos(endRad), outerRadius * Math.sin(endRad))
    shape.absarc(0, 0, outerRadius, endRad, startRad, true)
    shape.closePath()
    return new THREE.ExtrudeGeometry(shape, {
      depth: height,
      curveSegments,
      bevelEnabled: false
    })
  }
}
