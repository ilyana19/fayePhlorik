var peach = function(peach) {
	/*
		returns a random number between and including a and b
		b is optional and if left out will default to 0
		integer is a boolean and defaults to true
		if a and b are 0 then just returns Math.random()
	*/
	peach.rand = function(a, b, integer) { 
		if (not(integer)) integer = true;
		if (not(b)) b = 0;
		if (not(a)) a = 0;
		if (a>b) {a++;} else if (b>a) {b++;}
		var r;
		if (a == 0 && b == 0) {
			return Math.random();
		} else if (b == 0) {
			r = Math.random()*a;
		} else {
			r = Math.min(a,b) + Math.random()*(Math.max(a,b)-Math.min(a,b));
		}	
		if (integer) {
			return Math.floor(r);			
		} else {
			return r;
		}
	}
	
	//"not" function, "thing" doesn't exists
	var not = function(v) {
		if (v === null || typeof v === "undefined") return true;
	}
	
	/* 
		Timer Class
		- duration: milliseconds, default is 2sec
		- type: "timeout" or "interval", default is timeout
	*/
	peach.Timer = function(duration, type) {
		//checking for defaults
		if (not(duration)) duration = 2000;
		if (not(type)) type = "timeout";
		
		var that = this;
		this.id = null; //temp variable
		this.handler; //callback function, which user has to create
		this.duration = duration; //able to change duration of same timer in main code
		this.repeat = 0; //looping timer, manually set a max
		
		this.start = function() {
			if (type === "timeout") {
				that.id = setTimeout(function() {
					that.handler();
				}, that.duration);
			} else {
				that.id = setInterval(function() {
					that.repeat++;
					that.handler();
				}, that.duration);
			}
		}
		
		this.stop = function() { //stops and removes timer
			if (type === "timeout") clearTimeout(that.id);
			else clearInterval(that.id);
		}
	}
	
	return peach;
}(peach || {});