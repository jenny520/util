/**
 * Created by zhoumeiyan on 2018/1/19.
 */
export const loadScript = (url) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.url = url
    document.body.appendChild(script)
};

export const loadStyle = (url) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = url
    const head = document.getElementsByTagName('head')[0]
    head.appendChild(link)
};

export const loadStyleString = (css) => {
    const style = document.createElement('style')
    style.type = 'text/css'
    try {
        style.appendChild(document.createTextNode(css))
    } catch (ex) {
        style.stylesheet.cssText = css
    }
    const head = document.getElementsByTagName('head')[0]
    head.appendChild(style)
}
