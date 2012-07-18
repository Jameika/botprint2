function Chassis2D(svg, options) {
	var self = {
		elem: svg,
		setColor: function(color) {
			svg.attr({fill: color});
		},
		
		getColor: function(color) {
			return svg.attrs.fill;
		},
		
		select: function() {
			var editingHandler = EditingHandler(this, {app: options.app});
			editingHandler.enable();
			this.editingHandler = editingHandler;
			this.selected = true;
		},
		
		deselect: function() {
			if(this.editingHandler) {
				this.editingHandler.disable();
			}
			this.selected = false;
		}
	};
	
	Mixable(self).mix(View());
	
	var selectionHandler = SelectionHandler(Selectable(self), {app: options.app});
	selectionHandler.enable();
	self.trigger(UserEvents.click);
	
	return self;
}