(function() {
	tinymce.create('tinymce.plugins.RMFtooltip', {
		init : function(ed, url) {
			var ttip_btn = null;
			var dlg = null;
			
			ttip_btn = jQuery("[aria-label='ToolTip']");

			ed.addButton('RMFtooltip', {
				title : 'ToolTip',
				image : url+'/RMFtooltipbutton.png',
				onclick : function() {					
					i = jQuery('<div title="Create your tooltip" ></div>');
					if (window.RMFtooltip_cache) {
						i.html(window.RMFtooltip_cache);
					} else {
						jQuery.get(url+'/ajax/form.html', function(data) {
							window.RMFtooltip_cache = data;
							i.html(window.RMFtooltip_cache);
						});
					}
					// : var sel_node = tinymce.activeEditor.selection.getNode();
					var sel_content = tinymce.activeEditor.selection.getContent({format : 'html'});
					// : 
					// : if(sel_node.innerHTML.contains(sel_content)) {
						// : print("ok")
					// : }

					// Hack for this btn pointer
					ttip_btn = jQuery("[aria-label='ToolTip']");
			
					if(dlg != null) {
						dlg.dialog("destroy");
						dlg.empty();
						dlg = null;
						
						ttip_btn.removeClass('mce-active');
						return;
					} else {
						ttip_btn.addClass('mce-active');
					}
					
					dlg = i.dialog({
						autoOpen: true,
						draggable: false,
						resizable: false,
						position: { my: "left-"+(ttip_btn.width()/2)+" top+"+(ttip_btn.height()/2+2), /*at: "right bottom",*/ of: ttip_btn },
						modal: true,
						dialogClass: 'wp-dialog',
						buttons: {
							"OK": function() {
								// : RMFtooltip_text = jQuery("#RMFtooltip_text").val();
								RMFtooltip_tip = jQuery("#RMFtooltip_tip").val();
								if (RMFtooltip_tip != null && RMFtooltip_tip != ''){
									// : ed.execCommand('mceInsertContent', false, '[tooltip tip="'+RMFtooltip_tip+'"]'+RMFtooltip_text+'[/tooltip]');
									tinymce.activeEditor.selection.setContent('[tooltip tip="'+RMFtooltip_tip+'"]'+sel_content+'[/tooltip]');
								} else {
									jQuery("#RMFtooltip_tip").focus();
									return;
								}
								jQuery( this ).dialog("close");
								jQuery(this).empty();
								ttip_btn.removeClass('mce-active');
								ed.focus();
							},
							Cancel: function() {
								jQuery( this ).dialog( "destroy" );
								jQuery(this).empty();
								dlg = null;
								
								ttip_btn.removeClass('mce-active');
								ed.focus();
							}
						},
						close: function( event, ui ) {
							window.console.log(event);
						}
					});
				}
			});
			
			ed.onClick.add(function(ed, e) {
				// : window.console.debug('Editor was clicked: ' + e.target.nodeName);

				if(dlg != null) {
					dlg.dialog("destroy");
					dlg.empty();
					dlg = null;
					
					ttip_btn.removeClass('mce-active');
					return;
				}
			});

		},
		createControl : function(n, cm) {
			return null;
		},
		getInfo : function() {
			return {
				longname : "Responsive Mobile-Friendly Tooltip",
				author : 'ItayXD',
				authorurl : 'itayxd.com',
				infourl : 'https://github.com/ItayXD/responsive-tooltip',
				version : "1.0"
			};
		}
	});
	tinymce.PluginManager.add('RMFtooltip', tinymce.plugins.RMFtooltip);
})();
