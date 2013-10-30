rotateList
==========

**基于jQuery的轮播图插件**


```js
    mouseCtrl:"click",                     // 切换导航鼠标事件
    ctrlEleName:"ctrlBo",                  // 切换导航
    ctrlEleNamePo:"ctrlPo",                // 单向切换导航
    position:"left",                       // 切换运动方向
    speed:500,                             // 切换运动速度
    aniTime:5000,                          // 自动切换停滞时间
    focus:"on",                            // 当前焦点
    focuSiblings:"a",                      // 当前焦点同辈的元素
    eleName:"a",                           // 切换导航按扭元素名
    leftCtrlClass:".leftCtrl",             // 单向左控制按扭
    rightCtrlClass:".rightCtrl"            // 单向右控制按扭
```

**使用方法**
```js
    $(element).rotate();
    // 默认横向拉洋片切换
    
    $(element).rotate({
    position:"top"
    });
    // 纵向拉洋片切换
    
    $(element).rotate({
    position:"opacity"
    });
    // 淡入淡出切换
```
