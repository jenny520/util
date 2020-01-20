/**
 * 去掉字符串两边的空格
 * @param {string} str
 * @param {string} direction
 * @return {string}
 */
export default function trim(str: string, direction:string):string {
  let reg;
  switch (direction) {
    case 'left':
      reg = /^\s+/g;
      break;
    case 'right':
      reg = /\s+$/g;
      break;
    case 'both':
      reg = /^\s+|\s+$/g;
      break;
    default:
      reg = /\s+/g;
  }
  if (typeof str === 'string') {
    return str.replace(reg, '');
  }
  return str;
}
