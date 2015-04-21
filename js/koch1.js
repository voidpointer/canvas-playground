var Koch1App = {
	recursionCount: 6,
	initControls: function(el) {
		el.html("# of Recursions:" +
			"<div id='recursionCountSlider' class='slider'></div>");

		$('#recursionCountSlider').slider({
			value: this.recursionCount,
			min: 1,
			max: 6,
			slide: function(event, ui) {
				Koch1App.recursionCount = ui.value;
				Koch1App.render();
			}
		});		
	},
	render: function() {
		this.canvas = document.getElementById('pgCanvas');
		this.context = this.canvas.getContext('2d');

		Playground.clearCanvas();

		sideLength = this.canvas.width * 0.8;

		x = (this.canvas.width - sideLength) / 2;
		y = this.canvas.height * 0.27;

		Turtle.reset();
		Turtle.begin(this.canvas);
		Turtle.moveTo(x, y);
		this.kochLine(sideLength, this.recursionCount);
		Turtle.right(120);
		this.kochLine(sideLength, this.recursionCount);
		Turtle.right(120);
		this.kochLine(sideLength, this.recursionCount);
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
	}
};

Playground.addModule({
	name: 'Koch',
	slug: 'koch1',
	obj: Koch1App,
	source: ['js/koch1.js', 'js/turtle.js']
});
