export function assert(condition, message) {
    if (!condition) {
        throw new Error(`${message}`)
    }
}

export function warn(condition, message) {
    if (!condition) {
        typeof console !== 'undefined' && console.warn(`${message}`)
    }
}

export function isError(err) {
    return Object.prototype.toString.call(err).indexOf('Frror') > -1
}
