function divSwiper(adreessArr, banner, btn_left, btn_right, num, speed) {
					// 注意banner为jquery选择器，另外轮播图容器必须是相对定位的

					// adreessArr为所有背景图片地址的数组
					// banner是轮播图的容器（ul）
					// num为每一张图片进行碎片轮播时的碎片个数
					// speed为每个碎片的延时,越小播放越快，默认为0.1s
					var move_speed = speed || 0.1;
					/////////////////1. 根据图片个数生成图片列表的li。
					adreessArr.forEach(function() {
						var el = $("<li></li>").css({
							"position": "absolute",
							"top": "0px",
							"left": "0px",
							"width": "100%",
							"height": "100%"
						});
						banner.append(el);
					})

					var $img = banner.find("li");
					var len = $img.length;
					var boxWidth = banner.width(); //banner宽度

					// 生成num个图片碎片盒子，宽度是一整张图片（1200px）的1/num
					for (var i = 0; i < len; i++) {
						// num表示将一整张图片分成10小块
						var address = adreessArr[i];

						for (var j = 0; j < num; j++) {
							// 创建span并绑定好每一个span的样式
							var el = $("<span></span>").css({
								// "backgroundColor":"rgba(255,0,0,+"+j/10+")",
								"background": "url(" + address + ") -" + j * (boxWidth / num) + "px center no-repeat",
								"display": "block",
								"width": "0px",
								"height": "100%",
								"transition": "width .1s linear " + j * move_speed + "s",
								"position": "absolute",
								"top": "0px",
								"left": j * (boxWidth / num) + "px"
							});
							$($img[i]).append(el);
						}
					}
					//////////////2 初始化//////////////////////////////

					var idx = 0;
					var isMoving = false; //用于防止快速连续点击

					$($img[idx]).css({
						"zIndex": 10
					}).children("span").css({
						"width": (boxWidth / num) + "px"
					})
					//////////////3 自动轮播//////////////////////////////

					var timer = setInterval(function() {
						move(true)
					}, 2000); //每隔1s切换下一张图片


					function move(flag) { //切换函数。。。

						if (isMoving) return; //如果正在切换时点击就return
						isMoving = !isMoving; //表示图片正在切换中
						$($img[idx]).children("span").eq(num - 1).off("transitionend"); //移除上一张图片的transitionend事件监听函数

						// 隐藏上一张图片
						$($img[idx]).css({
							"zIndex": 0
						}).children("span").css({
							"width": 0 + "px"
						})
						if (flag) {
							// 序号加一（正向切换图片）
							if (idx < len - 1) {
								idx += 1;
							} else {
								idx = 0;
							}
						} else {
							// 序号减一（逆向切换图片）
							if (idx > 0) {
								idx -= 1;
							} else {
								idx = len - 1;
							}
						}
						// 下一张图片出现
						$($img[idx]).css({
							"zIndex": 10
						}).children("span").css({
							"width": (boxWidth / num) + "px"
						})

						// 监听最后一个图片碎块出现与否来判断图片是否完全出现
						$($img[idx]).children("span").eq(num - 1).on("transitionend", function() {
							isMoving = !isMoving;
						})
					}
					//////////////4 按钮控制上/下张//////////////////////////////

					btn_left.on("click", function() {
						clearInterval(timer);
						move(false);
						setTimeout(function() {
							timer = setInterval(function() {
								move(true)
							}, 2000); //每隔1s切换下一张图片
						}, 6000)
					})
					btn_right.on("click", function() {
						clearInterval(timer);
						move(true);
						setTimeout(function() {
							timer = setInterval(function() {
								move(true)
							}, 2000); //每隔1s切换下一张图片
						}, 6000)
					})


				}
