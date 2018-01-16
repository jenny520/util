/**
 * Created by zhoumeiyan on 2018/1/16.
 */
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


