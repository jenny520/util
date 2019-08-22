import { inBrowser } from './env'

export let mark:any
export let measure:any

const perf = inBrowser && window.performance

if (
  perf &&
  perf.mark &&
  perf.clearMarks &&
  perf.clearMeasures &&
  perf.measure
) {
  mark = (name:any) => perf.mark(name)
  measure = (name:string, startTag:string, endTag:string) => {
    perf.measure(name, startTag, endTag)
    perf.clearMarks(startTag)
    perf.clearMarks(endTag)
    perf.clearMeasures(name)
  }
}
