/*
 * rotateList v1.0
 * Copyright (c) 2013 Wendell  http://blog.webql.info/
*/
(function($){
    $.fn.extend({
        rotateList:function(options){
            var defaults = {
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

            }
            var options = $.extend(defaults,options);
            var thisObj = $(this);

            var oRotate = thisObj;
            var oRotateUl = thisObj.find("ul").eq(0);
            var oRotateLi = oRotateUl.find("li");
            var leng = oRotateLi.length;
            var oCtrlBo = $("."+options.ctrlEleName).find(options.eleName);
            var oCtrlPo = $("."+options.ctrlEleNamePo);
            var vIndex = 0;
            var timer = null;

            switch(options.position){
                case "left":
                    oRotateUl.css("width",oCtrlBo.length * oRotateLi.width());
                break;
                case "top":
                    oRotateLi.css({float:"none",display:"block"});
                break;
                case "opacity":
                    oRotateLi.css({opacity:0,position:"absolute"});
                    oRotateLi.eq(vIndex).css({opacity:1});
                break;
            }
            
            function movePosition(obj){
                oCtrlBo.eq(obj).addClass(options.focus).siblings(options.focuSiblings).removeClass(options.focus);
                switch(options.position){
                    case "left":
                        oRotateUl.stop().animate({left:-oRotateLi.width() * obj},options.speed);
                    break;
                    case "top":
                        oRotateUl.stop().animate({top:-oRotateLi.height() * obj},options.speed);
                    break;
                    case "opacity":
                        oRotateLi.eq(obj).stop().animate({opacity:1},options.speed).siblings().animate({opacity:0},options.speed);
                    break;
                }
            }
            function rotateAni(){
                vIndex = $(this).index();
                movePosition(vIndex);
            }
            var setAni = {
                rightCtrl:function(){   // 单向右控制键
                    if(vIndex == oCtrlBo.length - 1){
                        vIndex = 0;
                    }else{
                        vIndex++;
                    }
                    movePosition(vIndex);
                },
                leftCtrl:function(){    // 单向左控制键
                    if(vIndex == 0){
                        vIndex = leng - 1;
                    }else{
                        vIndex--;
                    }
                    movePosition(vIndex);
                }
            }
            function mOver(){
                clearInterval(timer);
                oCtrlPo.show();
            }
            function mOut(){
                timer = setInterval(setAni.rightCtrl,options.aniTime);
                oCtrlPo.hide();
            }

            oCtrlBo.bind(options.mouseCtrl,rotateAni);
            timer = setInterval(setAni.rightCtrl,options.aniTime);
            oRotate.bind("mouseover",mOver);
            oRotate.bind("mouseout",mOut);
            $(options.rightCtrlClass).bind("click",setAni.rightCtrl);
            $(options.leftCtrlClass).bind("click",setAni.leftCtrl);


            return $(this);
        }
    });
})(jQuery);