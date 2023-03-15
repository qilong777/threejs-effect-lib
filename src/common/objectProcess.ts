export function traverseSetParams(target: any, obj: any) {
  if (!obj) return
  for (const key in obj) {
    // if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
    if (
      typeof obj[key] === 'object' &&
      obj[key] &&
      Reflect.getPrototypeOf(obj[key]) === Object.prototype
    ) {
      if (target[key] === undefined) {
        target[key] = {}
      }
      traverseSetParams(target[key], obj[key])
    } else {
      target[key] = obj[key]
    }
  }
}
