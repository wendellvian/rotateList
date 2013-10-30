$(function(){
    var oRotate = $(".rotate");
    var oCtrlBo = $(".ctrlBo a");
    var oCtrlPo = $(".ctrlPo");
    var oLeftCtrl = $(".leftCtrl");
    var oRightCtrl = $(".rightCtrl");
    var oRotateUl = $(".rotate").find("ul").eq(0);
    var oRotateLi = oRotateUl.find("li");
    var vIndex = 0;
    var leng = oRotateLi.length;
    var timer = null;


    oRotateUl.css("width",oCtrlBo.length * oRotateLi.width());

    function slideAni(){
        $(this).addClass("on").siblings("a").removeClass("on");
        oRotateUl.stop().animate({
            left:-oRotateLi.width() * $(this).index()
        },"slow");
    }
    function setAni(){
        if(vIndex == oCtrlBo.length - 1){
            vIndex = 0;
        }else{
            vIndex++;
        }
        oCtrlBo.eq(vIndex).addClass("on").siblings("a").removeClass("on");
        oRotateUl.stop().animate({
            left:-oRotateLi.width() * vIndex
        },"slow");
    }
    function mOver(){
        clearInterval(timer);
        oCtrlPo.show();
    }
    function mOut(){
        timer = setInterval(setAni,3000);
        oCtrlPo.hide();
    }

    oCtrlBo.bind("click", slideAni);
    timer = setInterval(setAni,3000);
    oRotate.bind("mouseover",mOver);
    oRotate.bind("mouseout",mOut);

    oRightCtrl.click(function(){
    	oRotateUl.stop().animate({left:"-="+oRotateLi.width()},"slow");
    	vIndex++;
    	oCtrlBo.eq(vIndex).addClass("on").siblings("a").removeClass("on");
    	if(vIndex>leng-1){
    		oRotateUl.stop().animate({left:0},"slow");
    		vIndex = 0;
    		oCtrlBo.eq(vIndex).addClass("on").siblings("a").removeClass("on");
    	}
    });
    oLeftCtrl.click(function(){
    	oRotateUl.stop().animate({left:"+="+oRotateLi.width()},"slow");
    	vIndex--;
    	oCtrlBo.eq(vIndex).addClass("on").siblings("a").removeClass("on");
    	if(vIndex<0){
    		vIndex = leng - 1;
    		oRotateUl.stop().animate({left:oRotateLi.width() * -vIndex},"slow");
    		oCtrlBo.eq(vIndex).addClass("on").siblings("a").removeClass("on");
    	}
    });
});