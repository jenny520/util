import {
  noop,
  nativeWatch,
  isPlainObject,
} from '../utils/index';
import Watcher from '../observer/watcher';
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
};
export function proxy(target: object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
export function initState(vm) {
  const opts = vm.$options;
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
function initWatch(vm, watch:object) {
  for(const key in watch) {
    const handler = watch[key];
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
function createWatcher(vm, expOrFn: string | Function, handler: any, options?: object) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
} 
export function stateMixin(Vue: any) {
  Vue.prototype.$watch = function(
    expOrFn: string | Function,
    cb: any,
    options?: object,
  ) {
    const vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn() {
      watcher.teardown()
    }
  }
}
function initComputed(vm:any, computed: {[index:string]:any}) {
  const watchers = vm._computedWatchers = Object.create(null)
  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    watchers[key] = new Watcher(vm, getter || noop, noop);
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    }
  }
}

export function defineComputed(target: any, key: string, userDef: object | Function) {
  if (typeof userDef === "function") {
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      watcher.depend();
      return watcher.evaluate();
    }
  }
}
