!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).zmyUtils={})}(this,function(e){"use strict";function t(e,t,n,i){return Object.defineProperty(e,t,{value:n,enumerable:!!i,writable:!0,configurable:!0})}var n=Array.prototype,i=Object.create(n);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var n=i[e];t(i,e,function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];var r,o=n.apply(this,t),s=this.__ob__;switch(e){case"push":case"unshift":r=t;break;case"splice":r=t.slice(2)}return r&&s.observeArray(r),s.dep.notify(),o})});var r="undefined"!=typeof window,o="__proto__"in{},s=r&&window.navigator.userAgent.toLocaleLowerCase();s&&/msie|trident/.test(s);s&&s.indexOf("msie 9.0"),s&&s.indexOf("edge/"),s&&s.indexOf("android"),s&&/iphone|ipad|ipod|ios/.test(s),s&&/iphone/.test(s)&&(812===window.screen.height&&375===window.screen.width||896===window.screen.height&&window.screen.width),s&&/chrome\/\d+/.test(s),s&&s.indexOf("ucbrowser"),s&&/micromessenger/.test(s),s&&/qq/.test(s),s&&/alipayclient|dingtalk/.test(s);var p=Object.prototype.hasOwnProperty,a=Object.prototype.toString,c=0,h=(d.prototype.addSub=function(e){this.subs.push(e)},d.prototype.removeSub=function(e){!function(e,t){if(e.length){var n=e.indexOf(t);-1<n&&e.splice(n,1)}}(this.subs,e)},d.prototype.depend=function(){d.target&&d.target.addDep(this)},d.prototype.notify=function(){var e=this.subs.slice();console.log(e);for(var t=0;t<e.length;t++)e[t].update()},d);function d(){this.subs=[],this.id=c++}h.target=null;var u=[],f=Object.hasOwnProperty(i),l=(y.prototype.observeArray=function(e){for(var t=0;t<e.length;t++)v(e[t])},y.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)b(e,t[n])},y);function y(e){this.value=e,this.dep=new h,this.vmCount=0,t(e,"__ob__",this),Array.isArray(e)?(o?function(e,t){e.__proto__=t}(e,i):function(e,n,i){for(var r=0;r<i.length;r++)t(e,i[r],n[i[r]])}(e,i,f),this.observeArray(e)):this.walk(e)}function v(e,t){var n;if(function(e){return null!==e&&"object"==typeof e}(e))return function(e,t){return p.call(e,"__ob__")}(e)&&e.__ob__ instanceof l?n=e.__ob__:(Array.isArray(e)||function(e){return"[object Object]"===a.call(e)}(e))&&Object.isExtensible(e)&&(n=new l(e)),t&&n&&n.vmCount++,n}function b(e,t,n){var i=new h,r=Object.getOwnPropertyDescriptor(e,t);if(!r||!1!==r.configurable){var o=r&&r.get,s=r&&r.set;o||s||2!==arguments.length||(n=e[t]);var p=v(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=o?o.call(e):n;return console.log(h.target),h.target&&(i.depend(),p&&(p.dep.depend(),Array.isArray(n)&&function e(t){for(var n=void 0,i=0,r=t.length;i<r;i++)(n=t[i])&&n.__ob__&&n.__ob__.dep.depend(),Array.isArray(n)&&e(n)}(n))),t},set:function(t){var r=s?s.call(e):n;r===t||t!=t&&r!=r||o&&!s||(s?s.call(e,t):n=t,p=v(t),i.notify())}})}}var g=0,w=(_.prototype.get=function(){!function(e){u.push(e),h.target=e}(this);var e,t=this.vm;try{e=this.getter.call(t,t)}finally{u.pop(),h.target=u[u.length-1],this.cleanupDeps()}return e},_.prototype.addDep=function(e){console.log(e);var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},_.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var t=this.deps[e];this.newDepIds.has(t.id)||t.removeSub(t)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},_.prototype.update=function(){this.run()},_.prototype.run=function(){console.log("这里会去执行Vue的diff相关方法，进而更新数据")},_);function _(e,t,n,i,r){this.vm=e,r&&(e._watcher=!0),this.cb=n,this.id=++g,this.active=!0,this.deps=[],this.newDeps=[],this.depIds=new Set,this.newDepIds=new Set,this.expression=t?t.toString():"","function"==typeof t&&(this.getter=t),this.value=this.get()}e.Watcher=w,e.observe=v,Object.defineProperty(e,"__esModule",{value:!0})});
