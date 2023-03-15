import type { Material, Object3D } from 'three'

export function disposeObject(object: Object3D) {
  if (!object) return
  object.traverse((object: any) => {
    if (object.geometry) {
      object.geometry.dispose()
    }
    if (object.material) {
      const materials = Array.isArray(object.material) ? object.material : [object.material]
      materials.forEach((ele: Material) => {
        ele.dispose()
      })
    }

    if (typeof object.dispose === 'function') {
      object.dispose()
    }
  })
}

export function removeObject(object: Object3D) {
  if (!object) return
  disposeObject(object)
  if (object.parent) {
    object.parent.remove(object)
  }
}

export function removeObjectChildren(object: Object3D) {
  if (!object) return
  const children = [...object.children]
  children.forEach((ele) => {
    removeObject(ele)
  })
}

// 判断一个对象是否可见
export function isObjectVisible(object?: Object3D): boolean {
  if (!object) return false
  if (object.visible === false) return false
  if (object.parent) {
    return isObjectVisible(object.parent)
  }
  return true
}
