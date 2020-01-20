export function bind() {
  var slice = Array.prototype.slice
  Function.prototype.bind = function() {
    var thatFun = this,
      thatArg = arguments[0]
    var args = slice.call(arguments, 1)
    if (typeof thatFun !== 'function') {
      throw new TypeError(
        "Function.prototype.bind - ' +\n" +
        "             'what is trying to be bound is not callable'"
      )
    }
    return function() {
      var funcArgs = args.concat(slice.call(arguments))
      thatFun.apply(thatArg, funcArgs)
    }
  }
}
