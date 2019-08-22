export const inBrowser = typeof window !== 'undefined';
export const hasProto = '__proto__' in {};
export const UA = inBrowser && window.navigator.userAgent.toLocaleLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > -1;
export const isEdge = UA && UA.indexOf('edge/') > -1;
export const isAndroid = UA && UA.indexOf('android') > -1;
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
export const isIphonex = UA && /iphone/.test(UA) && ((window.screen.height === 812 && window.screen.width === 375) || (window.screen.height === 896 && window.screen.width === 414));
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isIE;
export const isUC = UA && UA.indexOf('ucbrowser') > -1;
export const isWechat = UA && /micromessenger/.test(UA);
export const isQQ = UA && /qq/.test(UA);
export const isAli = UA && /alipayclient|dingtalk/.test(UA);
/* istanbul ignore next */
