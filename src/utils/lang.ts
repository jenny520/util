export function def(target: Object, key: string, val: any, enumerable?:boolean) {
  return Object.defineProperty(target, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}
