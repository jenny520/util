export function flattern(arr: Array<any>):any {
  return arr.reduce((prev, current) => {
    return prev.concat(Array.isArray(current) ? flattern(current) : current)
  }, [])
}


