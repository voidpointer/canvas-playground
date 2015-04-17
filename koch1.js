var Koch1App = {
	initControls: function(el) {
		el.html("");
	},
	render: function() {
		this.canvas = document.getElementById('myCanvas');
		this.context = this.canvas.getContext('2d');

		this.clearCanvas();

		sideLength = this.canvas.width * 0.8;

		x = (this.canvas.width - sideLength) / 2;
		y = this.canvas.height * 0.27;

		Turtle.reset();
		Turtle.begin(this.canvas);
		Turtle.moveTo(x, y);
		this.kochLine(sideLength, 6);
		Turtle.right(120);
		this.kochLine(sideLength, 6);
		Turtle.right(120);
		this.kochLine(sideLength, 6);
		Turtle.end();
	},
	kochLine: function(distance, level) {
		distance /= 3.0;
		level = level - 1;

		level ? this.kochLine(distance, level) : Turtle.forward(distance);
		Turtle.left(60);
		level ? this.kochLine(distance, level) : Turtle.forward(distance);
		Turtle.right(120);
		level ? this.kochLine(distance, level) : Turtle.forward(distance);
		Turtle.left(60);
		level ? this.kochLine(distance, level) : Turtle.forward(distance);
	},
	clearCanvas: function() {
		this.context.beginPath();
		this.context.rect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillStyle = 'white';
		this.context.fill();
	}
};

Modules.addModule({
	name: 'Koch',
	slug: 'koch1',
	obj: Koch1App
});
