/**
 * Created by zhoumeiyan on 2018/1/16.
 */
let store = {
    storage: window.localStorage,
    session: {
        storage: window.sessionStorage
    }
}
export function getElementLeft(el) {
    let actualLeft = el.offsetLeft
    let current = el.offsetParent
    while (current !== null) {
        actualLeft += current.offsetLeft
        current = current.offsetParent
    }
    return actualLeft
}

export function getElementTop(el) {
    let actualTop = el.offsetTop
    let current = el.offsetParent
    while (current !== null) {
        actualTop += current.offsetTop
        current = current.offsetParent
    }
    return actualTop
}

export function hasClass(el, className) {
  return el.classList.contains(className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  el.classList.add(className)
}

export function getData(el, name, val) {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(`${prefix}${name}`, val)
    }
    return el.getAttribute(`${prefix}${name}`)
}

let elementStyle = document.createElement('div').style
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }
    return false
})()

export function prefixStyle(style) {
    if (!vendor) {
        return false
    }
    if (vendor === 'standard') {
        return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export function addQueryStringArg(url, name, value) {
    if (url.indexOf('?') === -1) {
        url += '?'
    } else {
        url += '&'
    }
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
    return url
}

export function getquerystring (name, url) {
    let reg = new RegExp(`(^|&)${name}=([^&]*)($|&)`)
    let r = url.match(reg)
    if (r) {
        return decodeURIComponent(r[2])
    }
}

export function setStorage(key, val) {
    if (!val) {
        return
    }
    if (val && (typeof val === 'object')) {
        return store.storage.setItem(key, JSON.stringify(val))
    }
    return store.storage.setItem(key, val)
}

export function getStorage(key) {
    let val = store.storage.getItem(key)
    if (val === undefined) {
        return
    }
    return JSON.parse(val)
}

export function removeStorage(key) {
    return Array.isArray(key) ? key.forEach((item) => {
        store.storage.removeItem(item)
    }) : store.storage.removeItem(key)
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - mix + 1) + min)
}

export function debounce(fn, wait) {
    let timer;
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
          fn.apply(this, args)
        }, wait)
    }
}

export function throttle(fn, gapTime) {
  let _lastTime;
  return function() {
    let _nowTimer = + new Date();
    if ((_nowTimer - _lastTime) > gapTime || !_lastTime) {
      fn.apply(this, arguments);
      _lastTime = _nowTimer
    }
  }
}

export const emptyObject = Object.freeze({})

export function isUndef(v) {
  return v === undefined || v === null
}

export function isDef() {
  return v !== undefined && v !== null
}

export function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

export function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check whether the object has the property
 *
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Make a map and return a function for checking if a key
 * is in that map
 */
export function makeMap(str, expectToLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  list.forEach((item) => {
    map[item] = true
  })
  return expectToLowerCase
    ? (val) => map[val.toLowerCase()]
    : (val) => map[val]
}
