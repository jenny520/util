import { isFunction } from './utils'

export const PROMISE_ID = Math.random()
  .toString(36)
  .substring(2)
function noop() {}
const PENDING = void 0
const FULFILLED = 1
const REJECTED = 2

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.')
}
/**
 * pedding => fulfilled
 * @param promise
 * @param value
 */
function fulfill(promise, value) {
  // promise状态不可逆
  if (promise._state !== PENDING) {
    return
  }
  // 缓存处理结果，修改promise状态
  promise._result = value
  promise._state = FULFILLED
  // promise的状态发生了改变
  // 向订阅序列发出通知
  if (promise._subscribers.length !== 0) {
    asap(publish, promise)
  }
}
function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
  try {
    then.call(value, fulfillmentHandler, rejectionHandler)
  } catch (e) {
    return e
  }
}
function handleForeignThenable(promise, thenable, then) {
  asap(promise => {
    // 用一个sealed 保证只能调用一次
    var sealed = false
    // tryThen方法
    // 1.以thenable作为执行上下文
    // 2.传入(value => {}, reason => {})参数
    // 3.执行then函数
    var error = tryThen(
      then,
      thenable,
      value => {
        if (sealed) {
          return
        }
        sealed = true
        if (thenable !== value) {
          // 如果resolve的value不是原来的thenable对象
          // 进一步对value进行处理(有可能又是一个promise实例或者thenable对象，或者其他情况...)
          resolve(promise, value)
        } else {
          // 如果resolve的value还是原来的thenable对象
          // 则直接fulfill这个对象
          // 不再进一步通过resolve避免死循环
          fulfill(promise, value)
        }
      },
      reason => {
        if (sealed) {
          return
        }
        sealed = true
        // then方法reject('xx')
        reject(promise, reason)
      },
      'Settle: ' + (promise._label || ' unknown promise')
    )
    // if error
    // rejected 状态
    if (!sealed && error) {
      sealed = true
      reject(promise, error)
    }
  }, promise)
}
/**
 * resolve的值value是一个promise实例
 * @param promise
 * @param thenable
 */
function handleOwnThenable(promise, thenable) {
  // 检查thenable状态
  if (thenable._state === FULFILLED) {
    // FULFILLED状态
    // 使用thenable内部缓存的处理结果
    // 作为value 调用fulfill更新状态
    fulfill(promise, thenable._result)
  } else if (thenable._state === REJECTED) {
    // REJECTED 状态
    // 使用thenable内部缓存的处理结果
    // 作为reason调用reject更新状态
    reject(promise, thenable._result)
  } else {
    // pending状态，对thenable增加监听
    // 当thenable的状态改变时
    // 用其结果缓存 更新promise的状态
    subscribe(
      thenable,
      undefined,
      value => resolve(promise, value),
      reason => reject(promise, reason)
    )
  }
}
function handleMaybeThenable(promise, maybeThenable, then) {
  if (
    maybeThenable.constructor === promise.constructor &&
    then === originalThen &&
    maybeThenable.constructor.resolve === originalResolve
  ) {
    // 1.resolve的值是一个promise实例
    // 即通过new Promise() 新建的实例
    handleOwnThenable(promise, maybeThenable)
  } else {
    // 2.获取value的then属性时发生错误
    // 更新promise 的状态为rejected
    if (then === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error)
      TRY_CATCH_ERROR.error = null
    } else if (then === undefined) {
      // 3.虽然resolve的值是函数或者对象，但不存在then属性
      // 按照普通函数数据类型处理
      fulfill(promise, maybeThenable)
    } else if (isFunction(then)) {
      // 4.resolve的值是一个thenable对象，具有then属性，并且为函数
      handleForeignThenable(promise, maybeThenable, then)
    } else {
      // 5.then是其他数据类型，直接进行处理
      fulfill(promise, maybeThenable)
    }
  }
}
function resolve(promise, value) {
  if (promise === value) {
    // 1.不允许 value是 promise实例本身
    // 更新为 rejected 状态
    reject(promise, selfFulfillment())
  } else if (objectOrFunction(value)) {
    let then
    try {
      then = value.then
    } catch (error) {
      reject(promise, error)
      return
    }
    //2.value是对象或者函数
    handleMaybeThenable(promise, value, then)
  } else {
    //3.其他数据类型
    fulfill(promise, value)
  }
}
function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result)
  }
  // promise的状态发生了改变
  // 向订阅序列发出通知
  publish(promise)
}
function reject(promise, reason) {
  // 状态一旦改变就不可逆转
  if (promise._state !== PENDING) {
    return
  }
  // 缓存处理结果 更新promise状态
  promise._state = REJECTED
  promise._result = reason
  // 注：asap 函数暂不详细解释，后面源码中多次用到
  // asap(func, param) 可以理解为立即执行 func(param)
  // promise 的状态发生了改变，通知订阅者
  asap(publishRejection, promise)
}

