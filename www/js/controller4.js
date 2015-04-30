zog("hi from controller.js");

var app = function(app) {
	app.makeHotSpots = function(assets, pages) {
		zog("hotspots");
		
		var buttons = new zim.HotSpots([
				{page: assets.home, rect: assets.start, call: function() {pages.go(assets.main, "right");}},
				{page: assets.main, rect: assets.training, call: function() {pages.go(assets.explore, "right"); train();}},
				{page: assets.main, rect: assets.food, call: giveFood},
				{page: assets.main, rect: assets.water, call: giveWater}
			]
		);
		
		function train() {
			zog("train faye");
			
			var sec = 1000; //easier to understand
			var min = 3*sec, max = 6*sec;
			var randTime = peach.rand(min, max);
			
			//add the stats
			window.localStorage.friendliness = Number(window.localStorage.friendliness) + 2.5;
			window.localStorage.exp = Number(window.localStorage.exp) + (randTime*0.0005); //+50 to quickly fill up
			
			var timer = new peach.Timer(randTime);
			zog(randTime);
			timer.start();
			
			var delay = new peach.Timer(1000);
			
			timer.handler = function() {
				zog("yes");
				assets.trainingText.text = "TRAINING\nCOMPLETE";
				delay.start();
				timer.stop();
				
				if (assets.exp.scaleX == 1) {
					assets.lvlCheck = true;
					window.localStorage.lvl = Number(window.localStorage.lvl) + 1;
					assets.lvlText.text = "LVL " + window.localStorage.lvl;
				}
				
				if (assets.lvlCheck == true) {
					assets.lvlCheck = false;
					window.localStorage.exp = 0;
					assets.exp.scaleX = window.localStorage.exp;
				}
				
				stage.update();
			}
			
			delay.handler = function() {
				pages.go(assets.main, "left");
				assets.trainingText.text = "TRAINING\nIN PROGRESS";
				assets.showHeart();
				delay.stop();
				stage.update();
			}
		}
		
		function giveFood() {
			zog("give food to faye");
			assets.showHeart();
			window.localStorage.food = Number(window.localStorage.food) + 2000;
			window.localStorage.hp = Number(window.localStorage.hp) + 2000;
			window.localStorage.friendliness = Number(window.localStorage.friendliness) + 1;
			stage.update();
		}
		
		function giveWater() {
			zog("give water to faye");
			assets.showHeart();
			window.localStorage.water = Number(window.localStorage.water) + 2000;
			window.localStorage.hp = Number(window.localStorage.hp) + 2000;
			window.localStorage.friendliness = Number(window.localStorage.friendliness) + 1;
			stage.update();
		}
	
		assets.showHeart = function() {
			createjs.Tween.get(assets.heart)
				.to({alpha: 1}, 400)
				.wait(400)
				.to({alpha: 0}, 400);
				
			assets.hitCheck = false;
		}
	}
	
	app.makeDrag = function(assets, pages) {
		zim.drag(assets.buttons);
		assets.buttons.on("pressup", action);
		
		function action(e) {
			var obj = e.target;
			var newX, newY;
			
			if (zim.hitTestReg(assets.chara, obj)) {
				assets.hitCheck = true;
				assets.showHeart();
				if (obj.name === "food") giveFood();
				else giveWater();
			}
		
			zim.move(obj, obj.startX, obj.startY, 200);
			stage.update();
		}
		
		function giveFood() {
			window.localStorage.food = Number(window.localStorage.food) + 2000;
			window.localStorage.hp = Number(window.localStorage.hp) + 2000;
			window.localStorage.friendliness = Number(window.localStorage.friendliness) + 1;
			stage.update();
			zog("give food");
		}
		
		function giveWater() {
			window.localStorage.water = Number(window.localStorage.water) + 2000;
			window.localStorage.hp = Number(window.localStorage.hp) + 2000;
			window.localStorage.friendliness = Number(window.localStorage.friendliness) + 1;
			stage.update();
			zog("give water");
		}
		
		assets.showHeart = function() {
			createjs.Tween.get(assets.heart)
				.to({alpha: 1}, 400)
				.wait(400)
				.to({alpha: 0}, 400);
				
			assets.hitCheck = false;
		}
	}
	
	app.statDepletion = function(assets, pages) {
		zog("handle stats decrease");
		
		var decreaseHP = new zim.Proportion(0, 2, 0, 1, -1);
		var decreaseFood = new zim.Proportion(0, 30, 0, 1, -1);
		var decreaseWater = new zim.Proportion(0, 20, 0, 1, -1);
		var increaseStats = new zim.Proportion(0, 60, 0, 1);
		
		var handleStats = function() {
			assets.resetButton.removeAllEventListeners();
		
			if (assets.hp.scaleX != 0) {
				assets.hungerStat.scaleX = decreaseFood.convert((Date.now()-window.localStorage.food)/1000/60);
				assets.waterStat.scaleX = decreaseWater.convert((Date.now()-window.localStorage.water)/1000/60);
				assets.friendliness.scaleX = increaseStats.convert(window.localStorage.friendliness);
				assets.exp.scaleX = increaseStats.convert(window.localStorage.exp);
				stage.update();
				assets.resetButton.on('click', reset, false);
				
			} else {
				assets.resetButton.on('click', reset, false);
			}
			
			if (assets.waterStat.scaleX == 0) {
				//zog("faye's thirsty");
				assets.hp.scaleX = decreaseHP.convert((Date.now()-window.localStorage.hp)/1000/60);
			}
			
			if (assets.hungerStat.scaleX == 0) {
				//zog("faye's hungry");
				assets.hp.scaleX = decreaseHP.convert((Date.now()-window.localStorage.hp)/1000/60);
			}
				
		}
		
		function recursively() {
			handleStats();
			animate(recursively);
		}
		animate(recursively);
		
		function reset() {
			assets.hp.scaleX = 1;
			assets.exp.scaleX = 0;
			assets.lvl = 1;
			assets.hungerStat.scaleX = 1;
			assets.waterStat.scaleX = 1;
			assets.friendliness.scaleX = 0;
			window.localStorage.time = Date.now();
			window.localStorage.exp = 0;
			window.localStorage.hp = Date.now();
			window.localStorage.food = Date.now();
			window.localStorage.water = Date.now();
			window.localStorage.friendliness = 0;
			window.localStorage.lvl = 1;
			assets.lvlText.text = "LVL " + window.localStorage.lvl;
			handleStats();
		}
	}
	
	return app;
} (app || {});