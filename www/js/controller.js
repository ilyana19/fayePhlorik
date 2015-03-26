zog("hi from controller.js");

var app = function(app) {
	app.makeHotSpots = function(assets, pages, direction) {
		zog("hotspots");
		
		var buttons = new zim.HotSpots([
				{page: assets.main, rect: assets.food, call: giveFood},
				{page: assets.main, rect: assets.water, call: giveWater},
				{page: assets.main, rect: assets.training, call: train}
			]
		);
		
		function giveFood() {
			zog("give faye food");
			assets.food.setFill("orange");
			
			//function(obj, rect, overCursor, dragCursor, currentTarget, mouseDowns, localBounds)
			
			
			stage.update();
		}
		
		function giveWater() {
			zog("give faye water");
		}
		
		function train() {
			zog("train faye");
		}
	}
	
	return app;
} (app || {});