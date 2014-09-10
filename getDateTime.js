/** 
 * Object for generic date time operations
 */
var RF_getDateTime = function() {

	//Months
	this.monthNames      = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	this.shortMonthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	

	//Return current date time
	this.getCurrentDateTime = function(){

		var currentTime = new Date(),
			hours = currentTime.getHours(),
			minutes = currentTime.getMinutes();

		if (minutes < 10){
			minutes = "0" + minutes;
		}

		var month = currentTime.getMonth() + 1,
			day = currentTime.getDate(),
			year = currentTime.getFullYear(),
			dateTime = hours+":"+minutes+" "+month+"/" + day + "/" + year;

		return dateTime;
	};

	/* Converts date number to date format
	 * @param date {String} e.g. 23 May 2013
	 */
	this.convertDate = function(dateNum){

		var date = new Date(dateNum),
			m = date.getMonth(),
			d = date.getDate(),
			y = date.getFullYear('YYYY'),
			short_month = this.getShortMonthName(m);

		//return date
		return d +" "+short_month+" "+y;
	};

	/* Get date set number of days ahead e.g. 14, 15 For 2 weeks ahead 1 day
	 * @param startDay {Int} 
	 * @param endDay {Int} 
	 */ 
	this.getDateAhead = function(startDay, endDay){

		var firstDay    = new Date(),
			checkinDay  = new Date(firstDay.getTime() + startDay * 24 * 60 * 60 * 1000),
			checkoutDay = new Date(firstDay.getTime() + endDay * 24 * 60 * 60 * 1000);

		return [checkinDay, checkoutDay];
	};

	/* Get number of days between two dates
	 * @param startDate {Object} date object
	 * @param endDate {Object} date object
	 */
	this.getDays = function(startDate, endDate){

		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

		return Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(oneDay)));
	};

	/* Get days through date objects
	 * @param startDate {Object} date object
	 * @param endDate {Object} date object
	 */
	this.getDaysFromDateObject = function(startDate, endDate){

		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds

		return Math.round(Math.abs((startDate - endDate)/(oneDay)));
	};

	/* Converts 2013-07-30 string into date integer eg: Sun Sep 01 2013 00:00:00 GMT+0100 (BST)
	 * @param date_string {String} 
	 */
	this.convertDateToString = function(date_string){

		var date_array = date_string.split("-");

		//Work out number of days between check in and check out date
		var dateInt = new Date(date_array[0], date_array[1]-1, date_array[2]);

		return dateInt;
	};

	/* Get next day from set date
	 * @param getNextDay {Object} date object
	 * @param added_num_of_days {Int} days ahead
	 */
	this.getNextDay = function(current_date, added_num_of_days){

		var new_date = new Date(current_date.getTime() + added_num_of_days * 24 * 60 * 60 * 1000);

		return new_date;
	};

	/* Return month name from month number
	 * @param num {Int} index of month
	 */
	this.getMonthName = function(num){
		return this.monthNames[num];
	};

	/* Get short hand month name
	 * @param num {Int} index of month
	 */
	this.getShortMonthName = function(num){

		return this.shortMonthNames[num];
	};

	//Get current year as format: 2013
	this.getCurrentYear = function(){
		var date = new Date(),
			y = date.getFullYear('YYYY');

		return y;
	};

	/* Convert date object to formatted date using date object
	 * @param date_string {Object} date object 
	 * @param date_format {String} e.g. 'dd/MM/YY'
	 */
	this.convertToDateFormat = function(date_string, date_format){

		//Find out how the date is split
		var input_date        = '',
			date_format_array = [],
			slash             = date_format.split("/"),
			dot               = date_format.split("."),
			dash              = date_format.split("-");

		date_format_array.push(slash, dot, dash);
		
		var divider = ['/', '.', '-'],
			
			accepted_date = null,
			key,
			key1;

		for(key in date_format_array){
			//If array is more than one then date has been split and is thus the correct format
			if(date_format_array[key].length > 1){
				accepted_date = date_format_array[key];

				var format_array = [];

				for(key1 in date_format_array[key]){

					var date_digit = date_format_array[key][key1],
						date_obj   = new Date(date_string),
						date_item  = date_digit.toUpperCase();

					if($.inArray("y", date_digit) !== -1 || $.inArray("Y", date_digit) !== -1 ){

						var year = date_obj.getFullYear(date_item);

						//If year pattern is short return short year pattern e.g. YY - 13
						if(date_item.length == 2){
							year = year.toString().substr(2,2);
						}

						format_array.push(year);
					}else if($.inArray("m", date_digit) !== -1 || $.inArray("M", date_digit) !== -1 ){

						var month = date_obj.getMonth(date_item) + 1;
						
						if (month < 10) {
							month = '0'+month;
						}

						format_array.push(month);
					}else if($.inArray("d", date_digit) !== -1 || $.inArray("D", date_digit) !== -1 ){
						
						var day = date_obj.getDate(date_item);

						if (day < 10) {
							day = '0'+day;
						}
						format_array.push(day);
					}
				}

				input_date = format_array.join(divider[key]);
			}
		}

		return input_date;
	};

	/* Calculate time remaining from the date/time of the carsolize call made and the current date/time
	 * Num: number of minutes
	 * @param timestamp {Int} date timestamp
	 * @param num {Int} 
	 */
	this.calculateTimeRemaining = function(timestamp_in_past, num){

		var currentDate = new Date(),
			availabilityCallDate = new Date(timestamp_in_past),
			time_to_subtract = (currentDate.getTime() - availabilityCallDate.getTime())/1000,
			time_remaining = (num * 60) - time_to_subtract;

		return time_remaining;
	};

	/* Add minutes to current date object
	 * @param date {Object}
	 * @param minutes {Int} number to add minutes
	 */
	this.getMinutesAhead = function(date, minutes){
		
		return new Date(date.getTime() + minutes*60000);
	};
	};