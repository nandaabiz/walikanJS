var Walikan = function(options) {
	this.options = $.extend({
		textSource: '',
		textAreaSourceId: 'sumber',
		textAreaResultId: 'hasil',
		returnResult: 'false'
	}, options);
	
	this.walikTable = {
		"h":"p",
		"n":"dh",
		"c":"j",
		"r":"y",
		"k":"ny",
		"d":"m",
		"t":"g",
		"s":"b",
		"w":"th",
		"l":"ng",
		"p":"h",
		"dh":"n",
		"j":"c",
		"y":"r",
		"ny":"k",
		"m":"d",
		"g":"t",
		"b":"s",
		"th":"w",
		"ng":"l"
	};
	this.isLower = true;
};

Walikan.prototype = {
	doWalik:function(){
		var sourceText = '';
		var textAreaSource = $('textarea#'+this.options.textAreaSourceId).val();
		if (textAreaSource != '') {
			sourceText = textAreaSource;
		};
		var last = sourceText.length - 1;
		var result = new Array(sourceText.length);
		for (var i = last; i >= 0; i--) {
			var lastChar = sourceText.charAt(i) ? sourceText.charAt(i) : "";
			var beforeLastChar = sourceText.charAt(i-1) ? sourceText.charAt(i-1) : "";
			var isUpper = false;
			
			if ((lastChar.toLowerCase() == "h" && jQuery.inArray(beforeLastChar,["d","t"]) >= 0) 
			    || (beforeLastChar.toLowerCase() == "n" && jQuery.inArray(lastChar,["y","g"]) >= 0)) {
				if (beforeLastChar.toUpperCase() == beforeLastChar && beforeLastChar.length > 0) {
					isUpper = true;
				};
				var ch = beforeLastChar.toLowerCase()+lastChar.toLowerCase();
				i--;
			}
			else if(jQuery.inArray(lastChar.toLowerCase(),["a","e","i","o","u"]) >=0 
			        && (jQuery.inArray(beforeLastChar.toLowerCase(),["a","e","i","o","u"]) >= 0 || beforeLastChar.length <= 0)) {
				var ch = 'p';
				if (lastChar.toUpperCase() == lastChar && lastChar.length > 0) {
					isUpper = true;
					ch = ch.toUpperCase();
				};
				ch = ch+lastChar.toLowerCase();
			}
			else {
				if (lastChar.toUpperCase() == lastChar && lastChar.length > 0) {
					isUpper = true;
				};
				var ch = lastChar.toLowerCase();
			};
			
			var rs = this.walikTable[ch];
			if (rs && isUpper) {
				if (rs.length == 2) {
					rs = rs.charAt(0).toUpperCase() + rs.charAt(1).toLowerCase();
				}
				else {
					rs = rs.toUpperCase();
				};
			};
			result[i] = rs ? rs : ch;
		};
		resultText = result.join("");
		$('textarea#'+this.options.textAreaResultId).val(resultText);
		if (this.options.returnResult == 'true') {
			return resultText;
		};
	}
};