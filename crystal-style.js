$( function(){
	// action for toggle panels 
	$(".togglePanel h2").click( function(e){
		$div = $(e.currentTarget.parentNode.querySelector("div"));

		$div.toggleClass( "collapsed" );
		setPositionOfItems(); // wrong at this position
	});
});