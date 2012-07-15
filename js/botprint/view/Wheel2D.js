/**
 * 2D representation of a wheel
 * 
 * @author Zhongpeng Lin
 */
function Wheel2D(svg, options) {
	
	var self = {
		svg: svg,
		
		getPosition: function() {
			return {x: svg.attrs.x, y: svg.attrs.y};
		},
		
		setPosition: function(x, y) {
			svg.attr({x: x, y: y});
		},
		
		highlight: function() {
			svg.attr({stroke: '#F8F8F8'});			
		},
		
		lowlight: function() {
			svg.attr({stroke: null});
		}
	};
	
	$.extend(self, View(options));
	return self;
}