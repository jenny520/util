import { arrayMethods } from "./array.js";
import Dep from './dep.js';
import { def, hasProto, isObject, hasOwn, isPlainObject } from '../utils/index';

// 获得arrayMethods对象上所有属性的数组
const arrayKeys = Object.hasOwnProperty(arrayMethods)
export default class Observer {
  value: any;
  dep: Dep;
  vmCount: number;
  constructor(value:any) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // 处理数组
      if (hasProto) {
        proAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(items:Array<any>) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }
  walk(obj:object) {
    const keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

function proAugment(target, src:object) {
  target.__proto__ = src;
}

function copyAugment(target:object, src:object, keys:Array<string>) {
  for(let i = 0; i < keys.length; i++) {
    def(target, keys[i], src[keys[i]])
  }
}

export function observe (value: any, asRootData?:boolean): Observer | void  {
  if (!isObject(value)) {
    return;
  }
  let ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if ((Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value)) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob;
}

function defineReactive(
  obj: Object,
  key: string,
  val: any) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }
  const getter = property && property.get;
  const setter = property && property.set;
  if (!getter && !setter && arguments.length === 2) {
    val = obj[key]
  }
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      console.log(Dep.target);
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(val)) {
            dependArray(val)
          }
        }
      }
      return value
    },
    set: function reactiveSetter(newVal) {
      const value = setter ? setter.call(obj) : val;
      if (value === newVal || (newVal !== newVal && value !== value)) {
        return
      }
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = observe(newVal)
      dep.notify();
    }
  })
}

function dependArray(value:Array<any>) {
  for(let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
