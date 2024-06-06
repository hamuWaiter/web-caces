function scrollTo(targetPosition,speed){
	
	//简介: 流畅的滚动插件,定时器的时间间隔采用系统的时间间隔(16.6ms),
	// 		所以人眼识别不到抖动现象,
	// 参数介绍:
	// 若不传参,默认向上滚动,若传参,则:
	// targetPosition表示滚动目标位置
	// speed表示滚动速度,越大越快,建议(20~100)较好,默认20 ....
	
	var speed = speed || 20;
	var targetPosition = targetPosition || 0;
	var currentPosition = $(window).scrollTop();
	// 滚动插件,速度可控
	
	var direction = currentPosition > targetPosition ? 0 : 1 ;//用于判断滚动方向
	
	
	var timer = setInterval(function(){
		if(direction){
			// 下滑
			if(currentPosition < targetPosition){
				
				currentPosition += speed;
				console.log(currentPosition);
				$(window).scrollTop(currentPosition);//更新位置
				
			}else{
				currentPosition = targetPosition;
				clearInterval(timer);//清除定时器
				timer = null;
			}
		}else{
			// 上滑
			if(currentPosition > targetPosition){
				
				currentPosition -= speed;
				console.log(currentPosition);
				$(window).scrollTop(currentPosition);//更新位置
				
			}else{
				currentPosition = targetPosition;
				clearInterval(timer);//清除定时器
				timer = null;
			}
		}
		
	},16.6); //开启定时器
}