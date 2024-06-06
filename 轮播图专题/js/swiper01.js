// 匿名函数不能这么用了????function还必须要有函数名??????????
// function(){
// 	console.log(111)
// }();

function peiceInOutSwiper(imgArr, containerSelector, preConSelector, nextConSelector) {
	//传入轮播图数组，轮播图容器，切换图片控件(上下张切换)

	// 轮播图数组
	let picArr = imgArr,
		picLen = picArr.length;

	// 1.创建轮播图容器
	let $box = $(containerSelector);

	$box.css({
		"position": "relative"
	});

	for (let i = 0; i < picLen; i++) {
		let $el = $("<div class='container'></div>");
		$el.css({
			"position": "absolute",
			"width": "100%",
			"height": "100%",
			"zIndex": 60 - i,
		})
		$box.append($el);
	}


	// 2.图片分块
	let $container = $box.find(".container"),
		totalWidth = $container.width(), //容器的高度
		totalHeight = $container.height(),
		xNum = 10,
		yNum = 8,
		picWidth = Math.round(totalWidth / xNum),
		picHeight = Math.round(totalHeight / yNum);



	for (let k = 0; k < picLen; k++) { //第k张图片

		for (let i = 0; i < xNum; i++) { //分块
			for (let j = 0; j < yNum; j++) {
				let $el = $("<span></span>");
				$el.css({
					"width": picWidth,
					"height": picHeight,
					"background": "url('" + picArr[k] + "')",
					"backgroundSize": totalWidth + "px",
					"backgroundPosition": "-" + i * picWidth + "px -" + j * picHeight + "px",
					"left": i * picWidth + "px",
					"top": j * picHeight + "px",
					"transitionDelay": i / 10 + j / 10 + "s"
				});
				$($container[k]).append($el);

			}
		}
	}

	// 3.播放控制
	let $pre = $(preConSelector), //上一张 控件
		$next = $(nextConSelector); //下一张 控件

	let currentIdx = 0;

	// 3.1自动轮播(定时器)
	let play = setInterval(autoPlay, 3500);
	let pause = null;
	// 3.2手动切换
	$($container[0]).toggleClass("on"); //显示初始化

	$pre.on("click", prePic);
	$next.on("click", nextPic);


	// 上一张切换逻辑
	let preTime = new Date().getTime();
	let passTime = 0;

	function prePic() {
		passTime = new Date().getTime() - preTime;

		clearInterval(play); //清除定时器
		clearTimeout(pause);
		play = null;
		pause = null;

		$($container[currentIdx]).toggleClass("on");
		if (currentIdx > 0) {
			currentIdx -= 1;
		} else {
			currentIdx = picLen - 1;
		}
		$($container[currentIdx]).toggleClass("on");

		preTime = new Date().getTime();
		if (preTime < 500) return; //连续点击不执行setTimeout，

		// 点击过后超过一秒没动作继续轮播
		pause = setTimeout(function() {
			play = setInterval(autoPlay, 3500);
		}, 1000)
	}
	// 下一张切换逻辑
	function nextPic() {
		passTime = new Date().getTime() - preTime;

		clearInterval(play); //清除定时器
		clearTimeout(pause);
		play = null;
		pause = null;

		$($container[currentIdx]).toggleClass("on");

		if (currentIdx < picLen - 1) {
			currentIdx += 1;
		} else {
			currentIdx = 0;
		}
		$($container[currentIdx]).toggleClass("on");


		preTime = new Date().getTime();
		if (preTime < 500) return; //连续点击不执行setTimeout，

		// 点击过后超过一秒没动作继续轮播
		pause = setTimeout(function() {
			play = setInterval(autoPlay, 3500);
		}, 1000)

	}

	// 自动播放逻辑
	function autoPlay() {
		$($container[currentIdx]).toggleClass("on");

		if (currentIdx < picLen - 1) {
			currentIdx += 1;
		} else {
			currentIdx = 0;
		}
		$($container[currentIdx]).toggleClass("on");
	}
}
