var Sierpinski1App = {
	recursionCount: 9,
	initControls: function(el) {
		el.html("# of Recursions:" +
			"<div id='recursionCountSlider2' class='slider'></div>");

		$('#recursionCountSlider2').slider({
			value: this.recursionCount,
			min: 1,
			max: 9,
			slide: function(event, ui) {
				Sierpinski1App.recursionCount = ui.value;
				Sierpinski1App.render();
			}
		});		
	},
	render: function() {
		this.canvas = document.getElementById('pgCanvas');
		this.context = this.canvas.getContext('2d');

		Playground.clearCanvas();

		// starting points of outer triangle
		var p1 = {
			x: this.canvas.width / 2,
			y: this.canvas.height * 0.05
		}, p2 = {
			x: this.canvas.width * 0.95,
			y: this.canvas.height * 0.95
		}, p3 = { 
			x: this.canvas.width * 0.05,
			y: this.canvas.height * 0.95
		};

		this.renderTriangle(p1, p2, p3, this.recursionCount);
	},
	renderTriangle: function(p1, p2, p3, level) {
		level = level - 1;

		if (level) {
			// calculate midpoints
			var mp1 = {
				x: (p1.x + p2.x) / 2,
				y: (p1.y + p2.y) / 2
			}, mp2 = {
				x: (p2.x + p3.x) / 2,
				y: (p2.y + p3.y) / 2
			}, mp3 = {
				x: (p3.x + p1.x) / 2,
				y: (p3.y + p1.y) / 2
			};

			// this is how the points and midpoints are arranged:
			//
			// .......p1........
			// .................
			// ....mp3...mp1....
			// .................
			// ..p3...mp2...p2..

			this.renderTriangle(p1, mp1, mp3, level);
			this.renderTriangle(mp1, p2, mp2, level);
			this.renderTriangle(mp3, mp2, p3, level);
		} else {
			this.context.beginPath();
			this.context.moveTo(p1.x, p1.y);
			this.context.lineTo(p2.x, p2.y);
			this.context.lineTo(p3.x, p3.y);
			this.context.lineTo(p1.x, p1.y);
			this.context.stroke();
		}
	}
};

Playground.addModule({
	name: 'Sierpinski',
	slug: 'sierpinski1',
	obj: Sierpinski1App,
	source: ['js/sierpinski1.js']
});
