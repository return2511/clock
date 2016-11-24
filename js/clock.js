;
void

function() {
	var dom = document.getElementById("J_clock");
	var ctx = dom.getContext("2d");
	var height = ctx.canvas.height;
	var width = ctx.canvas.width;
	var r = width / 2;

	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	var rem = width / 300;

	var drawBackground = function() {
		ctx.save();
		ctx.translate(r, r);
		ctx.beginPath();
		ctx.arc(0, 0, r - 5 *rem, 0, 2 * Math.PI, false);
		ctx.lineWidth = 10 * rem;
		ctx.stroke();
		drawHourNum();
		drawMinterNum();
	}
	var drawHourNum = function() {
		var hour = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
		ctx.font = 22 * rem + "px Arial";
		hour.forEach(function(num, i) {
			var rad = 2 * Math.PI / 12 * i;
			var x = Math.cos(rad) * (r - 35 * rem);
			var y = Math.sin(rad) * (r - 35 * rem);
			ctx.fillText(num, x, y);
		})
	}
	var drawMinterNum = function() {
		for (var i = 0; i <= 60; i++) {
			var rad = 2 * Math.PI / 60 * i;
			var x = Math.cos(rad) * (r - 18 * rem);
			var y = Math.sin(rad) * (r - 18 * rem);
			ctx.beginPath();
			if (i % 5 === 0) {
				ctx.fillStyle = "#000";
				ctx.arc(x, y, 3 * rem, 0, 2 * Math.PI, false);
			} else {
				ctx.fillStyle = "#ccc";
				ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
			}
			ctx.fill();
		}
	}

	var drawTime = function(str) {
		ctx.save();
		ctx.beginPath();
		ctx.font = 12 * rem + "px Arial";
		var x = 0 ;
		var y = r - 55 *rem ;
		ctx.fillText(str, x, y);
		ctx.restore();
	}


	var drawClockNeedle = function(hour, min, sec) {
		drawHour(hour, min);
		drawMinter(min);
		drawSec(sec);
		drawDot();
	}

	var drawHour = function(hour, min) {
		ctx.save();
		ctx.beginPath();
		var rad = 2 * Math.PI / 12 * hour;
		var minrad = 2 * Math.PI / 12 / 60 * min;
		ctx.rotate(rad + minrad);
		ctx.lineCap = "round";
		ctx.lineWidth = 6 *rem;
		ctx.moveTo(0, 10 *rem);
		ctx.lineTo(0, -r / 2);
		ctx.stroke();
		ctx.restore();
	}

	var drawMinter = function(min ) {
		ctx.save();
		ctx.beginPath();
		var rad = 2 * Math.PI / 60 * min;
		ctx.rotate(rad );
		ctx.lineCap = "round";
		ctx.lineWidth = 4 *rem;
		ctx.moveTo(0, 10 *rem);
		ctx.lineTo(0, -r + 40 *rem);
		ctx.stroke();
		ctx.restore();
	}

	var drawSec = function(sec) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = "#F92672"
		var rad = 2 * Math.PI / 60 * sec;
		ctx.rotate(rad);
		ctx.lineWidth = 2*rem;
		ctx.moveTo(-2*rem, 20*rem);
		ctx.lineTo(2*rem, 20*rem);
		ctx.lineTo(1*rem, -r + 20*rem);
		ctx.lineTo(-1*rem, -r + 20*rem);
		ctx.fill();
		ctx.restore();
	}

	var drawDot = function() {
		ctx.beginPath();
		ctx.fillStyle = "#fff";
		ctx.arc(0, 0, 4 * rem, 0, 2 * Math.PI, false);
		ctx.fill();
	}

	window.setInterval(function() {
		ctx.clearRect(0, 0, width, height);
		var now = new Date();
		var month = now.getMonth();
		var day = now.getDate();
		var week = now.getDay();
		var hour = now.getHours();
		var min = now.getMinutes();
		var sec = now.getSeconds();
		var str = hour >= 12 ? "PM" : "AM" ;

		drawBackground();
		drawTime(str);
		drawClockNeedle(hour, min, sec);
		ctx.restore();
	}, 1000);

}.call(this);