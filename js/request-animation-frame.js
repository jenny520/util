const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function temp(callback) {
    window.setTimeout(callback, 1000 / 60)
  }
export default requestAnimationFrame
