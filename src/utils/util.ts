export function isObject(obj:any):boolean {
  return obj !== null && typeof obj === 'object'
}
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj:Object | Array<any>, key: string) {
  return hasOwnProperty.call(obj, key)
}
/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj:any) {
  return _toString.call(obj) === '[object Object]'
}
export function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

export function noop(a?: any, b?:any, c?: any) {}

export function isValidArrayIndex(val:any):boolean {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
