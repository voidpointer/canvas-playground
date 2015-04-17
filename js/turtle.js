var Turtle = {
	canvas: null,
	context: null,
	x: 0,
	y: 0,
	angle: 0,
	reset: function() {
		this.x = 0;
		this.y = 0;
		this.angle = 0;
	},
	begin: function(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.context.beginPath();
		this.context.lineWidth = 1;
		this.context.strokeStyle = 'black';
	},
	end: function() {
		this.context.stroke();
	},
	moveTo: function(x, y) {
		this.x = x;
		this.y = y;
		this.context.moveTo(this.x, this.y);
	},
	forward: function(distance) {
		this.x += Math.cos(this.angle) * distance;
		this.y -= Math.sin(this.angle) * distance;
		this.context.lineTo(this.x, this.y);
	},
	left: function(angle) {
		this.angle += angle * Math.PI / 180;
	},
	right: function(angle) {
		this.angle -= angle * Math.PI / 180;
	}
};