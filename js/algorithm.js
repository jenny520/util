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


/**
 * 冒泡排序
 * @param {array} 需要排序的数组
 * @returns {array} 返回有序的数组
 */

function bubbleSort (arr) {
  const tempArr = arr.slice();
  const len = tempArr.length;
  for(let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (tempArr[j] > tempArr[j + 1]) {
        let temp = tempArr[j];
        tempArr[j] = tempArr[j + 1];
        tempArr[j + 1] =temp;
      }
    }
  }
  return tempArr;
}

/**
 * 优化后的冒泡排序（获取每次排序中最大值位置和最小值，从而使排序躺数减少一半）
 */

function bubbleSort2 (arr) {
  const tempArr = arr.slice();
  let low = 0;
  let height = tempArr.length - 1;
  while (low < height) {
    for (let i = low; i < height; i++) {
      if (tempArr[i] > tempArr[i + 1]) {
        let temp = tempArr[i];
        tempArr[i] = tempArr[i + 1];
        tempArr[i + 1] = temp;
      }
    }
    height--;
    for (let j = height; j > low; j--) {
      if (tempArr[j] < tempArr[j--]) {
        let temp = tempArr[j];
        tempArr[j] = tempArr[j - 1];
        tempArr[j - 1] = temp;
      }
    }
    low++;
  }
  return tempArr;
}

/**
 * 简单的数组去重的一个实现
 * @param array
 * @return {Array}
 */
function unique1(array){
  var tempArr = []; //一个新的临时数组
  //遍历当前数组
  for(var i = 0; i < array.length; i++){
    //如果当前数组的第i已经保存进了临时数组，那么跳过，
    //否则把当前项push到临时数组里面
    if (!tempArr.includes(array[i])) {
      tempArr.push(array[i]);
    }
  }
  return tempArr;
}
