import {
  PROMISE_ID,
  noop,
} from './internal';
class Promise {
  constructor(resolver) {
    // nextId() 返回一个自增的闭包变量
    this[PROMISE_ID] = nextId();
    // 初始化变量
    // _result 缓存 resolve时的value或者reject时的reason
    // _state 缓存promise的当前状态 初始化为pending
    this._result = this._state = undefined;
    // 订阅序列
    this._subscribers = [];

    // 外部调用时：对传入参数进行检查
    if (noop !== resolver) {
      // 条件1：resolver 必须要是一个函数
      typeof resolver !== 'function' && needsResolver();
      // 条件2：必须通过 new Promise() 初始化实例
      this instanceOf Promise ? initializePromise(this, resolver) : needsNew();
      // 符合以上条件的进行初始化
      // initializePromise()函数
    }
  }
}
