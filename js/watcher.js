import { pushTarget, popTarget } from './dep.js'
let uid = 0;
class Watcher{
  constructor(vm, expOrFn, cb, options, isRenderWatcher = false) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = true
    }
    wm._watchers.push(this);
    this.cb = cb;
    this.id = ++uid;
    this.active = true;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.expression = expOrFn ? expOrFn.toString() : ''
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    }
    this.value = this.get();
  }
  get() {
    pushTarget(this);
    let value,
      vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch(err) {
      popTarget(this)
    }
    return value;
  }
  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }
  // clean up dependency collection
  cleanupDeps() {
    let i = this.deps.length;
    while(i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(dep)
      }
    }
    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }
  // 更新
  update() {
    this.run()
  }
  // 更新视图
  run() {
    console.log('这里会去执行Vue的diff相关方法，进而更新数据')
  }
}
