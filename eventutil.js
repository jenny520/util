/**
 * Created by zhoumeiyan on 2018/1/18.
 */
const EventUtil = {
    addHandle(element, type, handle) {
        if (element.addEventListener) {
            element.addEventListener(type, handle, false)
        } else if (element.attachEvent) {
            element.attachEvent(`on${type}`, handle)
        } else {
            element[`on${type}`] = handle
        }
    },
    removeHandle(element, type, handle) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handle, false)
        } else if (element.detachEvent) {
            element.detachEvent(`on${type}`, handle)
        } else {
            element[`on${type}`] = null
        }
    }
}