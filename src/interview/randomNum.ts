const array:Array<number> = [];
export function getRandomNum(min:number, max:number) {
  return Math.random() * (max - min + 1) + min;
}

/**
 * 随机生成5个不重复的字符串
 * @param {number} num
 * @return {number | Array<number>}
 */
export default function randomNum(num:number):(number | Array<number>) {
  if (array.length === 5) {
    return array;
  }
  if (!array.includes(num)) {
    array.push(num);
  }
  return randomNum(getRandomNum(2, 32));
}
