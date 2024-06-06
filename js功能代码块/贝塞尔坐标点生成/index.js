/**
 * @desc 贝塞尔曲线算法，包含了3阶贝塞尔
 */
class Bezier {
	/**
	 * @desc 获取点，这里可以设置点的个数
	 * @param {number} num 点个数
	 * @param {Array} p1 点坐标
	 * @param {Array} p2 点坐标
	 * @param {Array} p3 点坐标
	 * @param {Array} p4 点坐标
	 * 如果参数是 num, p1, p2 为一阶贝塞尔
	 * 如果参数是 num, p1, c1, p2 为二阶贝塞尔
	 * 如果参数是 num, p1, c1, c2, p2 为三阶贝塞尔
	 */
	getBezierPoints(num = 100, p1, p2, p3, p4) {
		let func = null;
		const points = [];
		if (!p3 && !p4) {
			func = this.oneBezier;
		} else if (p3 && !p4) {
			func = this.twoBezier;
		} else if (p3 && p4) {
			func = this.threeBezier;
		}
		for (let i = 0; i < num; i++) {
			points.push(func(i / num, p1, p2, p3, p4));
		}
		if (p4) {
			points.push([...p4]);
		} else if (p3) {
			points.push([...p3]);
		}
		return points;
	}

	/**
	 * @desc 一阶贝塞尔
	 * @param {number} t 当前百分比
	 * @param {Array} p1 起点坐标
	 * @param {Array} p2 终点坐标
	 */
	oneBezier(t, p1, p2) {
		const [x1, y1] = p1;
		const [x2, y2] = p2;
		let x = x1 + (x2 - x1) * t;
		let y = y1 + (y2 - y1) * t;
		return [x, y];
	}

	/**
	 * @desc 二阶贝塞尔
	 * @param {number} t 当前百分比
	 * @param {Array} p1 起点坐标
	 * @param {Array} p2 终点坐标
	 * @param {Array} cp 控制点
	 */
	twoBezier(t, p1, cp, p2) {
		const [x1, y1] = p1;
		const [cx, cy] = cp;
		const [x2, y2] = p2;
		let x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
		let y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
		return [x, y];
	}

	/**
	 * @desc 三阶贝塞尔
	 * @param {number} t 当前百分比
	 * @param {Array} p1 起点坐标
	 * @param {Array} p2 终点坐标
	 * @param {Array} cp1 控制点1
	 * @param {Array} cp2 控制点2
	 */
	threeBezier(t, p1, cp1, cp2, p2) {
		const [x1, y1] = p1;
		const [x2, y2] = p2;
		const [cx1, cy1] = cp1;
		const [cx2, cy2] = cp2;
		let x =
			x1 * (1 - t) * (1 - t) * (1 - t) +
			3 * cx1 * t * (1 - t) * (1 - t) +
			3 * cx2 * t * t * (1 - t) +
			x2 * t * t * t;
		let y =
			y1 * (1 - t) * (1 - t) * (1 - t) +
			3 * cy1 * t * (1 - t) * (1 - t) +
			3 * cy2 * t * t * (1 - t) +
			y2 * t * t * t;
		return [x, y];
	}
}
let shtml = '';

function getPoints(num, start, end, controll) {
	let bezier = new Bezier();
	const dotNumber = num;
	// 贝塞尔起点 ，如：[0, 0]
	const p1 = start;
	// 贝塞尔终点，如： [600, 200]
	const p2 = end;
	// 控制开口【x,y】，x控制顶点水平位置，y控制数值位置
	// const c1 = [700, 0];
	const c1 = controll;
	// 二阶贝塞尔
	let tem = [];
	return bezierPoints = bezier.getBezierPoints(dotNumber, p1, c1, p2).map(d => {
		tem = d.map(e => parseInt(e, 10));
		shtml += `<span style="left: ${tem[0]}px; top: ${tem[1]}px;" class="dot">${tem.join(',')}</span>`;
		return tem;
	});
	return bezierPoints;
}
// console.log(getPoints(30,[0, 0],[1000, 100]));
// $(function() {
// 	getPoints(30, [0, 100], [600, 400], [700, 100]);
// 	$('#twoBezier').html(shtml);
// });

let bezier = new Bezier();
$(function() {
    const p1 = [0, 0];
    const p2 = [1000, 600];
    const c1 = [1000, 0];
    const c2 = [0, 600];

    // 一阶贝塞尔
    const dotNumber = 50;
    let shtml = '';
    bezier.getBezierPoints(dotNumber, p1, p2).forEach(d => {
        d = d.map(e => parseInt(e, 10));
        shtml += `<span style="left: ${d[0]}px; top: ${d[1]}px;" class="dot">${d.join(',')}</span>`;
    });
    $('#oneBezier').html(shtml);

    shtml = '';
    bezier.getBezierPoints(dotNumber, p1, c1, p2).forEach(d => {
        d = d.map(e => parseInt(e, 10));
        shtml += `<span style="left: ${d[0]}px; top: ${d[1]}px;" class="dot">${d.join(',')}</span>`;
    });
    $('#twoBezier').html(shtml);

    shtml = '';
    bezier.getBezierPoints(dotNumber, p1, c1, c2, p2).forEach(d => {
        d = d.map(e => parseInt(e, 10));
        shtml += `<span style="left: ${d[0]}px; top: ${d[1]}px;" class="dot">${d.join(',')}</span>`;
    });
    $('#threeBezier').html(shtml);
});