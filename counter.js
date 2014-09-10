/**
 * Coundown timer
 */
var RF_Counter = function(options){

	var that = this;

	//Extend options
	this.options = $.extend({
		seconds: 2,
		updateCallback: null,
		endCallback: null
	}, options);

	this.timer = null;
	this.mins  = this.options.seconds / 60;
	this.secs  = this.options.seconds;

	this.countdown = function() {
		this.timer = setInterval(function(){
			that.decrement();
		}, 1000);
	};

	this.decrement = function() {

		//Set minutes/seconds
		this.minutes = that.getminutes();
		this.seconds = that.getseconds();

		//If update callback is set call it
		if(that.options.updateCallback !== null){
			that.options.updateCallback(this.minutes, this.seconds);
		}

		//Display end on 00:01
		if(parseFloat(that.seconds) <= 1 && parseFloat(that.minutes) < 1){

			that.seconds = '00';
			
			//If end callback is set call it
			if(that.options.endCallback !== null){
				that.options.endCallback(true);
			}

			//Remove timer 
			that.resetTimer();

			return;
		}else{
			that.secs--;
		}
	};

	this.getminutes = function() {

		// minutes is seconds divided by 60, rounded down
		this.mins = Math.floor(that.secs / 60);
		
		var min = this.checkLength(that.mins);

		return min;
	};

	this.getseconds = function() {

		var min = this.secs - this.mins *60,
			sec = Math.round(min);

		// take mins remaining (as seconds) away from total seconds remaining
		return this.checkLength(sec);
	};

	//Add 0's to numbers under 10 e.g. 9 - 09
	this.checkLength = function(num){

		num = num.toString();

		var day_length = num.length;

		if(day_length == 1){
			num = '0'+num;
		}

		return num;	
	};

	//Stop timer and reset timer values
	this.resetTimer = function(){

		//Remove timer 
		clearTimeout(that.timer);
		
		that.secs    = that.options.seconds;
		
		that.minutes = null;
		that.seconds = null;
	};

	return this.countdown();
};