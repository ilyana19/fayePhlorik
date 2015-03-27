zog("hi from controller.js");

var app = function(app) {
	app.makeHotSpots = function(assets, pages, direction) {
		zog("hotspots");
		
		var buttons = new zim.HotSpots([
				{page: assets.main, rect: assets.training, call: train},
				{page: assets.status, rect: assets.resetButton, call: reset}
			]
		);
		
		function train() {
			zog("train faye");
		}
		
		function reset() {
			zog("reset game");
			window.localStorage.time = Date.now();
		}
	}
	
	app.makeDrag = function(assets, pages) {
		zog("drag stuff");
		
		//function(obj, rect, overCursor, dragCursor, currentTarget, mouseDowns, localBounds)
		/*zim.drag(assets.buttons, null, null, null, null, true);

		assets.buttons.on("mousedown", function(e) {
			var copy = e.target.clone();
			copy.x = e.target.x;
			copy.y = e.target.y;
			assets.buttons.addChildAt(copy, 0);
			assets.buttons.addChild(e.target);
			zog(e.target.x, e.target.y);
		});*/
		
		//zim.drag(assets.buttons);
		
		zim.drag(assets.buttons, null, null, null, null, true);
	}
	
	app.statDepletion = function(assets, pages) {
		zog("handle stats");
		
		var decreaseHP = new zim.Proportion(0, 5, 0, 1, -1);
		var decreaseFood = new zim.Proportion(0, 120, 0, 1, -1);
		var decreaseWater = new zim.Proportion(0, 120, 0, 1, -1);
		var increaseFriendliness = new zim.Proportion(0, 180, 0, 1);
		
		var interval = setInterval(function() {
			assets.hungerStat.scaleX = decreaseFood.convert((Date.now()-window.localStorage.time)/1000/60);
			assets.waterStat.scaleX = decreaseWater.convert((Date.now()-window.localStorage.time)/1000/60);
			assets.friendliness.scaleX = increaseFriendliness.convert((Date.now()-window.localStorage.time)/1000/60);
			
			if (assets.hungerStat.scaleX == 0 || assets.waterStat.scaleX == 0) {
				zog("faye's hungry and thirsty. he's dying.");
				assets.hp.scaleX = decreaseHP.convert((Date.now()-window.localStorage.time)/1000/60);
			}
			
			if (assets.hp.scaleX == 0) {
				zog("dead");
				clearInterval(interval);
				
			}
			
			stage.update();
		}, 1000);
	}
	
	return app;
} (app || {});