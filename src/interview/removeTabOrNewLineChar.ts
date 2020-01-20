/**
 * 移除字符串中的制表符、换行符
 * @param {string} str
 * @return {string}
 */
export function removeTabOrNewLineChar(str:string):string {
  return str.replace(/[\t\n\r\v]/g, '');
}
