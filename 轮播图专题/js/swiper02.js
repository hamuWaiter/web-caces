function swiperRotate_3D(imgArr, boxSelector, preController, nextController, mod) {
	// 1.imgArr为轮播图数组
	// 2.boxSelector为所有图片的父盒子选择器
	// 3.preController,nextController是切换图片控件
	// 4.mod是轮播模式，0水平轮播，其他值垂直轮播

	// 注意！！！！！
	// picBox必须有transform-style：preserve-3d、定位属性
	// picBox的父盒子要有perspective：1200px；属性
	let picArr = imgArr || [];

	let $picBox = $(boxSelector);

	let mode = mod; //轮播图方向，0为水平切换，其他为垂直切换

	// 与布局以及转动方向的设置。。。。
	let direction = mode ? "rotateX(" : "rotateY(";
	let disCenter = mode ? "translateZ(200px)" : "translateZ(300px)";
	let staticStyle_1 = "deg) " + disCenter;
	let staticStyle_2 = "deg)";

	// 1.插入图片
	for (let i = 0; i < 4; i++) {
		let $el = $("<li></li>");
		$el.css({
			"background": "url(" + picArr[i] + ")",
			"backgroundSize": "cover",
			"transform": direction + i * 90 + staticStyle_1
		})
		$picBox.append($el);
	}

	let currentIdx = 1,
		isMoving = false,
		$pre = $(preController), //控件
		$next = $(nextController);

	rotate(currentIdx * 90); //初始化显示

	// 2.自动轮播
	let paly = null,
		pause = null;

	play = setInterval(autoPlay, 3000);
	// 3.手动切换

	$pre.on("click", function() {
		if (isMoving) return; //若切换未完成click无效
		isMoving = true; //第一次点击时将状态改为正在切换

		// 清空所有定时器
		clearInterval(play);
		clearTimeout(pause);
		play = null;
		pause = null;

		// 序号减
		currentIdx -= 1;
		rotate(currentIdx * 90);

		// 超过一秒无动作重启定时器
		pause = setTimeout(() => {
			play = setInterval(autoPlay, 3000);
		}, 1000)
	})
	$next.on("click", function() {
		if (isMoving) return;
		isMoving = true;

		clearInterval(play);
		clearTimeout(pause);
		play = null;
		pause = null;

		currentIdx += 1;
		rotate(currentIdx * 90);

		pause = setTimeout(() => {
			play = setInterval(autoPlay, 3000);
		}, 1000)
	})

	// 4.监听过度结束
	$picBox.on("transitionend", () => {
		isMoving = false;
		if (currentIdx == 4) {
			$picBox.css({ //
				"transition": "none",
				//direction定义为direction = mode ? "rotateX" : "rotateY(";
				"transform": direction + "0deg)"
			});
			currentIdx = 0;
		} else if (currentIdx == 0) {
			$picBox.css({ //
				"transition": "none",
				"transform": direction + "360deg)"
			});
			currentIdx = 4;
		}
	})
	// 样式设置函数
	function rotate(deg) {
		$picBox.css({ //初始化显示
			"transition": "all 1s ease-in-out",
			// 样式拼接
			"transform": direction + deg + staticStyle_2 //staticStyle_2是之前定义的样式字符串，
		})
	}

	function autoPlay() {
		currentIdx += 1;
		rotate(currentIdx * 90);
	}
}
