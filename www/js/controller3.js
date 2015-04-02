zog("hi from controller.js");

var app = function(app) {
	app.makeHotSpots = function(assets, pages) {
		zog("hotspots");
		
		var buttons = new zim.HotSpots([
				{page: assets.home, rect: assets.start, call: function() {pages.go(assets.main, "right");}},
				{page: assets.main, rect: assets.food, call: giveFood},
				{page: assets.main, rect: assets.water, call: giveWater},
				{page: assets.main, rect: assets.training, call: function() {pages.go(assets.explore, "right"); train();}}
			]
		);
		
		function giveFood() {
			zog("give food to faye");
			
			window.localStorage.food = Number(window.localStorage.food) + 2000;
			window.localStorage.friendliness = Number(window.localStorage.friendliness) + 1;
			stage.update();
		}
		
		function giveWater() {
			zog("give water to faye");
			
			window.localStorage.water = Number(window.localStorage.water) + 2000;
			window.localStorage.friendliness = Number(window.localStorage.friendliness) + 1;
			stage.update();
		}
		
		function train() {
			zog("train faye");
			window.localStorage.friendliness = Number(window.localStorage.friendliness) + 2.5;
			
			var sec = 1000; //easier to understand
			var min = 3*sec, max = 6*sec;
			var randTime = peach.rand(min, max);
			
			var timer = new peach.Timer(randTime);
			zog(randTime);
			timer.start();
			
			var delay = new peach.Timer(2000);
			
			timer.handler = function() {
				zog("yes");
				assets.trainingText.text = "TRAINING\nCOMPLETE";
				stage.update();
				delay.start();
				timer.stop();
			}
			
			delay.handler = function() {
				pages.go(assets.main, "left");
				assets.trainingText.text = "TRAINING\nIN PROGRESS";
				delay.stop();
			}
		}
	}
	
	app.makeDrag = function(assets, pages) {
		zog("dragging");
		zim.drag(assets.buttons, null, null, null, null, false);
		
		/*assets.buttons.on("mousedown", function(e) {
			assets.buttonBox.addChild(assets.buttons);
			assets.copy = e.target.clone();
			zog(assets.copy);
			assets.copy.startX = e.target.startX; // clones do not get custom properties
			assets.copy.startY = e.target.startY;
			assets.buttons.addChildAt(assets.copy, 0);
			assets.buttons.addChild(e.target); // put above other parts in tray
		});*/
		
		assets.buttons.on("pressup", action);
		
		function action(e) {
			zog("dragging");
			var obj = e.target;
			
			if (zim.hitTestReg(assets.chara, obj)) {
				if (!assets.hitCheck) {
					assets.hitCheck = true;
					assets.chara.addChild(obj);
					assets.chara.removeChild(obj);
					obj = null;
					zog("change stats");
				}
			} else {
				if (assets.hitCheck) {
					var point = obj.parent.localToLocal(obj.x, obj.y, assets.buttons);
					obj.x = point.x;
					obj.y = point.y;
					assets.buttons.addChild(obj);
					zim.move(obj, obj.startX, obj.startY, 200, null, function() {
						assets.buttons.removeChild(obj);
						obj = null;
					});
					assets.hitCheck = false;
					zog("nope");
					
				}
			}
			
			//zog(assets.hitCheck);
			stage.update();
		}
	}
	
	app.statDepletion = function(assets, pages) {
		zog("handle stats decrease");
		
		var decreaseHP = new zim.Proportion(0, 20, 0, 1, -1);
		var decreaseFood = new zim.Proportion(0, 2, 0, 1, -1);
		var decreaseWater = new zim.Proportion(0, 1, 0, 1, -1);
		var increaseFriendliness = new zim.Proportion(0, 60, 0, 1);
		
		var handleStats = function() {
			assets.resetButton.removeAllEventListeners();
		
			if (assets.hp.scaleX != 0) {
				assets.hungerStat.scaleX = decreaseFood.convert((Date.now()-window.localStorage.food)/1000/60);
				assets.waterStat.scaleX = decreaseWater.convert((Date.now()-window.localStorage.water)/1000/60);
				assets.friendliness.scaleX = increaseFriendliness.convert(window.localStorage.friendliness);
	
				if (assets.hungerStat.scaleX == 0 && assets.waterStat.scaleX == 0) {
					zog("faye's hungry and thirsty. he's dying.");
					assets.hp.scaleX = decreaseHP.convert((Date.now()-window.localStorage.hp)/1000);
				}
				stage.update();
				
				
				assets.resetButton.on('click', reset, false);
				
			} else {
				//zog("dead");
				assets.resetButton.on('click', reset, false);
			}
		}
		
		
		function recursively() {
			handleStats();
			animate(recursively);
		}
		animate(recursively);
		
		function reset() {
			zog("reset game");
			assets.hp.scaleX = 1;
			assets.hungerStat.scaleX = 1;
			assets.waterStat.scaleX = 1;
			assets.friendliness.scaleX = 0;
			window.localStorage.time = Date.now();
			window.localStorage.hp = Date.now();
			window.localStorage.food = Date.now();
			window.localStorage.water = Date.now();
			window.localStorage.friendliness = 0;
			handleStats();
		}
	}
	
	return app;
} (app || {});