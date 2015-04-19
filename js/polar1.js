var Polar1App = {
	initControls: function(el) {
		el.html("");
	},
	render: function() {
		this.canvas = document.getElementById('pgCanvas');
		this.context = this.canvas.getContext('2d');

		Playground.clearCanvas();

		var numShapes = 10;
		var colors = this.generateColors(numShapes);
		var colorIndex = 0;
		for(var i = numShapes; i > 0; i--) {
			var diff = (this.canvas.width / 2 * 1.6) / numShapes;
			this.renderShape(i * diff, diff * 0.9, colors[colorIndex++]);
		}
	},
	renderShape: function(outlineRadius, outlineScale, color) {
		this.context.beginPath();

		var coords = [];
		var degDiff = 30, totalDegrees = 3600;
		for(var i = 0; i < totalDegrees; i += degDiff) {
			var radians = i * Math.PI / 180;
			var radius = Math.sin(radians) * outlineScale + outlineRadius
			coord = {
				x: this.canvas.width / 2 + Math.cos(radians * 360 / totalDegrees) * radius, 
				y: this.canvas.height / 2 + Math.sin(radians * 360 / totalDegrees) * radius
			};
			coords.push(coord);
		}

		this.context.moveTo(coords[0].x, coords[0].y);
		for(var i = 1; i < coords.length; i+=3)
		{
			var i1 = i % coords.length;
			var i2 = (i + 1) % coords.length;
			var i3 = (i + 2) % coords.length;
			this.context.bezierCurveTo(
				coords[i1].x, coords[i1].y,
				coords[i2].x, coords[i2].y,
				coords[i3].x, coords[i3].y);
		}

		this.context.lineWidth = 3;
		this.context.fillStyle = color;
		this.context.stroke();
		this.context.fill();
	},
	generateColors: function(count) {
		var colors = [];
		for(var i = 0; i < count; i++) {
			x = 0.5 + Math.cos(i * Math.PI * 2 / count / 4) * 0.5;
			y = 0.5 + Math.sin(i * Math.PI * 2 / count / 4) * 0.5;
			r = Math.floor(x * 255);
			g = Math.floor(y * 255);
			b = 0;
			colors.push('rgb(' + r + ',' + g +',' + b + ')');
		}
		return colors;
	}
};

Playground.addModule({
	name: 'Splat',
	slug: 'polar1',
	obj: Polar1App,
	source: ['js/polar1.js']
});
