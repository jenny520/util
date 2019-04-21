// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined';
export const UA = inBrowser && window.navigator.userAgent.toLocaleLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > -1;
export const isEdge = UA && UA.indexOf('edge/') > -1;
export const isAndroid = UA && UA.indexOf('android') > -1;
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isIE;
export const isUC = UA && UA.indexOf('ucbrowser') > -1;
export const isWechat = UA && /micromessenger/.test(UA);
export const isQQ = UA && /qq/.test(UA);
export const isAli = UA && /alipayclient|dingtalk/.test(UA);
/* istanbul ignore next */
export function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export const hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)

