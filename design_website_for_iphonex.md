##兼容iphoneX
> use the whole space(使用全屏)

```html
<meta name='viewport' content='initial-scale=1, viewport-fit=cover'>
```

> respect the safe content(页面主体内容限定在安全区域内)
>> 只有设置了 viewport-fit=cover，才能使用 env()

```css
/*写法一*/
.post {
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS > 11.2 */
}

/*写法二*/
@supports (padding-bottom: max(0px)) {
  .post {
    padding-bottom: max(12px, constant(safe-area-inset-bottom));
    padding-bottom: max(12px, env(safe-area-inset-bottom));
  }
}
```

> 引用超链接地址

[英文版](https://webkit.org/blog/7929/designing-websites-for-iphone-x/?hmsr=funteas.com&utm_medium=funteas.com&utm_source=funteas.com)
[中文版](https://aotu.io/notes/2017/11/27/iphonex/?src=wx&o2src=wx)