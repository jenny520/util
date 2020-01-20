/**
 * 去除字符串尾部莫个字符
 * @param {string} str
 * @param {string} target
 * @return {string}
 */
export default function delLastStr(str:string, target:string):string {
  let reg = new RegExp(`${target}(?=([^${target}]*)$)`);
  return str.replace(reg, '')
}
