#css
>font-weight  
>>不同的font-family所能兼容的字体大小不一致  

>background-clip
>>可以解决在背景色和边框颜色一致的情况下，设置border-color为透明值时，不被背景色覆盖  

>box-shadow
>> 可以实现多层边框，outline区别，box-shadow没法获取虚线边框，
outline没法贴合border-radius的圆角，所以在大部分情况下可以进行综合

>background-origin
>> background-position的基准，默认情况下是padding-box,可以设置为content-box,这样就可以保持背景图片默认
偏移是跟padding保持一致

>calc()方案注意点
>> 请不要忘记在calc()函数内部的 - 和 + 运算符两侧各加一个空白符，否则会产生解析错误

