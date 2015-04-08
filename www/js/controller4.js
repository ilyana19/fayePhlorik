zog("hi from controller.js");

var app = function(app) {
	app.makeHotSpots = function(assets, pages) {
		zog("hotspots");
		
		var buttons = new zim.HotSpots([
				{page: assets.home, rect: assets.start, call: function() {pages.go(assets.main, "right");}},
				{page: assets.main, rect: assets.training, call: function() {pages.go(assets.explore, "right"); train();}}
			]
		);
		
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
		zim.drag(assets.buttons);
		assets.buttons.on("pressup", action);
		
		function action(e) {
			var obj = e.target;
			var newX, newY;
			
			if (zim.hitTestReg(assets.chara, obj)) {
				if (obj.name === "food") giveFood();
				else giveWater();
			} 
			zim.move(obj, obj.startX, obj.startY, 200);
			
			function giveFood() {
				window.localStorage.food = Number(window.localStorage.food) + 2000;
				window.localStorage.friendliness = Number(window.localStorage.friendliness) + 1;
				stage.update();
			}
			
			function giveWater() {
				window.localStorage.water = Number(window.localStorage.water) + 2000;
				window.localStorage.friendliness = Number(window.localStorage.friendliness) + 1;
				stage.update();
			}
			
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