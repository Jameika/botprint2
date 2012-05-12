function SVG2Shape() {}

SVG2Shape.prototype.convert = function(elem) {
	var shape;
	switch(elem.type) {
		case 'path': shape = this.fromPath(elem); break;
		case 'rect': shape = this.fromRect(elem); break;
		case 'circle': shape = this.fromCircle(elem); break;
		case 'ellipse': shape = this.fromEllipse(elem); break;
	}
	// save transforms to be replayed later at Chassis.js
	shape.transforms = elem.transform();
	return shape;
};

SVG2Shape.prototype.fromPath = function(elem) {
	var path  = elem.attrs.path;
	var shape = new THREE.Shape();
	var start = new THREE.Vector2();

	// used to remove duplicate actions
	var existingActions = {};

	for(var i = 0; i < path.length; i++)
	{
		var action = path[i];
		if(!existingActions[action]){
			existingActions[action] = true;
			switch(action[0]){
				case 'M':
				case 'm':
					shape.moveTo(action[1], action[2]);
					start.set(action[1], action[2]);
					break;
				case 'L':
				case 'l':
					shape.lineTo(action[1], action[2]);
					break;
				case 'Z':
				case 'z':
					shape.lineTo(start.x, start.y);
					break;
			}

		}
	}

	return shape;
};

SVG2Shape.prototype.fromRect = function(elem) {
	var shape = new THREE.Shape();
	var attrs = elem.attrs;
	shape.moveTo(attrs.x, attrs.y);
	shape.lineTo(attrs.x + attrs.width, attrs.y);
	shape.lineTo(attrs.x + attrs.width, attrs.y + attrs.height);
	shape.lineTo(attrs.x, attrs.y + attrs.height);
	shape.lineTo(attrs.x, attrs.y);
	
	return shape;
};

SVG2Shape.prototype.fromCircle = function(elem) {
	var shape = new THREE.Shape();
	var attrs = elem.attrs;
	var circleRadius = attrs.r;
	shape.moveTo( 0, circleRadius );
	shape.quadraticCurveTo( circleRadius, circleRadius, circleRadius, 0 );
	shape.quadraticCurveTo( circleRadius, -circleRadius, 0, -circleRadius );
	shape.quadraticCurveTo( -circleRadius, -circleRadius, -circleRadius, 0 );
	shape.quadraticCurveTo( -circleRadius, circleRadius, 0, circleRadius );
	return shape;
};

SVG2Shape.prototype.fromEllipse = function(elem) {
	var shape = new THREE.Shape();
	var attrs = elem.attrs;
	var cx = attrs.cx, cy = attrs.cy, rx = attrs.rx, ry = attrs.ry;

	shape.absellipse(cx, cy, rx, ry, 0, 2*Math.PI);	
	return shape;
};
