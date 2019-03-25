/**
 *
 * 洗牌算法
 * @param {array} array need to sort random
 * @returns {array} array has sorted random
 */
// 一种更加简易写法
function firstShuffle(arr) {
  let _arr = arr.slice(); // 尽量不要更改传入的参数避免产生副作用
  for (let i = _arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = temp;
  }
  return _arr;
}

// underscope.js写法

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandom(0, i);
    let temp = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = temp;
  }
  return _arr;
}

/**
 * 查找斐波纳契数列中第n个数
 * param {number}
 * returns {number}
 */
function fibonacci (n) {
  let newArray = new Array(n).fill(0); // 初始化数组，初始值为0
  newArray[1] = 1;
  for (let i = 2; i < n; i++) {
    newArray[i] = newArray[i - 1] + newArray[i - 2];
  }
  return newArray[n - 1];
}

/**
 * 找出数组中重复次数最多的元素(利用对象的key值是唯一的原则)
 * @param {array} ipLines: ip  address
 * @returns {string} return highestFrequency ip address
 */
function highestFrequency (array) {
  let [obj, max, name] = [{}, 1, ''];
  array.forEach((item) => {
    if (obj[item]) {
      obj[item]++;
      if (obj[item] > max) {
        max = obj[item];
        name = item;
      }
    } else {
      obj[item] = 1; // 初始化为1
    }
  });
  return name;
}


