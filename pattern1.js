var Pattern1App = {
	initialRandomSeed: 1,
	tileSize: 32,
	lineWidth: 1,
	initControls: function(el) {
		el.html("Tile size:" +
			"<div id='tileSizeSlider' class='slider'></div>" +
			"Line width:" +
			"<div id='lineWidthSlider' class='slider'></div>" +
			"<button onclick='Pattern1App.initialRandomSeed = Math.random() * 1000;Pattern1App.render()'>Mix Up Pattern</button>");

		$('#tileSizeSlider').slider({
			value: 2,
			min: 1,
			max: 5,
			slide: function(event, ui) {
				Pattern1App.tileSize = Math.pow(2, ui.value + 3);
				Pattern1App.render();
			}
		});

		$('#lineWidthSlider').slider({
			value: 1,
			min: 1,
			max: 8,
			slide: function(event, ui) {
				Pattern1App.lineWidth = ui.value;
				Pattern1App.render();
			}
		});		
	},
	render: function() {
		this.seed = this.initialRandomSeed;

		this.canvas = document.getElementById('myCanvas');
		this.context = this.canvas.getContext('2d');

		this.clearCanvas();

		this.context.lineWidth = this.tileSize / 2 * (this.lineWidth - 1) / 7 + 1;
		this.context.strokeStyle = 'black';

		for(var x = 0; x < this.canvas.width / this.tileSize; x++)
		{
			for(var y = 0; y < this.canvas.height / this.tileSize; y++)
			{
				this.context.translate(x * this.tileSize, y * this.tileSize);

				if (this.random() < 0.5)
				{
					this.renderPattern1();
				}
				else
				{
					this.renderPattern2();
				}

				this.context.setTransform(1, 0, 0, 1, 0, 0);
			}
		}			
	},
	renderPattern1: function() {
		this.context.beginPath();
		this.context.moveTo(this.tileSize/2, 0);
		this.context.bezierCurveTo(this.tileSize/2, this.tileSize/4, this.tileSize/4, this.tileSize/2, 0, this.tileSize/2);
		this.context.stroke();

		this.context.beginPath();
		this.context.moveTo(this.tileSize, this.tileSize/2);
		this.context.bezierCurveTo(this.tileSize*3/4, this.tileSize/2, this.tileSize/2, this.tileSize*3/4, this.tileSize/2, this.tileSize);
		this.context.stroke();

	},
	renderPattern2: function() {
		this.context.beginPath();
		this.context.moveTo(this.tileSize/2, 0);
		this.context.bezierCurveTo(this.tileSize/2, this.tileSize/4, this.tileSize*3/4, this.tileSize/2, this.tileSize, this.tileSize/2);
		this.context.stroke();

		this.context.beginPath();
		this.context.moveTo(0, this.tileSize/2);
		this.context.bezierCurveTo(this.tileSize/4, this.tileSize/2, this.tileSize/2, this.tileSize*3/4, this.tileSize/2, this.tileSize);
		this.context.stroke();	
	},
	clearCanvas: function() {
		this.context.beginPath();
		this.context.rect(0, 0, this.canvas.width, this.canvas.height);
		this.context.fillStyle = 'white';
		this.context.fill();
	},
	random: function() {
		// From http://stackoverflow.com/questions/521295/javascript-random-seeds
		var x = Math.sin(this.seed++) * 10000;
		return x - Math.floor(x);
	}
};

Modules.addModule({
	name: 'Pattern',
	slug: 'pattern1',
	obj: Pattern1App
});
