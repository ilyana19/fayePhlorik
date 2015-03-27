zog("hi from view.js");

var app = function(app) {
	app.makeVerticalPages = function(layoutManager, gridManager, guideManager) {
		p = {};
		
		p.main = new createjs.Container();
		p.main.name = "main";
		p.main.setBounds(0, 0, stageW, stageH);
		
		var content = p.main.content = new createjs.Container();
		content.setBounds(0, 0, 600, 600);
		p.main.addChild(content);
		
		var room = p.room = new createjs.Container();
		room.w = content.getBounds().width;
		room.h = content.getBounds().height;
		content.addChild(room);
		
		var backing = new zim.Rectangle(room.w, room.h, "black");
		backing.alpha = 0.2;
		room.addChild(backing); 
		
		var chara = p.chara = new zim.Rectangle(100, 100, "black");
		chara.x = room.w/2-45;
		chara.y = room.h/2-75;
		chara.setBounds(0, 0, 100, 100);
		room.addChild(chara);
		
		//button container for: food, water, train
		var buttonW = 400, buttonH = 400;
		var buttons = p.buttons = new createjs.Container();
		buttons.setBounds(0, 0, 1200, 350);
		p.main.addChild(buttons);
		
		var food = p.food = new zim.Rectangle(buttonW, buttonH, "green");
		food.x = buttons.getBounds().x;
		food.y = buttons.getBounds().y;
		food.setBounds(0, 0, buttonW, buttonH);
		buttons.addChild(food);
		
		var water = p.water = new zim.Rectangle(buttonW, buttonH, "blue");
		water.x = buttons.getBounds().x + buttonW;
		water.y = buttons.getBounds().y;
		water.setBounds(0, 0, buttonW, buttonH);
		buttons.addChild(water);
		
		var training = p.training = new zim.Rectangle(buttonW, buttonH, "red");
		training.x = buttons.getBounds().x + buttonW * 2;
		training.y = buttons.getBounds().y;
		training.setBounds(0, 0, buttonW, buttonH);
		buttons.addChild(training);
		
		//gridManager.add(new zim.Grid(content));
		//guideManager.add(new zim.Guide(__, false));
		
		//percentages
		var mainParts = [
			{object: content, marginTop: 0, maxWidth: stageW, backgroundColor: "beige"}, // note, middle gets no minHeight
			{object: buttons, marginTop: 0, maxWidth: stageW, height: 20, valign: "bottom", backgroundColor: "orange"}
		];
		
		//function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)
		var mainLayout = new zim.Layout(p.main, mainParts, 0, "black", true, null, stage);
		layoutManager.add(mainLayout); //add main page to the layout manager
		
		p.status = new createjs.Container();
		p.status.name = "status";
		
		/*var statusBacking = new zim.Rectangle(stageW, stageH, "#aee");
		statusBacking.setBounds(0, 0, stageW, stageH);
		p.status.addChild(statusBacking);*/
		
		var stats = new createjs.Container();
		stats.setBounds(0, 0, 600, 1000);
		p.status.addChild(stats);
		
		//create stat bars
		var barContainer = new createjs.Container();
		var w = stats.getBounds().width, h = 60, gap = 30;
		var statBar = 5, barBacking;
		
		for (var i = 0; i < statBar; i++) {
			barBacking = new zim.Rectangle(w, h, "gray");
			barBacking.x = 0;
			barBacking.y = i * (h + gap);
			barContainer.addChild(barBacking);
			stats.addChild(barContainer);
		}
		
		var hp = p.hp =  new zim.Rectangle(w, h, "red");
		hp.scaleX = 1;
		hp.x = 0;
		hp.y = 0;
		stats.addChild(hp);		
		
		var hungerStat = p.hungerStat =  new zim.Rectangle(w, h, "green");
		hungerStat.scaleX = 1;
		hungerStat.x = 0;
		hungerStat.y = h + gap;
		stats.addChild(hungerStat);
		
		var waterStat = p.waterStat =  new zim.Rectangle(w, h, "blue");
		waterStat.scaleX = 1;
		waterStat.x = 0;
		waterStat.y = (h + gap) * 2;
		stats.addChild(waterStat);
		
		var friendliness = p.friendliness = new zim.Rectangle(w, h, "yellow");
		friendliness.scaleX = 0;
		friendliness.x = 0;
		friendliness.y = (h + gap) * 3;
		stats.addChild(friendliness);
		
		var statusParts = [
			{object: stats, marginTop: 20, maxWidth: 90, valign: "middle"}
		];
		
		//function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)
		var statusLayout = new zim.Layout(p.status, statusParts, 0, "#aee", true, null, stage);
		layoutManager.add(statusLayout); //add status page to the layout manager
		
		return p;
	}
	
	return app;
} (app || {});