var Polar1App = {
	bumpCount: 8,
	amplitude: 8,
	rotation: 0,
	colorRandomSeed: 11,
	colorRand: new Random(),
	initControls: function(el) {
		el.html("# of Bumps:" +
			"<div id='bumpCountSlider' class='slider'></div>" +
			"Amplitude:" +
			"<div id='amplitudeSlider' class='slider'></div>" +
			"Rotation:" +
			"<div id='rotationSlider' class='slider'></div>" +
			"<button onclick='Polar1App.colorRandomSeed = Math.random();Polar1App.render()'>Random Color</button>");

		$('#bumpCountSlider').slider({
			value: this.bumpCount,
			min: 1,
			max: 20,
			slide: function(event, ui) {
				Polar1App.bumpCount = ui.value;
				Polar1App.render();
			}
		});

		$('#amplitudeSlider').slider({
			value: this.amplitude,
			min: 1,
			max: 10,
			slide: function(event, ui) {
				Polar1App.amplitude = ui.value;
				Polar1App.render();
			}
		});

		$('#rotationSlider').slider({
			value: this.rotation,
			min: 0,
			max: 89,
			slide: function(event, ui) {
				Polar1App.rotation = ui.value * Math.PI / 180;
				Polar1App.render();
			}
		});
	},
	render: function() {
		this.canvas = document.getElementById('pgCanvas');
		this.context = this.canvas.getContext('2d');

		Playground.clearCanvas();

		this.colorRand.setRandomSeed(this.colorRandomSeed);

		var numShapes = 10;
		var colors = this.generateColors(numShapes);
		var colorIndex = 0;
		for(var i = numShapes; i > 0; i--) {
			var diff = (this.canvas.width / 2 * 1.6) / numShapes;
			this.renderShape(i * diff, diff * (0.1*this.amplitude), colors[colorIndex++]);
		}
	},
	renderShape: function(outlineRadius, outlineScale, color) {
		this.context.beginPath();

		var coords = [];
		var degDiff = 15, 
			totalDegrees = 360*this.bumpCount;
		for(var i = 0; i < totalDegrees; i += degDiff) {
			var radians = i * Math.PI / 180,
				radius = Math.cos(radians) * outlineScale + outlineRadius,
				coord = {
				x: this.canvas.width / 2 + Math.cos(radians / this.bumpCount + this.rotation) * radius, 
				y: this.canvas.height / 2 + Math.sin(radians / this.bumpCount + this.rotation) * radius
			};
			coords.push(coord);
		}

		this.context.moveTo(coords[0].x, coords[0].y);
		for(var i = 0; i < coords.length; i+=1)
		{
			var prev = coords[(i + coords.length - 1) % coords.length], // previous point
				p1 = coords[i],	// current point
				p2 = coords[(i + 1) % coords.length], // next point
				next = coords[(i + 2) % coords.length]; // point after next

			var cpscale = 0.2;

			// use slopes of nearby points to calculate control points

			var cp1 = { // control point 1
				x: p1.x + (p2.x - prev.x) * cpscale,
				y: p1.y + (p2.y - prev.y) * cpscale
			};

			var cp2 = { // control point 2
				x: p2.x + (p1.x - next.x) * cpscale,
				y: p2.y + (p1.y - next.y) * cpscale
			};

			this.context.bezierCurveTo(
				cp1.x, cp1.y,
				cp2.x, cp2.y,
				p2.x, p2.y);
		}

		this.context.lineWidth = 3;
		this.context.fillStyle = color;
		this.context.stroke();
		this.context.fill();
	},
	generateColors: function(count) {
		// pick two random points in color space
		do {
			var r1 = this.colorRand.random(),
				g1 = this.colorRand.random(),
				b1 = this.colorRand.random(),
				r2 = this.colorRand.random(),
				g2 = this.colorRand.random(),
				b2 = this.colorRand.random(),
				distance = Math.sqrt((r2-r1)*(r2-r1)+(g2-g1)*(g2-g1)+(b2-b1)*(b2-b1));
		} while(distance < 0.5);

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
	}
};

Playground.addModule({
	name: 'Splat',
	slug: 'polar1',
	obj: Polar1App,
	source: ['js/polar1.js']
});
