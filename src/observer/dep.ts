import Watcher from './watcher';
import { remove } from '../utils/index'
let uid = 0;
export default class Dep{
  static target?:Watcher;
  id: Number;
  subs: Array<Watcher>;

  constructor() {
    this.subs = [];
    this.id = uid++;
  }
  // 添加一个观察者对象
  addSub(sub: Watcher) {
    this.subs.push(sub)
  }
  removeSub(sub: Watcher) {
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
    const subs = this.subs.slice();
    console.log(subs);
    for(let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null;
const targetStack: Array<any> = [];
export function pushTarget(target?:Watcher) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

