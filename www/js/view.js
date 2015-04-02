zog("hi from view.js");

var app = function(app) {
	app.makeVerticalPages = function(layoutManager, gridManager, guideManager) {
		p = {};
		
		/*======================= HOME PAGE STARTS ============================*/
		p.home = new createjs.Container();
		p.home.name = "home";
		
		var splash = p.home.splash = new createjs.Container();
		splash.setBounds(0, 0, 600, 1000);
		p.home.addChild(splash);
		
		var start = p.start = new createjs.Bitmap(preload.getResult("food"));
		start.x = 100;
		start.y = 200;
		splash.addChild(start);
		
		var homeParts = [
			{object: splash, marginTop: 0, maxWidth: stageW, backgroundColor: "#5D5D77", valign: "middle"}
		];
		
		//function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)
		var homeLayout = new zim.Layout(p.home, homeParts, 0, "#5D5D77", true, null, stage);
		layoutManager.add(homeLayout);
		/*======================= HOME PAGE ENDS ============================*/
		
		
		/*======================= MAIN PAGE STARTS ============================*/
		p.main = new createjs.Container();
		p.main.name = "main";
		
		var room = new createjs.Container();
		room.setBounds(0, 0, 600, 1000);
		room.w = room.getBounds().width;
		room.h = room.getBounds().height;
		p.main.addChild(room);
		
		//var chara = p.chara = new zim.Rectangle(200, 200, "black");
		//chara.setBounds(0, 0, 200, 200);
		var chara = p.chara = new createjs.Bitmap(preload.getResult("faye"));
		chara.x = room.w/2;
		chara.y = room.h/2;
		chara.w = chara.getBounds().width;
		chara.h = chara.getBounds().height;
		chara.regX = chara.w/2;
		chara.regY = chara.h/2;
		room.addChild(chara);
		
		//button container for: food, water, train
		var size = 600, space = 300;
		
		var buttonBox = p.buttonBox = new createjs.Container();
		buttonBox.setBounds(0, 0, 1800, 600);
		buttonBox.w = room.getBounds().width;
		buttonBox.h = room.getBounds().height;
		p.main.addChild(buttonBox);
		
		buttonBox.buttons = p.buttons = new createjs.Container();
		buttonBox.buttons.hitCheck = p.hitCheck = false;
		buttonBox.buttons.copy = p.copy;
		buttonBox.pressed = p.pressed = false;
		buttonBox.addChild(buttonBox.buttons);
		
		var foodBG = new zim.Rectangle(size, size, "#D7D6EE");
		buttonBox.addChildAt(foodBG, 0);
		var food = p.food = new createjs.Bitmap(preload.getResult("food"));
		food.startX = food.x = buttonBox.w-space;
		food.startY = food.y = space;
		food.regX = size/2;
		food.regY = size/2;
		buttonBox.buttons.addChild(food);
		
		var water = p.water = new zim.Rectangle(size, size, "#D7D6EE");
		water.setBounds(0, 0, size, size);
		water.startX = water.x = buttonBox.w+space;
		water.startY = water.y = space;
		water.regX = size/2;
		water.regY = size/2;
		buttonBox.buttons.addChild(water);
		
		var training = p.training = new zim.Rectangle(size, size, "#D7D6EE");
		training.setBounds(0, 0, size, size);
		training.x = buttonBox.w+(space*3);
		training.y = space;
		training.regX = size/2;
		training.regY = size/2;
		buttonBox.addChild(training);
		
		//percentages
		var mainParts = [
			{object: room, marginTop: 0, maxWidth: stageW, backgroundColor: "#5D5D77"},
			{object: buttonBox, marginTop: 0, maxWidth: stageW, height: 20, valign: "bottom", backgroundColor: "#D7D6EE"}
		];
		
		//function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)
		var mainLayout = new zim.Layout(p.main, mainParts, 0, "black", true, null, stage);
		layoutManager.add(mainLayout); //add main page to the layout manager
		/*======================= MAIN PAGE ENDS ============================*/
		
		
		/*======================= STATUS PAGE STARTS ============================*/
		p.status = new createjs.Container();
		p.status.name = "status";
		
		var stats = new createjs.Container();
		stats.setBounds(0, 0, 600, 800);
		stats.current = p.current = 0;
		p.status.addChild(stats);
		
		var statHeader = new createjs.Text("STATUS", "72px AveriaLibre", "#D7D6EE");
		statHeader.textAlign = "center";
		statHeader.textBaseline = "alphabetic";
		statHeader.x = stats.x+300;
		statHeader.y = stats.y-100;
		stats.addChild(statHeader);
		
		/* -------------------------------------- */
		var hp = new createjs.Text("HEALTH", "32px Raleway", "#DDA4A4");
		hp.textAlign = "left";
		hp.textBaseline = "alphabetic";
		hp.x = stats.x;
		hp.y = stats.y-10;
		stats.addChild(hp);
		
		var hng = new createjs.Text("FOOD", "32px Raleway", "#C4DDA4");
		hng.textAlign = "left";
		hng.textBaseline = "alphabetic";
		hng.x = stats.x;
		hng.y = stats.y+130;
		stats.addChild(hng);
		
		var wtr = new createjs.Text("WATER", "32px Raleway", "#A4D5DD");
		wtr.textAlign = "left";
		wtr.textBaseline = "alphabetic";
		wtr.x = stats.x;
		wtr.y = stats.y+270;
		stats.addChild(wtr);
		
		var friend = new createjs.Text("FRIENDLINESS", "32px Raleway", "#DDD8A4");
		friend.textAlign = "left";
		friend.textBaseline = "alphabetic";
		friend.x = stats.x;
		friend.y = stats.y+410;
		stats.addChild(friend);
		/* -------------------------------------- */
		
		//create stat bars
		var barContainer = new createjs.Container();
		var w = stats.getBounds().width, h = 60, gap = 80;
		var statBar = 4, barBacking;
		
		for (var i = 0; i < statBar; i++) {
			barBacking = new zim.Rectangle(w, h, "#D7D6EE");
			barBacking.x = 0;
			barBacking.y = i * (h + gap);
			barContainer.addChild(barBacking);
			stats.addChild(barContainer);
		}
		
		var hp = p.hp =  new zim.Rectangle(w, h, "#ED406E");
		hp.scaleX = 1;
		hp.x = 0;
		hp.y = 0;
		stats.addChild(hp);		
		
		var hungerStat = p.hungerStat =  new zim.Rectangle(w, h, "#B5ED00");
		hungerStat.scaleX = 1;
		hungerStat.x = 0;
		hungerStat.y = h + gap;
		stats.addChild(hungerStat);
		
		var waterStat = p.waterStat =  new zim.Rectangle(w, h, "#00BDED");
		waterStat.scaleX = 1;
		waterStat.x = 0;
		waterStat.y = (h + gap) * 2;
		stats.addChild(waterStat);
		
		var friendliness = p.friendliness = new zim.Rectangle(w, h, "#EDC500");
		friendliness.scaleX = 0;
		friendliness.x = 0;
		friendliness.y = (h + gap) * 3;
		stats.addChild(friendliness);
		
		//reset button stuff
		var resetContainer = new createjs.Container();
		resetContainer.setBounds(0, 0, 400, 200);
		stats.addChild(resetContainer);
		
		var resetButton = p.resetButton = new zim.Rectangle(400, 200, "#D7D6EE", null, null, 10);
		resetButton.x = 100;
		resetButton.y = 550;
		resetContainer.addChild(resetButton);
		
		var resetText = new createjs.Text("RESET", "72px AveriaLibre", "#AA586E");
		resetText.textAlign = "center";
		resetText.textBaseline = "alphabetic";
		resetText.x = resetButton.x+200;
		resetText.y = resetButton.y+120;
		resetContainer.addChild(resetText);
		
		var statusParts = [
			{object: stats, marginTop: 25, maxWidth: 90, valign: "middle"}
		];
		
		//function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)
		var statusLayout = new zim.Layout(p.status, statusParts, 0, "#5D5D77", true, null, stage);
		layoutManager.add(statusLayout); //add status page to the layout manager
		/*======================= STATUS PAGE ENDS ============================*/
		
		
		/*======================= TRAINING PAGE STARTS ============================*/
		p.explore = new createjs.Container();
		p.explore.name = "explore";
		
		var content = p.explore.content = new createjs.Container();
		content.setBounds(0, 0, 600, 1000);
		p.explore.addChild(content);
		
		var trainingText = p.trainingText = new createjs.Text("TRAINING\nIN PROGRESS", "60px AveriaLibre", "#D7D6EE");
		trainingText.textAlign = "center";
		trainingText.textBaseline = "alphabetic";
		trainingText.x = 300;
		trainingText.y = 400;
		content.addChild(trainingText);
		
		var trainingIcon =  new zim.Rectangle(200, 200, "#B5ED00");
		trainingIcon.x = trainingText.x/2+50;
		trainingIcon.y = trainingText.y+120;
		content.addChild(trainingIcon);
		
		var exploreParts = [
			{object: content, marginTop: 0, maxWidth: stageW, backgroundColor: "#5D5D77", valign: "middle"}
		];
		
		//function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)
		var exploreLayout = new zim.Layout(p.explore, exploreParts, 0, "#5D5D77", true, null, stage);
		layoutManager.add(exploreLayout);
		/*======================= TRAINING PAGE ENDS ============================*/
		
		return p;
	}
	
	return app;
} (app || {});