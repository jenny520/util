/**
  针对字符串的大小写转换
 */
export function caseConvert(str:string) {
  return str.replace(/([a-z]*)([A-Z]*)/g, (_:string, s1:string, s2:string):string => {
    return `${s1.toUpperCase()}${s2.toLowerCase()}`
  })
}
