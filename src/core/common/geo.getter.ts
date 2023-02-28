import type { IPoint } from './../interfaces/IPrimitive'
import * as THREE from 'three'
// 点数组需要逆时针
export function getWallGeometry(points: IPoint[], height: number) {
  const positions: number[] = []
  const uvs: number[] = []
  for (let i = 0, j = positions.length, t = uvs.length; i < points.length - 1; i++) {
    const vUvyMax = 1
    const left = points[i]
    const right = points[i + 1]
    positions[j++] = left.x
    positions[j++] = left.y
    positions[j++] = 0
    uvs[t++] = 0
    uvs[t++] = 0

    positions[j++] = right.x
    positions[j++] = right.y
    positions[j++] = 0
    uvs[t++] = 1
    uvs[t++] = 0

    positions[j++] = left.x
    positions[j++] = left.y
    positions[j++] = height
    uvs[t++] = 0
    uvs[t++] = vUvyMax

    positions[j++] = left.x
    positions[j++] = left.y
    positions[j++] = height
    uvs[t++] = 0
    uvs[t++] = vUvyMax

    positions[j++] = right.x
    positions[j++] = right.y
    positions[j++] = 0
    uvs[t++] = 1
    uvs[t++] = 0

    positions[j++] = right.x
    positions[j++] = right.y
    positions[j++] = height
    uvs[t++] = 1
    uvs[t++] = vUvyMax
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2))
  return geometry
}

export function getPathGeometry(points: IPoint[]) {
  const positions: number[] = []
  const current: number[] = []
  const start = new THREE.Vector3()
  const end = new THREE.Vector3()
  let j = 0
  for (let i = 0; i <= points.length - 2; i++) {
    start.set(points[i].x, points[i].y, points[i].z || 0)
    end.set(points[i + 1].x, points[i + 1].y, points[i + 1].z || 0)

    const curve = new THREE.LineCurve3(start, end)
    const number = start.distanceTo(end)

    const segPoints = curve.getPoints(number)

    segPoints.forEach((item) => {
      current.push(j++)
      positions.push(item.x, item.y, item.z)
    })
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
  geometry.setAttribute('current', new THREE.BufferAttribute(new Float32Array(current), 1))
  return geometry
}
