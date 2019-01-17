import {inBrowser} from "./env";

export let mark
export let measure

const perf = inBrowser && window.performance

if (
  perf &&
  perf.mark &&
  perf.clearMarks &&
  perf.clearMeasures &&
  perf.measure
) {
  mark = (name) => perf.mark(name)
  measure = (name, startTag, endTag) => {
    perf.measure(name, startTag, endTag)
    perf.clearMarks(startTag)
    perf.clearMarks(endTag)
    perf.clearMeasures(name)
  }
}