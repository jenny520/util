#code
> 每个组件文件大小不超过400行

> 每个函数代码不超过100行，遵循函数功能单一原则

> 定义方法与数据要物以类聚
>> 具有相似功能的方法和数据放在靠近的位置

>> 工具类方法放在一起，最好放在最后面

>> data里面只放置与模版渲染相关的数据

> css的书写顺序
>> 把引起回流的放在引起重绘的元素前面

>> 
```css
.box {
  /*position 放在最前面*/
  position: relative;
  /*然后是参照 position 进行定位的属性*/
  top: 100px;
  left: 10px;
  /*然后是宽高*/
  width: 100px;
  height: 100px;
  /*然后是margin padding*/
  margin: 10px;
  padding: 20px 30px;
  /*font*/
  font-size: 20px;
  font-weight: 700;
  /*border*/
  border: 1px solid red;
  border-radius: 4px;
  /*background*/
  background-color: pink;
  /*z-index*/
  z-index: 10;
}

```

> 必要而准确的注释
>> 必要而精确的注释必不可少，需要长期维护的宁缺毋滥

> 变量和方法的命名最好有一定规律
>> 数组变量以list作为后缀，信息对象以info作为后缀，判断变量以is作为开头，方法按照功能，获取以get作为前缀，设置以set,

> Do not repeat yourself

> 业务代码和非业务代码进行隔离

> 与位置无关的元素聚集写

> 删除无用代码，做好容错，遵循一定的规范


