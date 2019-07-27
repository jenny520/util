export function def(target, key, val, enumerable = false) {
  return Object.defineProperty(target, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}
