var max = 20;//正文最小字体
var min = 12;//正文最大字体

var myScroll;
$(window).ready(function(){
    var height=$(".caption").outerHeight();
    var y;
    myScroll = new iScroll('main',{
        onScrollStart: function(){y = this.y;},
        onScrollEnd: function(){
            if(this.y < y){
                hideOperate();
            }else if(this.y > y){
                showOperate();
            }
            if(Math.abs(this.y) > height){
                $("#toTop").show("slow");
            }else{
                $("#toTop").hide("slow");
            }
        }
    });
});
$(".content img").load(function(){
    myScroll.refresh();
});
//左滑动监听
$(window).on("swipeleft",function(){next()});
//右滑动监听
$(window).on("swiperight",function(){prev()});

var isOperate = true;
//显示分享模块
function showShare(){
    if(!isShare){
        if(isOperate){
            hideOperate();
            isOperate = false;
        }
        $("#share").show("slow");
        $("#share").animate({bottom:0},"slow",function(){});
        $("#mask").show("slow");
        isShare = true;
    }
}

var isShare = false;
//隐藏操作模块
function hideOperate(){
    if(isOperate){
        $("#operate").animate({bottom:"-100px"},"slow",function(){});
        $("#operate").hide("slow");
        isOperate = false;
    }
}
//显示操作模块
function showOperate(){
    if(!isOperate){
        $("#operate").show("slow");
        $("#operate").animate({bottom:0},"slow",function(){});
        isOperate = true;
        $("#toTop").hide("slow");
    }
};

//蒙版监听
$("#mask").on("touchend",function(){
    $("#share").css("bottom","-100px");
    $("#share").hide("slow");
    $("#mask").hide("slow");
    isShare = false;
});

//字体加大
function fontLarger(){
    var $element = $(".content")
	var $element2 = $(".content p")
    var size = parseInt($element.css("font-size"));
    if(max > size){
        $element.css("font-size",(size+2)+"px");
		$element2.css("font-size",(size+2)+"px");
		myScroll.refresh();
		$("#operate li:eq(2) a").css("background-color","#D9383D");
    }else{
        $("#operate li:eq(1) a").css("background-color","#DDD");
        $("#operate li:eq(2) a").css("background-color","#D9383D");
    }
};
//字体见效小
function fontSmaller(){
    var $element = $(".content");
	var $element2 = $(".content p")
    var size = parseInt($element.css("font-size"));
    if(size > min ){
        $element.css("font-size",(size-2)+"px");
		$element2.css("font-size",(size-2)+"px");
		myScroll.refresh();
		$("#operate li:eq(1) a").css("background-color","#D9383D");		
    }else{
        $("#operate li:eq(2) a").css("background-color","#DDD");
        $("#operate li:eq(1) a").css("background-color","#D9383D");
    }	
};

//检查链接是否有效
function checkUrl(url){
    isUseful = false;
    $.ajax({   
		url:url, 
		type: 'GET',   
		async: false,
		success: function(xml){
            isUseful = true;
		}
	});
    return isUseful
}

//点击后返回到顶部
$("#toTop").on("touchend",function () {
    myScroll.scrollToElement(".caption",500);
    $("#toTop").hide("slow");
    return false;
});

//返回版面
function backPage(){
	var url = location.href;
	var re = /content_(\d+)_(\d+)\.htm/;
	var r = url.match(re);
	if (r) {
		location.href = "node_" + r[1] + ".php"
	}else{
		location.href = "node_9.htm"
	} 
};

//去下一页
function next(){
    var url = location.href;
    var re = /content_(\d+)_(\d+)\.htm/;
    var r = url.match(re);
    var url = "content_" + r[1] + "_" + (parseInt(r[2]) + 1) + ".htm";
    var isUseful = checkUrl(url);
    if(isUseful){
        location.href = url;
    }
}
//去上一页
function prev(){
    var url = location.href;
    var re = /content_(\d+)_(\d+)\.htm/;
    var r = url.match(re);
    var url = "content_" + r[1] + "_" + (parseInt(r[2]) - 1) + ".htm";
    var isUseful = checkUrl(url);
    if(isUseful){ 
        location.href = url;
    }
}

//setColor(0);//0 红色 1 蓝色 2 绿色 3 渐变红色
//设置顶部颜色
/* function setColor(c){
    if(c==0){
        $("header").addClass("red")
    }else if(c==1){
        $("header").addClass("blue")
    }else if(c==2){
        $("header").addClass("green")
    }else if(c==3){
        $("header").addClass("change-red")
    }
} */