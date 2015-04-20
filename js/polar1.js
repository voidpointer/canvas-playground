var Polar1App = {
	seed: 5,
	initControls: function(el) {
		el.html("");
	},
	render: function() {
		this.canvas = document.getElementById('pgCanvas');
		this.context = this.canvas.getContext('2d');

		Playground.clearCanvas();

		var numShapes = 10;
		var colors = this.generateColors2(numShapes);
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

	},
	generateColors2: function(count) {
		// pick two random points in color space
		do {
			var r1 = this.random(),
				g1 = this.random(),
				b1 = this.random(),
				r2 = this.random(),
				g2 = this.random(),
				b2 = this.random(),
				distance = Math.sqrt((r2-r1)*(r2-r1)+(g2-g1)*(g2-g1)+(b2-b1)*(b2-b1));
		} while(distance < 0.75);

		var colors = [];
		for(i = 0; i < count; i++) {
			// interpolate colors between points
			var r = (r2 - r1) * i / count + r1,
				g = (g2 - g1) * i / count + g1,
				b = (b2 - b1) * i / count + b1;

			// scale rgb up to 255
			r = Math.floor(r * 255);
			g = Math.floor(g * 255);
			b = Math.floor(b * 255);

			colors.push('rgb(' + r + ',' + g +',' + b + ')');
		}
		return colors;
	},
	random: function() {
		// From http://stackoverflow.com/questions/521295/javascript-random-seeds
		var x = Math.sin(this.seed++) * 10000;
		return x - Math.floor(x);
	}
};

Playground.addModule({
	name: 'Splat',
	slug: 'polar1',
	obj: Polar1App,
	source: ['js/polar1.js']
});
