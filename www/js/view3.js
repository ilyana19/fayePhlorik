zog("hi from view.js");

var app = function(app) {
	app.makeVerticalPages = function(layoutManager, gridManager, guideManager) {
		p = {};
		
		/*======================= HOME PAGE STARTS ============================*/
		p.home = new createjs.Container();
		p.home.name = "home";
		
		var splash = p.home.splash = new createjs.Container();
		splash.setBounds(0, 0, 768, 1024);
		splash.w = splash.getBounds().width;
		splash.h = splash.getBounds().height;
		p.home.addChild(splash);
		
		var start = p.start = new createjs.Bitmap(preload.getResult("start"));
		start.x = splash.w/2-124;
		start.y = splash.w/2+100;
		start.scaleX = start.scaleY = 0.8;
		splash.addChild(start);
		
		var splashText = p.splashText = new createjs.Text("Faye Phlorik's\nRoom", "80px AveriaLibre", "#D7D6EE");
		splashText.textAlign = "center";
		splashText.textBaseline = "alphabetic";
		splashText.x = splash.w/2;
		splashText.y = splash.w/2-50;
		splash.addChild(splashText);
		
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
		
		var room = p.room = new createjs.Container();
		room.setBounds(0, 0, 768, 1024);
		room.w = room.getBounds().width;
		room.h = room.getBounds().height;
		p.main.addChild(room);
		
		var charaStuff = p.charaStuff = new createjs.Container();
		room.addChild(charaStuff);
		
		//var chara = p.chara = new zim.Rectangle(200, 200, "black");
		//chara.setBounds(0, 0, 200, 200);
		var chara = p.chara = new createjs.Bitmap(preload.getResult("faye"));
		chara.x = room.w/2;
		chara.y = room.h/2;
		chara.w = chara.getBounds().width;
		chara.h = chara.getBounds().height;
		chara.regX = chara.w/2;
		chara.regY = chara.h/2;
		//chara.scaleX = chara.scaleY = 0.4;
		charaStuff.addChild(chara);
		
		var heart = p.heart = new createjs.Bitmap(preload.getResult("heart"));
		var showHeart = p.showHeart;
		heart.x = chara.x + 150;
		heart.y = chara.y - 220;
		heart.rotation = 25;
		heart.alpha = 0;
		charaStuff.addChild(heart);
		
		//button container for: food, water, train
		var w = 750, h = 768;
		
		var buttonBox = p.buttonBox = new createjs.Container();
		buttonBox.setBounds(0, 0, 1024, 768);
		buttonBox.w = room.getBounds().width;
		buttonBox.h = room.getBounds().height;
		p.main.addChild(buttonBox);
		
		buttonBox.buttons = p.buttons = new createjs.Container();
		buttonBox.buttons.hitCheck = p.hitCheck = false;
		buttonBox.addChild(buttonBox.buttons);
		
		var foodBG = new zim.Rectangle(w, h, "#C4DDA4");
		foodBG.x = buttonBox.w/2-1000;
		foodBG.y = buttonBox.h/2-510;
		buttonBox.addChildAt(foodBG, 0);
		var food = p.food = new createjs.Bitmap(preload.getResult("food"));
		//food.startX = food.x = foodBG.x+1150;
		//food.startY = food.y = foodBG.y+1180;
		food.x = foodBG.x+1150;
		food.y = foodBG.y+1180;
		food.scaleX = food.scaleY = 2.3;
		food.regX = w/2;
		food.regY = h/2;
		food.name = "food";
		buttonBox.buttons.addChild(food);
		
		var waterBG = new zim.Rectangle(w, h, "#A4D5DD");
		waterBG.x = buttonBox.w/2-250;
		waterBG.y = buttonBox.h/2-510;
		buttonBox.addChildAt(waterBG, 0);
		var water = p.water = new createjs.Bitmap(preload.getResult("wine"));
		water.setBounds(0, 0, w, h);
		//water.startX = water.x = waterBG.x+1120;
		//water.startY = water.y = waterBG.y+1180;
		water.x = waterBG.x+1120;
		water.y = waterBG.y+1180;
		water.scaleX = water.scaleY = 2.3;
		water.regX = w/2;
		water.regY = h/2;
		water.name = "water";
		buttonBox.buttons.addChild(water);
		
		var trainingBG = new zim.Rectangle(w, h, "#DDA4A4");
		trainingBG.x = buttonBox.w/2+500;
		trainingBG.y = buttonBox.h/2-510;
		buttonBox.addChildAt(trainingBG, 0);
		var training = p.training = new createjs.Bitmap(preload.getResult("door"));
		training.setBounds(0, 0, w, h);
		training.x = trainingBG.x+1000;
		training.y = trainingBG.y+1040;
		training.scaleX = training.scaleY = 2.3;
		training.regX = w/2;
		training.regY = h/2;
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
		stats.setBounds(0, 0, 768, 1024);
		stats.w = stats.getBounds().width;
		stats.h = stats.getBounds().height;
		p.status.addChild(stats);
		
		var statHeader = new createjs.Text("STATUS", "96px AveriaLibre", "#D7D6EE");
		statHeader.textAlign = "center";
		statHeader.textBaseline = "alphabetic";
		statHeader.x = stats.w/2;
		statHeader.y = stats.h/2-700;
		stats.addChild(statHeader);
		
		var lvlText = p.lvlText = new createjs.Text("LVL "+window.localStorage.lvl, "60px AveriaLibre", "#D7D6EE");
		lvlText.textAlign = "center";
		lvlText.textBaseline = "alphabetic";
		lvlText.x = stats.w/2-10;
		lvlText.y = stats.h/2-600;
		var lvlCheck = p.lvlCheck = false;
		stats.addChild(lvlText);
		
		/* -------------------------------------- */
		var health = new createjs.Text("HEALTH", "32px Raleway", "#DDA4A4");
		health.textAlign = "left";
		health.textBaseline = "alphabetic";
		health.x = stats.x;
		health.y = stats.y-10;
		stats.addChild(health);
		
		var experience = new createjs.Text("EXPERIENCE", "32px Raleway", "#A8A09E");
		experience.textAlign = "left";
		experience.textBaseline = "alphabetic";
		experience.x = stats.x;
		experience.y = stats.y+150;
		stats.addChild(experience);
		
		var hng = new createjs.Text("FOOD", "32px Raleway", "#C4DDA4");
		hng.textAlign = "left";
		hng.textBaseline = "alphabetic";
		hng.x = stats.x;
		hng.y = stats.y+310;
		stats.addChild(hng);
		
		var wtr = new createjs.Text("WATER", "32px Raleway", "#A4D5DD");
		wtr.textAlign = "left";
		wtr.textBaseline = "alphabetic";
		wtr.x = stats.x;
		wtr.y = stats.y+470;
		stats.addChild(wtr);
		
		var friend = new createjs.Text("FRIENDLINESS", "32px Raleway", "#DDD8A4");
		friend.textAlign = "left";
		friend.textBaseline = "alphabetic";
		friend.x = stats.x;
		friend.y = stats.y+630;
		stats.addChild(friend);
		/* -------------------------------------- */
		
		//create stat bars
		var barContainer = new createjs.Container();
		var barW = stats.getBounds().width, barH = 80, gap = 80;
		var statBar = 5, barBacking;
		
		for (var i = 0; i < statBar; i++) {
			barBacking = new zim.Rectangle(barW, barH, "#D7D6EE");
			barBacking.x = 0;
			barBacking.y = i * (barH + gap);
			barContainer.addChild(barBacking);
			stats.addChild(barContainer);
		}
		
		var hp = p.hp =  new zim.Rectangle(barW, barH, "#ED406E");
		hp.scaleX = 1;
		hp.x = 0;
		hp.y = 0;
		stats.addChild(hp);

		var exp = p.exp =  new zim.Rectangle(barW, barH, "#8C8C8C");
		exp.scaleX = 0;
		exp.x = 0;
		exp.y = barH + gap;
		stats.addChild(exp);			
		
		var hungerStat = p.hungerStat =  new zim.Rectangle(barW, barH, "#B5ED00");
		hungerStat.scaleX = 1;
		hungerStat.x = 0;
		hungerStat.y =(barH + gap) * 2;
		stats.addChild(hungerStat);
		
		var waterStat = p.waterStat =  new zim.Rectangle(barW, barH, "#00BDED");
		waterStat.scaleX = 1;
		waterStat.x = 0;
		waterStat.y = (barH + gap) * 3;
		stats.addChild(waterStat);
		
		var friendliness = p.friendliness = new zim.Rectangle(barW, barH, "#EDC500");
		friendliness.scaleX = 0;
		friendliness.x = 0;
		friendliness.y = (barH + gap) * 4;
		stats.addChild(friendliness);
		
		//reset button stuff
		var resetContainer = new createjs.Container();
		resetContainer.setBounds(0, 0, 1024, 768);
		resetContainer.w = stats.getBounds().width;
		resetContainer.h = stats.getBounds().height;
		stats.addChild(resetContainer);
		
		var resetButton = p.resetButton = new zim.Rectangle(barW, 150, "#D7D6EE", null, null, 10);
		resetButton.x = 0;
		resetButton.y = resetContainer.h/2+340;
		resetContainer.addChild(resetButton);
		
		var resetText = new createjs.Text("RESET", "72px AveriaLibre", "#AA586E");
		resetText.textAlign = "center";
		resetText.textBaseline = "alphabetic";
		resetText.x = resetButton.x+380;
		resetText.y = resetButton.y+100;
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
		content.setBounds(0, 0, 768, 1024);
		content.w = content.getBounds().width;
		content.h = content.getBounds().height;
		p.explore.addChild(content);
		
		var trainingText = p.trainingText = new createjs.Text("TRAINING\nIN PROGRESS", "60px AveriaLibre", "#D7D6EE");
		trainingText.textAlign = "center";
		trainingText.textBaseline = "alphabetic";
		trainingText.x = content.w/2;
		trainingText.y = content.h/2-160;
		content.addChild(trainingText);
		
		var trainingIconBG =  new zim.Rectangle(200, 200, "#ED406E");
		trainingIconBG.x = content.w/2-100;
		trainingIconBG.y = content.h/2-20;
		content.addChildAt(trainingIconBG, 0);
		var trainingIcon = new createjs.Bitmap(preload.getResult("swords"));
		trainingIcon.scaleX = trainingIcon.scaleY = 0.4;
		trainingIcon.x = trainingIconBG.x+10;
		trainingIcon.y = trainingIconBG.y;
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