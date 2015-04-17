var Spiral1App = {
	patternIndex: 1,
	circleRadius: 7,
	numPoints: 512,
	initControls: function(el) {
		el.html("Pattern:" +
			"<div id='patternIndexSlider' class='slider'></div>" +
			"Circle Radius:" + 
			"<div id='circleRadiusSlider' class='slider'></div>");

		$('#patternIndexSlider').slider({
			value: 1,
			min: 1,
			max: 100,
			slide: function(event, ui) {
				Spiral1App.patternIndex = ui.value;
				Spiral1App.render();
			}
		});

		$('#circleRadiusSlider').slider({
			value: 7,
			min: 0,
			max: 10,
			slide: function(event, ui) {
				Spiral1App.circleRadius = ui.value;
				Spiral1App.render();
			}
		});
	},
	render: function() {
		this.canvas = document.getElementById('pgCanvas');
		this.context = this.canvas.getContext('2d');

		this.clearCanvas();

		this.context.lineWidth = 1;
		this.context.strokeStyle = 'black';

		for(var index = 0; index < this.numPoints; index++)
		{
			var ga = Math.PI * (3 - Math.sqrt(5)); // golden angle
			var rad = index * ga * this.patternIndex;
			var x = this.canvas.width/2 + Math.cos(rad) * index;
			var y = this.canvas.height/2 + Math.sin(rad) * index;

			var r = Math.max(0, 255 - Math.floor(this.distance(0, this.canvas.height, x, y) / 3));
			var g = Math.max(0, 255 - Math.floor(this.distance(this.canvas.width, this.canvas.height, x, y) / 3));
			var b = Math.max(0, 255 - Math.floor(this.distance(this.canvas.width/2, 0, x, y) / 3));
			this.context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';

			this.context.beginPath();
			this.context.arc(x, y, index / (50 - this.circleRadius * 4), 0, Math.PI * 2);
			this.context.fill();
		}
	},
	clearCanvas: function() {
		this.context.beginPath();
		this.context.rect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillStyle = 'white';
		this.context.fill();
	},
	distance: function(x1, y1, x2, y2) {
		return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	}
};

Modules.addModule({
	name: 'Spiral',
	slug: 'spiral1',
	obj: Spiral1App
});
