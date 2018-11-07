#复杂逻辑的更优雅写法
> 申明一个actions方法存储所有的状态
>> 1.使用Map对象进行健-值对的存储，key可以使用正则表达式进行匹配，

>> 2.这样每次根据在用户点击调用onButtonClick方法，把需要匹配的条件状态作为参数传进去，

>> 3.使用数组的filter函数和key的正则表达式进行匹配满足条件过滤数组，

>> 4.然后对数组进行循环调用对应的方法
```js
const actions = () => {
  const functionA = () => { // do sth }
  const functionB = () => { // do sth }
  return new Map([
    [/status_[1-4]/, functionA],
    [/status_[5-8]/, functionB]
  ])
}

const onButtonClick = (identify, status) => {
  let actions = [...actions].filter(([key, value]) => (key.test(`${identify}-${status}`)))
  actions.forEach(([key, value]) => value.call(this))
}


