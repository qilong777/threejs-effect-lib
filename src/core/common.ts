export function disposeObject(object: any) {
  object.traverse((child: any) => {
    if (child.geometry) {
      child.geometry.dispose()
    }
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((m: any) => {
          m.dispose()
        })
      } else {
        child.material.dispose()
      }
    }
  })
}