/**
 * @param parent  被订阅状态变化的Promise
 * @param child   订阅状态变化的Promise（可为undefined）
 * @param onFulfillment   状态变化为fulfilled的订阅函数
 * @param onRejection     状态变化为rejected的订阅函数
 */
function subscribe(parent, child, onFulfillment, onRejection) {
  let { _subscribers } = parent
  let { length } = _subscribers
  parent._onerror = null
  // 每调用一次subscribe函数，订阅序列会增加三个元素
  _subscribers[length] = child
  _subscribers[length + FULFILLED] = onFulfillment
  _subscribers[length + REJECTED] = onRejection
  // 有可能是在parent状态更新之后增加的订阅
  // 此时的订阅列被清空，状态不再发生变化 则直接发出通知
  if (length === 0 && parent._state) {
    asap(publish, parent)
  }
}

/**
 * Promise状态更新 发出通知
 * @param promise
 */
function publish(promise) {
  // 所有订阅序列
  let subscribers = promise._subscribers
  // promise的状态
  let settled = promise._state
  // 订阅序列为空
  if (subscribers.length === 0) {
    return
  }
  /**
   * child: 订阅状态变化的promise
   * callback: 回调函数
   * detail: value或者reason缓存
   */
  let child,
    callback,
    detail = promise._result
  // 每三个元素为一个订阅单位
  // 格式如：child + fulfilled + rejected
  for (let i = 0; i < subscribers.length; i += 3) {
    // child = [object Promise]
    child = subscribers[i]
    // 根据promise的状态获取相应的回调函数
    callback = subscribers[i + settled]
    // 情况1：存在promise实例订阅
    if (child) {
      invokeCallback(settled, child, callback, detail)
    } else {
      // 情况2：触发响应的回调函数
      callback(detail)
    }
  }
  // 清空监听数组
  promise._subscribers.length = 0
}

/**
 * @param settled
 * @param promise
 * @param callback
 * @param detail
 */
function invokeCallback(settled, promise, callback, detail) {
  let hasCallback = isFunction(callback),
    value,
    error,
    succeeded = true
  if (hasCallback) {
    // 尝试执行回调函数
    // 发生错误时 则返回 TRY_CATCH_ERROR
    try {
      value = callback(detail)
    } catch (e) {
      succeeded = false
      error = e
    }
    // 不允许回调函数返回了原有的promise实例
    if (promise === value) {
      reject(promise, cannotReturnOwn())
      return
    }
  } else {
    // 不存在回调函数
    value = detail
    succeeded = true
  }
  // 更新promise的状态
  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    // 回调函数存在的情况
    // value 是回调函数的返回值
    resolve(promise, value)
  } else if (succeeded === false) {
    // error 是调用回调函数的错误时的原因
    reject(promise, error)
  } else if (settled === FULFILLED) {
    // 回调函数不存在的情况
    // 直接使用父promise的value
    fulfill(promise, value)
  } else if (settled === REJECTED) {
    reject(promise, value)
  }
}
function initializePromise(promise, resolver) {
  try {
    // 立即执行 resolver函数
    // 传入包装好的函数
    resolver(
      function resolvePromise(value) {
        resolve(promise, value)
      },
      function rejectPromise(reason) {
        reject(promise, reason)
      }
    )
  } catch (e) {
    // 代码发生异常
    // 则直接更新promise的状态为 rejected
    reject(promise, e)
  }
}

let id = 0
function nextId() {
  return id++
}
function makePromise(promise) {
  promise[PROMISE_ID] = id++
  promise._state = undefined
  promise._result = undefined
  promise._subscribers = []
}
export {
  noop,
  nextId,
  makePromise,
  resolve,
  reject,
  fulfill,
  subscribe,
  publish,
  publishRejection,
  initializePromise,
  invokeCallback,
  FULFILLED,
  REJECTED,
  PENDING,
  handleMaybeThenable
}
