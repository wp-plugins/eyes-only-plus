//Create Quicktag button
edButtons.splice(2, 0, new edButton('rdct_inturl', 'redact', '[redact]', '[/redact]', ''));


//Override click event
jQuery(document).ready(function(){
	
	quicktagAction('rdct_inturl', function(qtEl, qtIndex) {
		var bObj = edButtons[qtIndex];
		eval(qtEl.clickDefault);
	});
});

function quicktagAction(qtId, action) {
	//Get quicktag button
    var elSel = '#' + qtId;
    var el = jQuery(elSel);
    
    //Get original click event handler
    var reFunc = /^.+?{(.*?)}$/i;
    var func = el.get(0).onclick.toSource().match(reFunc);
    func = (func.length > 1) ? func[1] : '';
    
    //Clear default event handler
    el.get(0)['clickDefault'] = func;
	el.get(0)['actionFunc'] = action;
    el.get(0).onclick = null;
    //Set new click event handler
    el.click(function(){
        var attrIndex = "buttonIndex";
        var buttonEl = jQuery(this).get(0);

        //Check if index was previously determined
        if (!(attrIndex in buttonEl)) {
            //Determine button index
            var reIndex = /^.+?(\d+?)\);$/i;
            var buttonIndex = buttonEl.clickDefault.match(reIndex);
            if (!buttonIndex || buttonIndex.length < 2) {
                return false;
            }
            
            buttonIndex = parseInt(buttonIndex[1]);
            if (isNaN(buttonIndex) || edButtons.length < buttonIndex) 
                return false;
            buttonEl[attrIndex] = buttonIndex;
        }
        
        //Get button object
        buttonIndex = buttonEl[attrIndex];
        
        //Set values/interaction
        buttonEl.actionFunc(buttonEl, buttonIndex);
    });
}