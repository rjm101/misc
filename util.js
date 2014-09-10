/** 
 * Service for common/generic functions
 */
var RF_util = function() {

	//Add 0 to 01 to date
	this.checkLength = function(dateNum){

		dateNum = dateNum.toString();

		var day_length = dateNum.length;

		if(day_length == 1){
			dateNum = '0'+dateNum;
		}

		return dateNum;	
	};

	//count number of words in string and return number
	this.wordCount = function(str){

		if(str){

			// lets loop through the string and count the words
			var counter = str.split(/\s+/).length;

			return counter;
		}
	};

	//Return price in apropriate decimal format for price e.g. 37.7 to 37.70
	this.convertPrice = function(n){
	
		if(n){
			n = parseFloat(n);

			return n.toFixed(2);
		}
	};

	//Convert object to JSON String 
	this.convertStringToObject = function(stringObj){

		var convert_to_object = JSON.parse(stringObj);
		return convert_to_object;
	};

	//Convert string to object
	this.convertObjectToString = function(obj){

		var object_to_string = JSON.stringify(obj);
		return object_to_string;
	};

	//get parameter value from url 
	this.getUrlParam = function(url_param){
		return decodeURIComponent((RegExp(url_param + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
	};

	//Encode string for url
	this.encodeString = function(url_param){
		return encodeURIComponent(url_param);
	};

	//Converts url encoded JSON string string to object
	this.convertJSONURIString = function(url_param){
		var url_path = this.getUrlParam(url_param);

		return this.convertStringToObject(url_path);
	};

	//ReplaceAll method in string
	this.replaceAll = function(item, character_to_replace, replaced_string, ignore){
		
		return item.replace(new RegExp(character_to_replace.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(replaced_string)=="string")?replaced_string.replace(/\$/g,"$$$$"):replaced_string);
	};

	//Escape user input string for regex parsing
	this.escape= function(input) {
		return input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	};

	//Encode url but retain some characters
	this.rawUrlEncode = function(str){

		str = (str + '').toString();

		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
				replace(/\)/g, '%29').replace(/\*/g, '%2A');
	};

	//Convert JSON Object to uri encoded string
	this.convertJSONObjecttoURIString = function(url_path){

		var obj = this.convertObjectToString(url_path);

		return this.encodeString(obj);
	};
};