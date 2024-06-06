function slideUpDown(imgArr,boxSlector,pre,next,replay,peice){
	// 参数简介:
		// 1.imgArr为图片数组
		// 2.boxSelector是图片容器
		// 3.pre,next为左右控件,replay为重新播放
		// 4.peice是碎块个数,不传默认16块
	
	
	let $picBox = $(boxSlector),//所有图片的容器
		picWidth = $picBox.width(),
		picHeight = $picBox.height(),
		picArr = imgArr,
		picLen = picArr.length;
		
	// 1.生成图片容器
	for(let i = 0; i < picLen; i++) {
		let $el = $("<ul class='picitem'></ul>");
		$el.css({
			"width" : picWidth + "px",
			"height" : picHeight + "px",
			"position" : "absolute",
			"overflow" : "hidden",
		})
		$picBox.append($el);
	}
	
	// 2.图片分割
	
	let	$picItem = $(".picitem"),//所有的整张图片
		peiceNum = peice || 16,//图片分块
		peiceWidth = Math.round(picWidth/peiceNum);
	
	for(let k = 0; k < picLen; k++) {
		//1.1 插入图片分块到文档中并设置好样式
		for(let i = 0; i < peiceNum; i++) {
			let $el = $("<li></li>");
			$el.css({
				"width" : peiceWidth + "px",
				"height" : "100%",
				"background" : "url('"+picArr[k]+"')",
				"backgroundSize" : picWidth + "px",
				"backgroundRepeat" : "no-repeat",
				"backgroundPosition" : "-" + i*peiceWidth + "px",
				"position" : "absolute",
				"left" : i*peiceWidth + "px",
				"transition" : "all 2s ease-in-out"
			})
			$($picItem[k]).append($el);
		}
	}
	
	// 3.图片切换
	
	let currentIndex = 0;
	$($picItem[currentIndex]).toggleClass("on");//初始化像是
	
	let play = null;
		
	// 3.1自动切换
	play = setInterval(autoPlay,4000);
	
	function autoPlay(){
		$($picItem[currentIndex]).toggleClass("on");
		if(currentIndex < picLen - 1){
			currentIndex += 1;
		}else{
			currentIndex = 0;
		}
		$($picItem[currentIndex]).toggleClass("on");
	}
	
	// 3.2手动切换
	
	let $pre = $(pre),
		$next = $(next),
		$replay = $(replay);
	
	$replay.css({
		"display" : "none"
	})
	
	$pre.on("click",prePic);
	$next.on("click",nextPic);
	
	$replay.on("click",()=>{
		console.log(1)
		$replay.css({
			"display" : "none"
		})
		play = setInterval(autoPlay,4000);
	})
	
	function prePic(){
		$replay.css({
			"display" : "block"
		})
		// 3.2.1 清除定时器
		clearInterval(play);
		play = null;
		
		$($picItem[currentIndex]).toggleClass("on");
		
		if(currentIndex > 0){
			currentIndex -= 1;
		}else{
			currentIndex = picLen - 1;
		}
		
		$($picItem[currentIndex]).toggleClass("on");
		
		
	}
	function nextPic(){
		$replay.css({
			"display" : "block"
		})
		// 3.2.1 清除定时器
		clearInterval(play);
		play = null;
		
		$($picItem[currentIndex]).toggleClass("on");
		
		if(currentIndex < picLen - 1){
			currentIndex += 1;
		}else{
			currentIndex = 0;
		}
		
		$($picItem[currentIndex]).toggleClass("on");
		
	}
}