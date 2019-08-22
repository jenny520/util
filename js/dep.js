let uid = 0
export default class Dep {
  static target
  constructor() {
    this.subs = []
    this.id = uid++
  }
  // 添加一个观察者对象
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    remove(this.subs, sub)
  }
  // 依赖收集
  depend() {
    // Dep Target只有依赖才需要收集
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  // 调用依赖收集的Watcher更新
  notify() {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
const targetStack = null
function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}

function popTarget(target) {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
function remove(array, item) {
  if (array.length) {
    const index = array.indexOf(item)
    if (index > -1) {
      return array.splice(index, 1)
    }
  }
}
