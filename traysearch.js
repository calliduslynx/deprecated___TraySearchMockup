$( function(){
	// set min height for main 
	$("#main").css("minHeight", 
			$("#infoPanel").height() 
			+ $("#locPanel").height() 
			+ $("#filterPanel").height() 
			+ 59);
	$("#main").css("minWidth", "700px");
	
	// create dump data
	for(var i=0; i<100; i++){
		var str = '<div class="togglePanel">'
			+ '<h2>Gyn ' + i + '</h2>'
			+ '<div class="list collapsed">';
		var nrOfTrays = 1 + parseInt( Math.random() * 10 );
		for(var j=0; j<nrOfTrays; j++){
			str += '<div>1-' + i + '-00' + j + '</div>';
		}
		str += '</div></div>';
		
		$("#itemField").append( str	);
	}

	// set listener for filter field
	$("#filterField").keyup( function(e){ 
		filterItems( e.target.value );
	} );	
	
	// add listener for button selection 
	$("#locPanel .button").click( function(e){
		$("#locPanel .button").removeClass("buttonSelected");
		$(e.currentTarget).addClass("buttonSelected");
	});
	
	$("#expandAllItems").click( function(){
		$("#itemField .collapsed").removeClass("collapsed");
		setPositionOfItems();
	});

	$("#collapseAllItems").click( function(){
		$("#itemField .list").addClass("collapsed");
		setPositionOfItems();
	});
	
	
	setPositionOfItems();
} );

function filterItems( filterValue ){
	$("#itemField .togglePanel").each( function(i,tkg){
		var nameInTitle = $(tkg).children("h2").html().contains( filterValue );
		x = tkg;
		var anyChild = false;
		$(tkg).children(".list").children("div").each( function(i,item){
			if( nameInTitle || $(item).html().contains( filterValue )) {
				$(item).show();
				anyChild = true;
			}else{
				$(item).hide();
			}
		});
		
		if(nameInTitle || anyChild)	$(tkg).show()
		else						$(tkg).hide();
	} );
	
	setPositionOfItems();
}

function setPositionOfItems(){
	var padding = 5;
	var paddingBottom = 20;
	var width = 160;
	var totalHeight = $("#itemField").height();
	
	var currentHeight = padding;
	var currentWidth = 0;
	
	$("#itemField .togglePanel").each( function(i,item){
		if($(item).is(":visible")){
			var itemHeight = $(item).height();
			if( currentHeight + itemHeight + padding + paddingBottom > totalHeight){
				currentHeight = padding;
				currentWidth += width;
			}
			// console.log("set " + item + " to " + currentWidth + " x " + currentHeight);
			$(item).css("left", currentWidth + "px");
			$(item).css("top", currentHeight + "px");
			
			currentHeight += itemHeight + padding;
		}
	} );
}