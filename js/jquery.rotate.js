/*
 * rotateList v2.0
 * Copyright (c) 2013 Wendell  http://blog.webql.info/
*/
(function($){
    $.fn.extend({
        rotateList:function(options){
            var thisObj = $(this);  // 使用对象
            if(thisObj.data("isTimer")==null){
                var defaults = {
                    mouseCtrl:"click",                     // 切换导航鼠标事件
                    ctrlEleName:"ctrlBo",                  // 切换导航
                    ctrlEleNamePo:"ctrlPo",                // 单向切换导航
                    position:"left",                       // 切换运动类型
                    speed:500,                             // 切换运动速度
                    aniTime:5000,                          // 自动切换停滞时间
                    focus:"on",                            // 当前焦点
                    focuSiblings:"a",                      // 当前焦点同辈的元素
                    eleName:"a",                           // 切换导航按扭元素名
                    leftCtrlClass:".leftCtrl",             // 单向左控制按扭
                    rightCtrlClass:".rightCtrl",           // 单向右控制按扭
                    moveMent:"ul",                         // 运动层
                    moveMentChild:"li",                    // 运动层子级
                    eleGroup:true,                         // 导航按扭组
                    eleGroupPo:true                        // 左右控制按扭组
                }
                var options = $.extend(defaults,options);   // 将defaults对象赋于变量options

                var moveParent = thisObj.find(options.moveMent).eq(0);  // 查找thisObj下的首个运动层
                var moveChild = moveParent.find(options.moveMentChild); // 查找首个运动层下的子元素
                var leng = moveChild.length;    // 运动层子元素的长度
                var vIndex = 0; // 初始化索引值
                var timer = null;   // 初始化timer为空

                if(thisObj.data("isRun") == null){  // 运行判断thisObj是否为空
                    fnAppend(); // 空则返回按扭组
                    thisObj.data("isRun",1);
                }
                var ctrlBo = $("." + options.ctrlEleName).find(options.eleName);    // 查找圆点按扭
                var ctrlPo = $("." + options.ctrlEleNamePo);   // 查找左右按扭
                thisObj.data("moveRotate",moveRotate);  // 存储运动函数
                moveRotate(0);  // 首次运动加载

                switch(options.position){   // 重置运动初始值
                    case "left":
                        moveParent.css("width",moveChild.length * moveChild.width());
                    break;
                    case "top":
                        moveChild.css({float:"none",display:"block"});
                    break;
                    case "opacity":
                        moveChild.css({opacity:0,position:"absolute"});
                        moveChild.eq(vIndex).css({opacity:1});
                    break;
                }

                function moveRotate(num){ // 运动方法
                    vIndex = num;   // 将传入值赋于索引值
                    thisObj.data("vIndex",vIndex);  // 存储索引值
                    ctrlBo.eq(num).addClass(options.focus).siblings(options.focuSiblings).removeClass(options.focus);
                    switch(options.position){
                        case "left":
                            moveParent.stop().animate({left:-moveChild.width() * num},options.speed);
                        break;
                        case "top":
                            moveParent.stop().animate({top:-moveChild.height() * num},options.speed);
                        break;
                        case "opacity":
                            moveChild.eq(num).stop().animate({opacity:1},options.speed).siblings().animate({opacity:0},options.speed);
                        break;
                    }
                }
                function fnAppend(){    // 动态写入按扭组
                    var alink = "<a href='javascript:;'></a>";
                    if(options.eleGroup){
                        thisObj.append("<div class='ctrlBo'></div>");
                        for(i = 0;i < leng;i++){
                            $("." + options.ctrlEleName).append(alink);
                        }
                    }
                    if(options.eleGroupPo){
                        thisObj.append("<div class='ctrlPo'><a href='javascript:;' class='leftCtrl'><i></i></a><a href='javascript:;' class='rightCtrl'><i></i></a></div>")
                    }
                }

                function rotateAni(){
                    moveRotate($(this).index());
                }
                var setAni = {
                    rightCtrl:function(){   // 单向右控制键
                        vIndex = thisObj.data("vIndex");
                        if(vIndex == moveChild.length - 1){
                            moveRotate(0);
                        }else{
                            moveRotate(vIndex + 1)
                        }
                    },
                    leftCtrl:function(){    // 单向左控制键
                        vIndex = thisObj.data("vIndex");
                        if(vIndex == 0){
                            moveRotate(leng - 1);
                        }else{
                            moveRotate(vIndex - 1);
                        }
                    }
                }
                function mOver(){
                    clearInterval(timer);
                    ctrlPo.show();
                }
                function mOut(){
                    timer = setInterval(setAni.rightCtrl,options.aniTime);
                    ctrlPo.hide();
                }

                ctrlBo.bind(options.mouseCtrl,rotateAni);
                timer = setInterval(setAni.rightCtrl,options.aniTime); 
                thisObj.bind("mouseover",mOver);
                thisObj.bind("mouseout",mOut);
                $(options.rightCtrlClass).bind("click",setAni.rightCtrl);
                $(options.leftCtrlClass).bind("click",setAni.leftCtrl);
                thisObj.data("isTimer",1);
            }else{
                thisObj.data("vIndex",0);
                thisObj.data("moveRotate")(0);
            }
            return $(this);
        }
    });
})(jQuery);
