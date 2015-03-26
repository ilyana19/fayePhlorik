zog("hi from view.js");

var app = function(app) {
	app.makeVerticalPages = function(layoutManager, gridManager, guideManager) {
		p = {};
		
		p.main = new createjs.Container();
		p.main.name = "main";
		p.main.setBounds(0, 0, stageW, stageH);
		
		/*var logo = p.logo = new zim.Rectangle(100, 100, "orange");
		logo.setBounds(0, 0, 100, 100);
		p.main.addChild(logo);*/
		
		var content = p.main.content = new createjs.Container();
		content.setBounds(0, 0, 600, 600);
		p.main.addChild(content);
		
		/*var thing = p.mainThing = new zim.Rectangle(200, 200, "red");
		thing.x = 100;
		thing.y = 100;
		content.addChild(thing);*/
		
		//action container for: food, water, train
		var buttonW = 400, buttonH = 600;
		
		var actions = p.main.actions = new createjs.Container();
		actions.setBounds(0, 0, 1200, 350);
		p.main.addChild(actions);
		
		var food = p.food = new zim.Rectangle(buttonW, buttonH, "green");
		food.x = 0;
		food.y = 0;
		actions.addChild(food);
		
		var water = p.water = new zim.Rectangle(buttonW, buttonH, "blue");
		water.x = buttonW;
		water.y = 0;
		actions.addChild(water);
		
		var training = p.training = new zim.Rectangle(buttonW, buttonH, "red");
		training.x = buttonW * 2;
		training.y = 0;
		actions.addChild(training);
		
		//gridManager.add(new zim.Grid(actions));
		//guideManager.add(new zim.Guide(actions, false));
		
		//percentages
		var mainParts = [
			{object: content, marginTop: 0, maxWidth: stageW, backgroundColor: "beige"}, // note, middle gets no minHeight
			{object: actions, marginTop: 0, maxWidth: stageW, height: 20, valign: "bottom", backgroundColor: "orange"}
		];
		
		//function(holder, regions, lastMargin, backgroundColor, vertical, regionShape, scalingObject, hideKey)
		var mainLayout = new zim.Layout(p.main, mainParts, 0, "black", true, null, stage);
		
		layoutManager.add(mainLayout); //add main page to the layout manager
		
		p.status = new createjs.Container();
		p.status.name = "status";
		
		var statusBacking = new zim.Rectangle(stageW, stageH, "yellow");
		statusBacking.setBounds(0, 0, stageW, stageH);
		p.status.addChild(statusBacking);
		
		return p;
	}
	
	return app;
} (app || {});