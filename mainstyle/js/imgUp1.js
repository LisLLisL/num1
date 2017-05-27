$(function(){
	var delParent;
	var defaults = {
		fileType         : ["jpg","png","bmp","jpeg"],   // 上传文件的类型
		fileSize         : 1024 * 1024 * 10                  // 上传文件的大小 10M
	};
		/*点击图片的文本框*/
		var num=0;
		var resultid;
		var file_num


		var arr_base=[]  
		var alen;

	$(".file").change(function(){
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

		var s=$(".file").val(); 
		
            if(s!=''){
               	lrz(this.files[0], {width: 640})
                .then(function (rst) {

                    // console.log(rst.base64);
                    arr_base.push(rst.base64);
                    console.log(arr_base);
                });
            }    
	
	$('.pager_btn').click(function(){
		var imgObjects=$(".up-img");
		for(var i=0;i<imgObjects.length;i++){
			console.log(arr_base[i]);
			$(".up-section textarea")[i].innerHTML=arr_base[i];
		   
		}
	})
})
