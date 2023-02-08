var wordLen = 300,
		len; // Maximum word length
$('#essayInput').keydown(function(event) {	
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
        $('.words-left').html( len.length + '/500 words');
		$('.words-left').css({
			'background':'red'
		}).prepend('<i class="fa fa-exclamation-triangle"></i>');
	} else {
        $('.words-left').html( len.length + '/500 words');
		$('.words-left').css({
			'background':'none'
		})    }
});