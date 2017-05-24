$(function(){
	var delParent;
	var defaults = {
		fileType         : ["jpg","png","bmp","jpeg"],   // 上传文件的类型
		fileSize         : 1024 * 1024 * 10                  // 上传文件的大小 10M
	};
		/*点击图片的文本框*/
		var num=0;
		var resultid;
		
	$(".file").change(function(){
		var s=document.getElementById('file').value; 
            if(s!=''){
               num=num+1;
            }	 
		var idFile = $(this).attr("id");
		var file = document.getElementById(idFile);
		var imgContainer = $(this).parents(".z_photo"); //存放图片的父亲元素
		var fileList = file.files; //获取的图片文件
		var input = $(this).parent();//文本框的父亲元素
		var imgArr = [];

		
		 
		var aid="file"+num;
		resultid="result"+num;
		var img_name="img"+num;

		//遍历得到的图片文件
		var numUp = imgContainer.find(".up-section").length;
		var totalNum = numUp + fileList.length;  //总的数量
		if(fileList.length > 3 || totalNum > 3 ){
			alert("上传图片数目不可以超过3个，请重新选择");  //一次选择上传超过5个 或者是已经上传和这次上传的到的总数也不可以超过5个
		}
		else if(numUp < 3){
			fileList = validateUp(fileList);
			for(var i = 0;i<fileList.length;i++){
			
			 var imgUrl = window.URL.createObjectURL(fileList[i]);
			     imgArr.push(imgUrl);
			 var $section = $("<section class='up-section fl loading'>");
			     imgContainer.prepend($section);
			 var $span = $("<span class='up-span'>");
			     $span.appendTo($section);
			
		     var $img0 = $("<img class='close-upimg'>").on("click",function(event){
				    event.preventDefault();
					event.stopPropagation();
					$(".works-mask").show();
					delParent = $(this).parent();
				});   
				$img0.attr("src","mainstyle/images/a7.png").appendTo($section);
		     var $img = $("<img class='up-img up-opcity'>");
		         $img.attr("src",imgArr[i]);
		         $img.appendTo($section);

		     var $textarea = $("<textarea name='img' style='display:none'>");
		     	 $textarea.attr("name",img_name);
		     	 $textarea.attr("id",resultid);	
		     	 $textarea.appendTo($section);

		     var $p = $("<p class='img-name-p'>");
		         $p.html(fileList[i].name).appendTo($section);
		     var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
		    	 $input.attr("id",aid);
		         $input.appendTo($section);
		     var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
		         $input2.appendTo($section);
		   }
		}

		setTimeout(function(){
             $(".up-section").removeClass("loading");
		 	 $(".up-img").removeClass("up-opcity");
		 },450);
		 numUp = imgContainer.find(".up-section").length;
		if(numUp >= 3){
			$(this).parent().hide();
		}
	});
	
	
   
    $(".z_photo").delegate(".close-upimg","click",function(){
     	  $(".works-mask").show();
     	  delParent = $(this).parent();
	});
		
	$(".wsdel-ok").click(function(){
		$(".works-mask").hide();

		if(delParent.index()==1){
			textarea_id=delParent.children('textarea').attr('id');
			prev=delParent.prev().children('textarea');
			prev.attr('id',textarea_id);
			prev.attr('name',img_name);
			num=num-1;
			delParent.parent().find(".z_file").show();
		}else if(delParent.index()==0){
			num=num-1;
			delParent.parent().find(".z_file").show();
		}else if(delParent.index()==2){
			my_id=delParent.children('textarea').attr('id');
			my_name=delParent.children('textarea').attr('name');
			prev_id=delParent.prev().children('textarea').attr('id');
			prev_my_name=delParent.prev().children('textarea').attr('name');
			prev_prev=delParent.prev().prev().children('textarea');
			prev_prev.attr('id',prev_id);
			prev_prev.attr('name',img_name);
			prev=delParent.prev().children('textarea');
			prev.attr('id',my_id);
			prev.attr('name',img_name);
			num=num-1;
			delParent.parent().find(".z_file").show();
		}

		// var numUp = delParent.siblings().length;
		// if(numUp < 3){
		// 	delParent.parent().find(".z_file").show();
		// }
		 delParent.remove();
	});
	
	$(".wsdel-no").click(function(){
		$(".works-mask").hide();
	});
		
		function validateUp(files){
			var arrFiles = [];//替换的文件数组
			for(var i = 0, file; file = files[i]; i++){
				//获取文件上传的后缀名
				var newStr = file.name.split("").reverse().join("");
				if(newStr.split(".")[0] != null){
						var type = newStr.split(".")[0].split("").reverse().join("");
						console.log(type+"===type===");
						if(jQuery.inArray(type, defaults.fileType) > -1){
							// 类型符合，可以上传
							if (file.size >= defaults.fileSize) {
								alert(file.size);
								alert('您这个"'+ file.name +'"文件大小过大');	
							} else {
								// 在这里需要判断当前所有文件中
								arrFiles.push(file);	
							}
						}else{
							alert('您这个"'+ file.name +'"上传类型不符合');	
						}
					}else{
						alert('您这个"'+ file.name +'"没有类型, 无法识别');	
					}
			}
			return arrFiles;
		}
		
	
	
})
