/** ********************************************** **
	Your Custom Javascript File
	Put here all your custom functions
*************************************************** **/



/** Remove Panel
	Function called by main.js on panel Close (remove)
 ************************************************** **/
	function _closePanel(panel_id) {
		/** 
			EXAMPLE - LOCAL STORAGE PANEL REMOVE|UNREMOVE

			// SET PANEL HIDDEN
			localStorage.setItem(panel_id, 'closed');
			
			// SET PANEL VISIBLE
			localStorage.removeItem(panel_id);
		**/
        function nextpage(id_button){
            $('button[aria-controls="step'+id_button+'"]').click();
        }
	}


