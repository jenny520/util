// import { def } from './lang.js';
function def(target, key, val, enumerable = false) {
  return Object.defineProperty(target, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}

// 针对支持__proto__
function protoAugment(target, src) {
  target.__proto__ = src;
}

// 针对不支持__proto__
function copyAugment(target, src, keys) {
  for (let i = 0; i < keys.length; i++) {
    def(target, keys[i], src[keys[i]])
  }
}

let urban = [];
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
];
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

methodsToPatch.forEach((method) => {
  // catch original methos
  const original = arrayMethods[method];
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args);
    console.log(result);
    // const ob = this.__ob__;
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // if (inserted) {
    //   ob.observeArray(inserted)
    // }
    // notify change
    // ob.dep.notify();
    return result;
  })
});
protoAugment(urban, arrayMethods);
console.log(urban);


