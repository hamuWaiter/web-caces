function drag(boxSelector,dragSlector,mode){
	
	// boxSelector是拖拽元素的父元素的jquery选择器
	// dragSlector是拖拽元素的jquery选择器
	// mode是拖拽模式:
		// 1是水平拖拽
		// 2是竖直拖拽
		// 其他是随意拖拽
	
	var mode = mode || 1,//默认水平拖动
		origin_X = 0,
		origin_Y = 0,  //最开始的位置
		lim_X = boxSelector.width() - dragSlector.width(),
		lim_Y = boxSelector.height() - dragSlector.height(),
		position_X = 0,
		position_Y = 0;//移动过程中的位置
	
	
	dragSlector.on("mousedown", function(e) {
	
		var old_X = e.clientX;
			old_Y = e.clientY,
			changed_X = 0,
			changed_Y = 0;
			
		dragSlector.on("mousemove", function(e) {
	
			changed_X = e.clientX - old_X;
			changed_Y = e.clientY - old_Y;
			
			switch(mode){  //拖动模式选项
				case 1:{
					// 只能水平拖动
					position_X = origin_X + changed_X;
					position_Y = 0;
				}break;
				case 2:{
					// 只能竖直拖动
					position_X = 0;
					position_Y = origin_Y + changed_Y;
				}break;
				default:{
					position_X = origin_X + changed_X;
					position_Y = origin_Y + changed_Y;
				}
			}
			
			if( position_X >= 0 && position_X <= lim_X){
				if(position_Y >= 0 && position_Y <= lim_Y){
					dragSlector.css({
						"top": position_Y + "px",
						"left": position_X + "px"
					})
				}else if(position_Y > lim_Y){
					dragSlector.css({
						"top": lim_Y + "px",
						"left": position_X + "px"
					})
				}else{
					dragSlector.css({
						"top": "0px",
						"left": position_X + "px"
					})
				}
			}
			
			if( position_X > lim_X ){
				if(position_Y >= 0 && position_Y <= lim_Y){
					dragSlector.css({
						"top": position_Y + "px",
						"left": lim_X + "px"
					})
				}
			}
			
			if( position_X < 0 ){
				if(position_Y >= 0 && position_Y <= lim_Y){
					dragSlector.css({
						"top": position_Y + "px",
						"left": "0px"
					})
				}
			}
	
	
		})
		dragSlector.on("mouseup",function(){
			
			
			//这是为什么？？？？？？？？？？？
			// 原生的就不用减后面的那一部分
			origin_X = position_X;
			origin_Y = position_Y;
			dragSlector.off("mousemove");
			
		})
	})
	dragSlector.on("mouseleave",function(){
		origin_X = position_X;
		origin_Y = position_Y;
		dragSlector.off("mousemove");
	})
}