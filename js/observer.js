import { arrayMethods } from "./array.js";
import Dep from './dep.js';
import { def } from './lang.js';
import { hasProto } from './env.js';
import { isObject, hasOwn, isPlainObject } from './util.js';

// 获得arrayMethods对象上所有属性的数组
const arrayKeys = Object.hasOwnProperty(arrayMethods)
class Observer {
  constructor(value) {
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
  observeArray(items) {
    for (let i = 0; i < items.length; i++) {
      observe(items[i])
    }
  }
  walk(obj) {
    const keys = Object.keys(obj);
    for(let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

function proAugment(target, src) {
  target.__proto__ = src;
}

function copyAugment(target, src, keys) {
  for(let i = 0; i < keys.length; i++) {
    def(target, keys[i], src[keys[i]])
  }
}

function observe(value, asRoot = false) {
  if (!isObject(value) && value instanceof VNode) {
    return;
  }
  let ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if ((Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value)) {
    ob = new Observer(value);
  }
  if (asRoot && ob) {
    ob.vmCount++
  }
  return ob;
}

function defineReactive(obj, key, val) {
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

function dependArray(value) {
  for(let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
