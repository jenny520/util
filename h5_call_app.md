#h5唤起app
> iframe
```javascript 1.8
var invokeTimer,
  successCallback,
  failCallback;

var invoker = document.createElement('iframe');
invoker.style.display = 'none';
document.body.appendChild(invoker);

var hidden,
  visibilityChange,
  browserPrefix = ['', 'webkit', 'moz', 'ms'];

for(var i in browserPrefix) {
  if (typeof document[browserPrefix[i] + (browserPrefix[i] ? 'Hidden' : 'hidden')] != 'undefined') {
    hidden = browserPrefix[i] + (browserPrefix[i] ? 'Hidden' : 'hidden');
    visibilityChange = browserPrefix[i] + 'visibilitychange';

    break;
  }
}

visibilityChange && document.addEventListener(visibilityChange, function() {
  invokeTimer && document[hidden] && onInvokeSuccess();
}, false);

window.addEventListener('pagehide', function() {
  invokeTimer && onInvokeSuccess();
}, false);

function onInvokeSuccess(){
  clearTimeout(invokeTimer);
  invokeTimer = null;

  successCallback && successCallback.call(null);
  successCallback = null;
}

module.exports = function(uri, onFail, onSuccess) {
  successCallback = onSuccess;
  failCallback = onFail;

  invoker.src = (typeof uri == 'string' ? uri : 'askhomework://com.baidu.homework');

  var tick = new Date();
  invokeTimer = setTimeout(function(){
    invokeTimer = null;

    // 超时 100ms 则认为 app 调起成功。
    if (new Date() - tick > 1100) {
      successCallback && successCallback.call(null);
      successCallback = null;
    } else {
      failCallback && failCallback.call(null);
      failCallback = null;
    }
  }, 1000);    // 1 秒后检测状态。
};
```
> window.location.href
>> window.location.href = nativeUrl;

> a链接形式

> 在apple手机即ios上
>> 经过测试还是建议使用window.location.href，因为iframe在safari上几乎没法唤起成功，而ios默认的是safari浏览器

> 在android手机上
>> 经过测试还是可以使用iframe，在部分浏览器上可以唤起成功

> 可以增加一个fe的中间页，这样在唤起失败的情况还是留在中间页，可以在中间页手动点击去下载app

> 可以参考的链接地址
>> [h5callapp](https://blog.csdn.net/jiang314/article/details/52269824/)

