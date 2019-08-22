import { def } from '../utils/lang';

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
  def(arrayMethods, method, function mutator(...args:any[]) {
    const result = original.apply(this, args);
    const ob = this.__ob__;
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
    if (inserted) {
      ob.observeArray(inserted)
    }
    // notify change
    ob.dep.notify();
    return result;
  })
});


