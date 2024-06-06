function shiftmodule(titleSelector, contentSelector) {
	// titleSelector是模块中所有的分类的jquery选择器
	// contentSelector是模块中所有的分类的内容的jquery选择器
	

	var idx = 0; //用于记录当前标题的序号，默认0
	// 初始化显示
	$(titleSelector[idx]).css({
		"color": "#f00"
	});
	$(contentSelector[idx]).css({
		"display": "block"
	});
	// 监听鼠标移入/移出事件
	titleSelector.on("mouseenter", function() {

		idx = $(this).index(); //更新序号

		$(titleSelector[idx]).css({ //标题样式改变
			"color": "#f00"
		}).siblings("h1").css({
			"color": "#000"
		});

		$(contentSelector[idx]).css({ //内容切换
			"display": "block"
		}).siblings("ul").css({
			"display": "none"
		})
	})
}
