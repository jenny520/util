import Dep, { pushTarget, popTarget } from './dep.js'
import { SimpleSet } from '../../types/simpleSet'
import { queueWatcher } from './schedule'
import {Function} from "estree";
import { remove } from '../utils/util';
let uid = 0
export default class Watcher {
  vm: any;
  cb: Function;
  id: number;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  expression: string;
  getter: Function;
  value: any;
  dirty: boolean;
  deep: boolean;
  constructor(vm:any, expOrFn: string | Function, cb: Function, options?:Object, isRenderWatcher?:boolean) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = true
    }
    // this.wm._watchers.push(this)
    if (options) {
      this.deep = !!options.deep
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb
    this.id = ++uid
    this.active = true
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = expOrFn ? expOrFn.toString() : ''
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    }
    this.value = this.get()
  }
  get() {
    pushTarget(this)
    let value,
      vm = this.vm
    try {
      value = this.getter.call(vm, vm)
    } finally {
      if (this.deep) {

      }
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
  addDep(dep: Dep) {
    console.log(dep)
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
  // clean up dependency collection
  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(dep)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  teardown() {
    if (this.active) {
      if (!this.vm._isBeingDestoryed) {
        remove(this.vm._watchers, this);
      }
      let i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false;
    }
  }
  // 更新
  update() {
    queueWatcher(this);
    // this.run()
  }
  // 更新视图
  run() {
    console.log('这里会去执行Vue的diff相关方法，进而更新数据')
  }
}
