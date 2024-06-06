let x = 0,
	y = 0,
	status = false;
// 实时生成贝塞尔起点(逆时针循环)
function getPositon(xMax, yMax, xStep, yStep) {
	// 水平方向最大值，垂直方向最大值，(屏幕宽高)
	// 水平方向步长，垂直方向步长，
	if (x < xMax && status) {
		x += xStep;
	} else {
		if (y < yMax && status) {
			y += yStep;
		} else {
			status = false;
		}
	}

	if (x > 0 && !status) {
		x -= xStep;
	} else {
		if (y > 0 && !status) {
			y -= yStep;
		} else {
			status = true;
		}
	}
	return [x, y];
}
