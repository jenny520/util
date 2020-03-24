// 管理当前命名空间下的事件
class eventMixin {
  public context: any
  public events: {[key: string]: any}
  constructor() {
    this.context = null;
    this.events = {};
  }

  /**
   * @description: 绑定上下文
   * @param context
   * @return this
   */
  public bind(context: any) {
    this.context = context;
    return this;
  }

  /**
   * @description 注册事件
   * @param {string | Array<string>} event
   * @param {Function} fn
   * @return {this}
   */
  public on(event: string | Array<string>, fn: Function) {
    const vm:any = this;
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i--) {
        this.on(event[i], fn);
      }
    } else {
      (vm.events[event]) || (vm.events[event] = []).push(fn)
    }
    return this;
  }

  /**
   * @description 该事件只能调用一次
   * @param {string | Array<string>} event
   * @param {Function} fn
   * @return {any}
   */
  public once(event?: string | Array<string>, fn?: Function) {
    const vm: any = this;
    function on() {
      vm.off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.on(event, on);
    return vm
  }

  /**
   * @description 注销事件
   * @param {string | Array<string>} event
   * @param {Function} fn
   * @return {any}
   */
  public off(event?: string | Array<string>, fn?: Function) {
    const vm: any = this;
    if (!arguments.length) {
      vm.events = Object.create(null);
      return vm;
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0; i < event.length; i--) {
        vm.off(event[i], fn);
      }
      return vm;
    }
    // specific event
    const cbs = vm.events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm.events[event] = null;
      return vm;
    }
    if (fn) {
      // specific handle
      let cb
      let i = cbs.length;
      while (i--) {
        cb = cbs[i]
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1)
          break;
        }
      }
    }
    return vm;
  }

  /**
   * @description 发布事件
   * @param {string} event
   * @return {any}
   */
  public emit(event: string) {
    const vm: any = this;
    let cbs = vm.events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs): cbs;
      const args = toArray(arguments, 1);
      for (let i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args)
        } catch (e) {
          console.log(e);
        }
      }
    }
    return vm;
  }
}
// 事件管理器
class eventBus {
  public EventStore!: {[key: string]: eventMixin}
  public context: any
  static EventBusInstance: null | eventBus
  constructor() {
    if (eventBus.EventBusInstance) {
      return eventBus.EventBusInstance
    }
    eventBus.EventBusInstance = this;
    this.EventStore = {}
  }

  /**
   * @description 绑定组件的uid
   * @param {string} uid
   * @return {any}
   */
  public uid(uid: string) {
    let currentStore = this.EventStore[uid]
    if (!currentStore) {
      currentStore = this.EventStore[uid] = new eventMixin()
    }
    return currentStore;
  }

  /**
   * @description 判断是否存在uid
   * @param {string} uid
   * @return {boolean}
   */
  public hasUid(uid: string):boolean {
    return !!(this.EventStore[uid])
  }
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray(list: any, start?: number) {
  start = start || 0;
  let i = list.length - start;
  let ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret;
}

function createEventBus() {
  return new eventBus()
}

export const Bus = createEventBus() as eventBus
