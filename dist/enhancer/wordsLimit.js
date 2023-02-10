/*var wordLen = 300,
		len; // Maximum word length
$('#essayInput').keypress(function(event) {	
	len = $('#essayInput').val().split(/[\s]+/);
	if (len.length > wordLen) { 
		if ( event.keyCode == 46 || event.keyCode == 8 ) {// Allow backspace and delete buttons
    } else if (event.keyCode < 48 || event.keyCode > 57 ) {//all other buttons
    	event.preventDefault();
    }
	}
	console.log(len.length + " words are typed out of an available " + wordLen);
	wordsLeft = (wordLen) - len.length;
	if(wordsLeft <= 0) {
        $('.words-left').html( len.length + '/300 words');
		$('.words-left').css({
			'background':'red'
		}).prepend('<i class="fa fa-exclamation-triangle"></i>');
	} else {
        $('.words-left').html( len.length + '/300 words');
		$('.words-left').css({
			'background':'none'
		})    }
});
*/
var countTarget = document.querySelector("#essayInput");
var wordCount = document.querySelector("#words-left");

var count = function () {  
	var characters = countTarget.value;

	var words = characters.split(/[\n\r\s]+/g).filter(function (word) {
	  return word.length > 0;
	});
  
	wordCount.innerHTML = words.length;
  };
  
  count();
  
  window.addEventListener(
	"input",
	function (event) {
	  if (event.target.matches("#essayInput")) {
		count();
	  }
	},
	false
  );