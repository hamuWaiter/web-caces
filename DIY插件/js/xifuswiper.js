// 拖拽吸附插件
// 注意:在使用之前先引入jquery插件
function xifuswiper(boxSelector,dragSelector,mode){
	// boxSelector是盒子的jquery选择器
	// dragSelector是拖拽物的jquery选择器
	// mode是拖拽模式:
		// 1为水平拖拽
		// 2为竖直拖拽且竖直方向限定在盒子范围内
		// 3为任意方式拖拽且竖直方向限定在盒子范围内
	
	
	var max_X = dragSelector.width() - boxSelector.width(),// 边界条件
		max_Y = boxSelector.height() - dragSelector.height(),
		// 用于记录每次拖拽的起始位置
		origin_X = 0,
		origin_Y = 0,
		// 用于记录每一次拖拽过程中鼠标移动的距离
		changed_X = 0,
		changed_Y = 0;

	console.log(max_Y)
	dragSelector.on("mousedown", function(e) {

		// 鼠标按下的位置
		var old_X = e.clientX,
			old_Y = e.clientY,
			// 用于存储拖拽过程中原书的实际偏移量
			position_X = 0,
			position_Y = 0;


		dragSelector.on("mousemove", function(e) {
			changed_X = e.clientX - old_X;
			changed_Y = e.clientY - old_Y;

			position_X = changed_X + origin_X;
			position_Y = changed_Y + origin_Y;
			
			switch(mode){
				case 1:{
					position_Y = 0;
				}break;
				case 2:{
					position_X = 0;
					if (position_Y < 0) {
						position_Y = 0;
					} else if (position_Y > max_Y) {
						position_Y = max_Y;
					}
				}break;
				default:{
					if (position_Y < 0) {
						position_Y = 0;
					} else if (position_Y > max_Y) {
						position_Y = max_Y;
					}
				}
			}


			dragSelector.css({
				"top": position_Y + "px",
				"left": position_X + "px"
			})
		})
		dragSelector.on("mouseup", function(e) {


			if (position_X > 0) {
				position_X = 0; //水平偏移设为最左边
				dragSelector.animate({
					"top": position_Y + "px",
					"left": position_X + "px"
				}, 400)
			} else if (Math.abs(position_X) > max_X) {
				position_X = -max_X; //水平偏移设为最右边
				dragSelector.animate({
					"top": position_Y + "px",
					"left": position_X + "px"
				}, 400)
			}

			origin_X = position_X;
			origin_Y = position_Y;
			dragSelector.off("mousemove");
		})

		dragSelector.on("mouseleave", function() {
			origin_X = position_X;
			origin_Y = position_Y;
			dragSelector.off("mousemove");
		})
	})
	
}