/*
 处理在安卓和iOS手机上弹出键盘，fixed定位导致
 */

/*
 问题背景，在写支付页，因为提交订单按钮是使用fixed布局，并且固定在页面底部，在写支付页拼团信息，填写拼团学校和姓名
 调起键盘时导致固定的fixed布局位置错乱，因为iOS上呼气键盘页面的窗口高度不会改变，并不会触发 window.onresize事件
 所以针对安卓和iOS手机使用两种不同的处理方案
 */

/*
 安卓手机，当调起键盘时，页面的窗口高度会改变（document.documentElement.clientHeight）
 从触发window.onresize事件
 */

function fixedAndroidKeyBorde() {
  let bodyHeight = document.documentElement.clientHeight
  window.onresize = () => {
    if (/android/i.test(navigator.userAgent.toLocaleLowerCase())) {
      if (bodyHeight > document.documentElement.clientHeight) {
        // 调起键盘时，修改定位为static
        this.$refs.fixedBottom.style.position = 'static'
      } else {
        this.$refs.fixedBottom.style.position = 'fixed'
      }
    }
  }
}

/*
 iOS手机，当input获取焦点focus方法，调起键盘，失去焦点blur收起键盘
 */

function fixedIOSFocusKeyBorder() {
  if (/iphone|ipad/i.test(navigator.userAgent.toLocaleLowerCase())) {
    // 调起键盘时，修改定位为static
    this.$refs.fixedBottom.style.position = 'static'
  }
}

function fixedIOSBlurKeyBorder() {
  if (/iphone|ipad/i.test(navigator.userAgent.toLocaleLowerCase())) {
    // 调起键盘时，修改定位为static
    this.$refs.fixedBottom.style.position = 'fixed'
  }
}
