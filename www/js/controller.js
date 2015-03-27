zog("hi from controller.js");

var app = function(app) {
	app.makeHotSpots = function(assets, pages, direction) {
		zog("hotspots");
		
		var buttons = new zim.HotSpots([
				{page: assets.main, rect: assets.training, call: train}
			]
		);
		
		function train() {
			zog("train faye");
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
		
		var decreaseStat = new zim.Proportion(0, 120, 0, 1, -1);
		var decreaseWater = new zim.Proportion(0, 60, 0, 1, -1);
		var increaseStat = new zim.Proportion(0, 180, 0, 1);
		
		var interval = setInterval(function() {
			assets.hp.scaleX = decreaseStat.convert((Date.now()-window.localStorage.time)/1000);
			assets.hungerStat.scaleX = decreaseStat.convert((Date.now()-window.localStorage.time)/1000);
			assets.waterStat.scaleX = decreaseWater.convert((Date.now()-window.localStorage.time)/1000);
			assets.friendliness.scaleX = increaseStat.convert((Date.now()-window.localStorage.time)/1000);
			
			if (assets.hp.scaleX == 0) {
				zog("dead");
				clearInterval(interval);
			}
			
			stage.update();
		}, 1000);
	}
	
	return app;
} (app || {});