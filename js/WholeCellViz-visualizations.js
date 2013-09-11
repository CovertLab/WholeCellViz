/***********************
* WholeCellViz visualizations should extend the Visualization class using this template:
*
* var NewVisualization = Visualization2D.extend({
* 	getData: function(md){
* 		this.data = this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'attr_name'});
* 	},
* 	
* 	calcLayout: function(){
* 	},
* 	
* 	drawDynamicObjects: function(t){
* 		this.drawObject({
* 			'strokeStyle': strokeStyle,
* 			'fillStyle': fillStyle,
* 			'data': getDataPoint(this.data, t),
* 			drawFunc: function(self, ctx, data){
* 			},
* 			tipFunc: function(self, data){
* 			},
* 			clickFunc: function(self, data){
* 			},
* 		});
* 	},
* });
*
* Author: Jonathan Karr, jkarr@stanford.edu
* Author: Ruby Lee
* Affiliation: Covert Lab, Department of Bioengineering, Stanford University
* Last updated:9/2/2012
************************/

var CellShapeVisualization = Visualization2D.extend({
	arrowLength: 10,
	arrowWidth: Math.PI / 8,
	membraneColor: '#3d80b3', 
	cellColor: '#C9E7FF',
	textColor: '#666666',
	lineColor: '#666666',
	
	getData: function(md){
		this._super(md);
		
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Geometry', attr_name: 'width_1'}, 'width');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Geometry', attr_name: 'cylindricalLength_1'}, 'cylindricalLength');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Geometry', attr_name: 'pinchedDiameter_1'}, 'pinchedDiameter');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Geometry', attr_name: 'volume_1'}, 'volume');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Summary', attr_name: 'mass_1'}, 'mass');
	},
	
	getDataSuccess: function() {
		if (undefined == this.data.width
		 || undefined == this.data.cylindricalLength
		 || undefined == this.data.pinchedDiameter
		 || undefined == this.data.volume
		 || undefined == this.data.mass
		 )
			return;		
		
		this.data.width = this.data.width.data;
		this.data.cylindricalLength = this.data.cylindricalLength.data;
		this.data.pinchedDiameter = this.data.pinchedDiameter.data;
		this.data.volume = this.data.volume.data;
		this.data.mass = this.data.mass.data;
		
		this.data.width[this.data.width.length-1] = this.data.width[this.data.width.length - 2];
		this.data.cylindricalLength[this.data.cylindricalLength.length-1] = this.data.cylindricalLength[this.data.cylindricalLength.length-2];
		this.data.pinchedDiameter[this.data.pinchedDiameter.length-1] = this.data.pinchedDiameter[this.data.pinchedDiameter.length-2];
			
		this.timeMin = this.data.width[0][0];
		this.timeMax = Math.max(
			this.data.width[this.data.width.length - 1][0],
			this.data.cylindricalLength[this.data.cylindricalLength.length - 1][0],
			this.data.pinchedDiameter[this.data.pinchedDiameter.length - 1][0],
			this.data.volume[this.data.volume.length - 1][0],
			this.data.mass[this.data.mass.length - 1][0]);
			
		this._super();
	},
	
	calcLayout: function(){
		var maxWidth = 0;
		var maxHeight = 0;
		var w, pD, cL;
		for (var t = this.timeMin; t <= this.timeMax; t+= 100){
			w = getDataPoint(this.data.width, t); 
			pD = getDataPoint(this.data.pinchedDiameter, t); 
			cL = getDataPoint(this.data.cylindricalLength, t); 
			
			maxWidth = Math.max(maxWidth, w + cL + (w - pD));
			maxHeight = Math.max(maxHeight, w);
		}
		w = this.data.width[this.data.width.length-1][1]
		pD = this.data.pinchedDiameter[this.data.pinchedDiameter.length-1][1] 
		cL = this.data.cylindricalLength[this.data.cylindricalLength.length-1][1] 
		maxWidth = Math.max(maxWidth, w + cL + (w - pD));
		maxHeight = Math.max(maxHeight, w);
		
		this.scale = Math.min((this.width-4) / maxWidth, (this.height-4) / maxHeight);
	},	

	drawDynamicObjects: function(t){
		var data = {
			width: getDataPoint(this.data.width, t), 
			pinchedDiameter: getDataPoint(this.data.pinchedDiameter, t), 
			cylindricalLength: getDataPoint(this.data.cylindricalLength, t), 
			volume: getDataPoint(this.data.volume, t), 
			mass: getDataPoint(this.data.mass, t), 
			};
		data.septumLength = (data.width - data.pinchedDiameter) / 2;
		
		this.drawCell(data);
		this.drawCellMeasurements(data);
	},
	
	drawCell: function(data){
		this.drawObject({
			'strokeStyle': this.membraneColor,
			'fillStyle': this.cellColor,
			'data': data,
			drawFunc: function(self, ctx, data){
				var W = self.width;
				var H = self.height;
				var w = self.scale * data.width;
				var sL = self.scale * data.septumLength;
				var cL = self.scale * data.cylindricalLength;
				
				ctx.lineWidth = 2;
				
				ctx.moveTo(W / 2 + sL, H / 2 - w / 2);
				
				//right-top cylinder and spherical cap
				ctx.arcTo2(
					W / 2 + sL + cL / 2 + w / 2, H / 2 - w / 2, 
					W / 2 + sL + cL / 2 + w / 2, H / 2, 
					w / 2,
					W / 2 + sL + cL / 2, H / 2 - w / 2, 
					W / 2 + sL + cL / 2 + w / 2, H / 2);
				ctx.arcTo2(
					W / 2 + sL + cL / 2 + w / 2, H / 2 + w / 2, 
					W / 2 + sL + cL / 2, H / 2 + w / 2, 
					w / 2,
					W / 2 + sL + cL / 2 + w / 2, H / 2,
					W / 2 + sL + cL / 2, H / 2 + w / 2);
					
				if (sL > 0){
					//bottom-right cylinder
					ctx.lineTo(W / 2 + sL, H / 2 + w / 2);
					
					//bottom septum
					ctx.arcTo2(
						W / 2, H / 2 + w / 2,
						W / 2, H / 2 + w / 2 - sL,
						sL,
						W / 2 + sL, H / 2 + w / 2,
						W / 2, H / 2 + w / 2 - sL);
					ctx.arcTo2(
						W / 2, H / 2 + w / 2,
						W / 2 - sL, H / 2 + w / 2,
						sL,
						W / 2, H / 2 + w / 2 - sL,
						W / 2 - sL, H / 2 + w / 2);
					
					//bottom-left cylinder
					ctx.lineTo(W / 2 - sL - cL / 2, H / 2 + w / 2);	
				}else{
					//bottom cylinder
					ctx.lineTo(W / 2 - sL - cL / 2, H / 2 + w / 2);	
				}
				
				//left spherical cap
				ctx.arcTo2(
					W / 2 - sL - cL / 2 - w / 2, H / 2 + w / 2,
					W / 2 - sL - cL / 2 - w / 2, H / 2,
					w / 2,
					W / 2 - sL - cL / 2, H / 2 + w / 2,
					W / 2 - sL - cL / 2 - w/2, H / 2);
				ctx.arcTo2(
					W / 2 - sL - cL / 2 - w / 2, H / 2 - w / 2,
					W / 2 - sL - cL / 2, H / 2 - w / 2,
					w / 2,
					W / 2 - sL - cL / 2 - w/2, H / 2,
					W / 2 - sL - cL / 2, H / 2 - w/2);
					
				if (sL > 0){
					//top-left cylinder
					ctx.lineTo(W / 2 - sL, H / 2 - w / 2);
					
					//top septum
					ctx.arcTo2(
						W / 2, H / 2 - w / 2,
						W / 2, H / 2 - w / 2 + sL,
						sL,
						W / 2 - sL, H / 2 - w / 2,
						W / 2, H / 2 - w / 2 + sL);
					ctx.arcTo2(
						W / 2, H / 2 - w / 2,
						W / 2 + sL, H / 2 - w / 2,
						sL,
						W / 2, H / 2 - w / 2 + sL,
						W / 2 + sL, H / 2 - w / 2);
						
					//top-right cylinder
					ctx.moveTo(W / 2 + sL + w / 2, H / 2 - w / 2);
				}
				
				//close path
				ctx.closePath();
			},
		});
	},
	
	drawCellMeasurements: function(data){
		this.drawObject({
			isLabel:false,
			'strokeStyle': this.lineColor,
			'fillStyle': this.lineColor,
			'data': data,
			drawFunc: function(self, ctx, data){
				var W = self.width;
				var H = self.height;
				var w = self.scale * data.width;
				var sL = self.scale * data.septumLength;
				var cL = self.scale * data.cylindricalLength;
				var pD = self.scale * data.pinchedDiameter;
				var x1, x2, x3, x4, labelX;
				
				ctx.lineWidth = 1;
				ctx.font = self.bigFontSize + "px " + self.fontFamily;
				
				//height
				txt = Math.round(data.width * 1e9) + ' nm';
				var showHeight = - sL - cL / 2 + self.bigFontSize / 2 < - ctx.measureText(txt).width / 2 - 4;
				if (showHeight){
					ctx.arrowTo(
						W / 2 - sL - cL / 2, H / 2 + (ctx.measureText(txt).width/2 + 4),
						W / 2 - sL - cL / 2, H / 2 + (w / 2 - 4),
						0, 1, self.arrowWidth, self.arrowLength, 2);
					ctx.arrowTo(
						W / 2 - sL - cL / 2, H / 2 - (ctx.measureText(txt).width/2 + 4),
						W / 2 - sL - cL / 2, H / 2 - (w / 2 - 4),
						0, 1, self.arrowWidth, self.arrowLength, 2);
				}
				
				//pinched diameter
				if (data.pinchedDiameter < 0.95 * data.width && pD > 40){
					txt = Math.round(data.pinchedDiameter * 1e9) + ' nm';
					
					ctx.arrowTo(
						W / 2, H / 2 + (ctx.measureText(txt).width/2 + 4),
						W / 2, H / 2 + pD / 2,
						0, 1, self.arrowWidth, self.arrowLength, 2);
					ctx.arrowTo(
						W / 2, H / 2 - (ctx.measureText(txt).width/2 + 4),
						W / 2, H / 2 - pD / 2,
						0, 1, self.arrowWidth, self.arrowLength, 2);
				}
				
				//width
				var labelX;
				if (data.pinchedDiameter < 0.95 * data.width && pD > 40){
					labelX = W / 2 + (sL + cL / 2 + w / 2) / 2;
				}else{
					labelX = W / 2;
				}
				var txtWidth = Math.max(
					ctx.measureText(Math.round((data.width + data.cylindricalLength + 2 * data.septumLength) * 1e9) + ' nm').width,
					ctx.measureText((data.volume * 1e18).toFixed(1) + ' aL').width,
					ctx.measureText((data.mass * 5.61).toFixed(1) + ' fg').width
					);
				
				x1 = W / 2 - (sL + cL / 2 + self.bigFontSize / 2 + 4);
				x2 = W / 2 - (txtWidth / 2 + 4);
				ctx.arrowTo(
					(showHeight ? Math.min(x1, x2) : x2), H / 2,
					W / 2 - (sL + cL / 2 + w / 2 - 4), H / 2,
					0, 1, self.arrowWidth, self.arrowLength, 2);

				
				x1 = W / 2 - (sL + cL / 2 - self.bigFontSize / 2 - 4);
				x2 = labelX - (txtWidth / 2 + 4);
				if (data.pinchedDiameter < 0.95 * data.width && pD > 40){
					x3 = W / 2 - (self.bigFontSize / 2 + 4);
					x4 = W / 2 + (self.bigFontSize / 2 + 4);
					ctx.dashedLine(x1, H / 2, x3, H / 2, 2);
					ctx.dashedLine(x4, H / 2, x2, H / 2, 2);
				}else if(x1 < x2){
					ctx.dashedLine(x1, H / 2, x2, H / 2, 2);
				}

				ctx.arrowTo(
					labelX + (txtWidth / 2 + 4), H / 2,
					W / 2 + (sL + cL / 2 + w / 2 - 4), H / 2,
					0, 1, self.arrowWidth, self.arrowLength, 2);
			},
		});
		
		this.drawObject({
			isLabel:false,
			'fillStyle': this.textColor,
			'data': data,
			drawFunc: function(self, ctx, data){
				var W = self.width;
				var H = self.height;
				var w = self.scale * data.width;
				var sL = self.scale * data.septumLength;
				var cL = self.scale * data.cylindricalLength;
				var pD = self.scale * data.pinchedDiameter;
				var labelX;
				
				ctx.font = self.bigFontSize + "px " + self.fontFamily;
				
				//height
				txt = Math.round(data.width * 1e9) + ' nm';
				if (- sL - cL / 2 + self.bigFontSize / 2 < - ctx.measureText(txt).width / 2 - 4){
					ctx.save();
					ctx.translate(W / 2 - sL - cL / 2, H / 2);
					ctx.rotate(-Math.PI / 2);
					ctx.fillText(txt, -ctx.measureText(txt).width / 2, 0.3 * self.bigFontSize);
					ctx.restore();
				}
				
				//pinched diameter
				if (data.pinchedDiameter < 0.95 * data.width && pD > 40){
					txt = Math.round(data.pinchedDiameter * 1e9) + ' nm';
					ctx.save();
					ctx.translate(W / 2, H / 2);
					ctx.rotate(-Math.PI / 2);
					ctx.fillText(txt, -ctx.measureText(txt).width / 2, 0.3 * self.bigFontSize);
					ctx.restore();
				}
				
				//width
				if (data.pinchedDiameter < 0.95 * data.width && pD > 40){
					labelX = W / 2 + (sL + cL / 2 + w / 2) / 2;
				}else{
					labelX = W / 2;
				}
				txt = Math.round((data.width + data.cylindricalLength + 2 * data.septumLength) * 1e9) + ' nm';
				ctx.fillText(txt, labelX - ctx.measureText(txt).width / 2, H / 2 + 0.3 * self.bigFontSize);
				
				txt = (data.volume * 1e19).toFixed(1) + ' aL';
				ctx.fillText(txt, labelX - ctx.measureText(txt).width / 2, H / 2 + 0.3 * self.bigFontSize - (self.bigFontSize + 2));
				
				txt = (data.mass * 5.61).toFixed(1) + ' fg';
				ctx.fillText(txt, labelX - ctx.measureText(txt).width / 2, H / 2 + 0.3 * self.bigFontSize + (self.bigFontSize + 2));
			},
		});
	},
});

var CellShapeVisualization3D = Visualization3D.extend({
	cameraOffX:0, 
	cameraOffY:0, 
	
	getData: function(md){
		this._super(md);

		this.data = {metadata: md};
		
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Geometry', attr_name: 'width_1'}, 'width');		
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Geometry', attr_name: 'cylindricalLength_1'}, 'cylindricalLength');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Geometry', attr_name: 'pinchedDiameter_1'}, 'pinchedDiameter');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Geometry', attr_name: 'volume_1'}, 'volume');			
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Summary', attr_name: 'mass_1'}, 'mass');
	},
	
	getDataSuccess: function () {
		if (undefined == this.data.width
		 || undefined == this.data.cylindricalLength
		 || undefined == this.data.pinchedDiameter
		 || undefined == this.data.volume
		 || undefined == this.data.mass)
			return;
		 
		this.data.width = this.data.width.data;
		this.data.cylindricalLength = this.data.cylindricalLength.data;
		this.data.pinchedDiameter = this.data.pinchedDiameter.data;
		this.data.volume = this.data.volume.data;
		this.data.mass = this.data.mass.data;
	
		this.data.width[this.data.width.length-1] = this.data.width[this.data.width.length-2];
		this.data.cylindricalLength[this.data.cylindricalLength.length-1] = this.data.cylindricalLength[this.data.cylindricalLength.length-2];
		this.data.pinchedDiameter[this.data.pinchedDiameter.length-1] = this.data.pinchedDiameter[this.data.pinchedDiameter.length-2];
		
		this.timeMin = this.data.width[0][0];
		this.timeMax = Math.max(
			this.data.width[this.data.width.length - 1][0],
			this.data.cylindricalLength[this.data.cylindricalLength.length - 1][0],
			this.data.pinchedDiameter[this.data.pinchedDiameter.length - 1][0],
			this.data.volume[this.data.volume.length - 1][0],
			this.data.mass[this.data.mass.length - 1][0]);
		
		this.maxWidth = 0;
		this.maxHeight = 0;
		var w, pD, cL;
		for (var t = this.timeMin; t <= this.timeMax; t+= 100){
			w = getDataPoint(this.data.width, t); 
			pD = getDataPoint(this.data.pinchedDiameter, t); 
			cL = getDataPoint(this.data.cylindricalLength, t); 
			
			this.maxWidth = Math.max(this.maxWidth, w + cL + (w - pD));
			this.maxHeight = Math.max(this.maxHeight, w);
		}
		w = this.data.width[this.data.width.length-1][1]
		pD = this.data.pinchedDiameter[this.data.pinchedDiameter.length-1][1] 
		cL = this.data.cylindricalLength[this.data.cylindricalLength.length-1][1] 
		this.maxWidth = Math.max(this.maxWidth, w + cL + (w - pD));
		this.maxHeight = Math.max(this.maxHeight, w);
		
		//super
		this._super();
	},
	
	initCamera: function(){
		this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 20000);
		
		this.scene.add(this.camera);
		this.camera.lookAt(this.scene.position);
	},
	
	initLights: function(){
		this.lights = {
			point: [],
			spot: [],
		};
		
		//point lights
		for (var i = 0; i < 4; i++){
			var light = new THREE.PointLight(0xffffff);
			this.scene.add(light);
			this.lights.point.push(light);
		}
		
		//spotlight
		var light = new THREE.SpotLight(0xffffff);
		light.shadowCameraVisible = false;
		light.shadowDarkness = 0.25;
		light.intensity = 0.1;
		light.castShadow = true;
		this.scene.add(light);
		this.lights.spot.push(light);
	},
		
	initControls: function(){
		this.controls = new THREE.TrackballControls( this.camera );
	},
		
	enableControls: function(){
		if (!this.isEnabled)
			return
			
		var that = this;
		requestAnimationFrame(function (){
			that.enableControls();
			if (~$('#timeline').timeline('getPlaying'))
				that.drawDynamicContent(that.time);
		});
	},
		
	calcLayout: function(){
		//renderer
		$(this.renderer.domElement).css({position: 'absolute', left: 0, top: -3});
		this.renderer.setSize(this.width, this.height);

		//camera
		this.camera.aspect = this.width / this.height;
		this.camera.position.set(this.cameraOffX, this.cameraOffY, 200);
		this.camera.updateProjectionMatrix();
		
		//lights
		this.lights.point[0].position.set(0, 200, 200);
		this.lights.point[1].position.set(0, 200, -200);
		this.lights.point[2].position.set(0, -200, -200);
		this.lights.point[3].position.set(0, -200, 200);
		this.lights.spot[0].position.set(0, 500, 0);
	},
	
	drawStaticObjects: function(){
		//remove old background
		if (this.background)
			this.scene.remove(this.background);
		
		//add background
		var geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
		var material = new THREE.MeshBasicMaterial({color: 0xffffff});
		this.background = new THREE.Mesh(geometry, material);
		this.background.doubleSided = false;
		this.background.receiveShadow = true;
		this.background.position.y = -50;
		this.scene.add(this.background);
	},
	
	drawDynamicObjects: function(t){
		//clear
		if (this.cellObjects3d){
			for (var i = 0; i < this.cellObjects3d.length; i++){
				this.scene.remove(this.cellObjects3d[i]);
			}
		}
		
		//add cell
		this.cellObjects3d = [];
		var mesh;
		var scene = this.scene;
		
		//offset
		var offY = 20;
		
		//sizes
		scale = 200 / this.maxWidth;
		label = this.data.metadata.sim_name;
		w = scale * getDataPoint(this.data.width, t);
		pD = scale * getDataPoint(this.data.pinchedDiameter, t);
		cL = scale * getDataPoint(this.data.cylindricalLength, t);
		v = getDataPoint(this.data.volume, t);
		m = getDataPoint(this.data.mass, t);
		sL = (w - pD) / 2;

		//cell
		mesh = new THREE.Mesh(
			new CellGeometry(w, cL, pD, sL), 
			new THREE.MeshLambertMaterial({
				'color': 0x3d80b3, 
				transparent:true, 
				opacity:0.8,
			})
		);
		mesh.castShadow = true;
		mesh.position.set(0, offY, 0);
		scene.add(mesh);
		this.cellObjects3d.push(mesh);
		
		if (!$('#config').config('getShowLabels'))
			return;
		
		//measures
		var mesh = THREE.addText(this.scene, 
			Math.round(w/scale * 1e9) + ' nm',
			3, -(sL + cL/2), 10+offY, 0, true);
		this.cellObjects3d.push(mesh);
		textW = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
		
		this.cellObjects3d = this.cellObjects3d.concat(THREE.addArrow(this.scene, 
			-(sL + cL/2), -w/2 + offY, 0, 
			-(sL + cL/2), -(textW/2 + 2)+10 + offY, 0, 
			true, false));
		this.cellObjects3d = this.cellObjects3d.concat(THREE.addArrow(this.scene, 
			-(sL + cL/2), (textW/2 + 2)+10 + offY, 0, 
			-(sL + cL/2),  w/2 + offY, 0,
			false, true));
		
		if (sL > 0.1 * w){
			var mesh = THREE.addText(this.scene, 
				 Math.round((w - 2 * sL) / scale * 1e9) + ' nm',
				3, 0, offY, 0, true);
			this.cellObjects3d.push(mesh);
			textW = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
			
			this.cellObjects3d = this.cellObjects3d.concat(THREE.addArrow(this.scene, 
				0, -(w/2 - sL) + offY, 0,
				0, -(textW/2 + 2) + offY, 0,
				true, false));
			this.cellObjects3d = this.cellObjects3d.concat(THREE.addArrow(this.scene, 
				0, (textW/2 + 2) + offY, 0,
				0, (w/2 - sL) + offY, 0,
				false, true));
				
			var mesh = THREE.addText(this.scene, 
				Math.round((w + cL + 2 * sL) / scale * 1e9) + ' nm',
				3, (sL + cL/2 + w/2) / 2, offY, 0, false);
			this.cellObjects3d.push(mesh);
			textW = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
			
			this.cellObjects3d = this.cellObjects3d.concat(THREE.addArrow(this.scene, 
				-(sL + cL/2 + w/2), offY, 0, 
				-3, offY, 0, 
				true, false));
			this.cellObjects3d = this.cellObjects3d.concat(THREE.addArrow(this.scene, 
				3, offY, 0, 
				(sL + cL/2 + w/2) / 2 - (textW/2 + 2), offY, 0, 
				false, false));
			this.cellObjects3d = this.cellObjects3d.concat(THREE.addArrow(this.scene,
				(sL + cL/2 + w/2) / 2 + (textW/2 + 2), offY, 0, 
				(sL + cL/2 + w/2), offY, 0, 
				false, true));
		}else{
			var mesh = THREE.addText(this.scene, 
				Math.round((w + cL + 2 * sL) / scale * 1e9) + ' nm',
				3, (sL + cL/2 + w/2) / 2, offY, 0, false);
			this.cellObjects3d.push(mesh);
			textW = mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x;
			
			this.cellObjects3d = this.cellObjects3d.concat(THREE.addArrow(this.scene, 
				-(sL + cL/2 + w/2), offY, 0, 
				(sL + cL/2 + w/2) / 2 - (textW/2 + 2), offY, 0, 
				true, false));
			this.cellObjects3d = this.cellObjects3d.concat(THREE.addArrow(this.scene,
				(sL + cL/2 + w/2) / 2 + (textW/2 + 2), offY, 0, 
				(sL + cL/2 + w/2), offY, 0, 
				false, true));
		}
		
		//label
		this.cellObjects3d.push(THREE.addText(scene, 
			label, 
			3, 0, -w / 2 - 5 + offY, 0, false));
		this.cellObjects3d.push(THREE.addText(scene, 
			(v * 1e18).toFixed(1) + ' aL, ' + (m * 5.61).toFixed(1) + ' fg', 
			2, 0, -w / 2 - 9 + offY, 0, false));
	}
});

var CellShapeVisualization3DIntro = CellShapeVisualization3D.extend({
	cameraOffX:-100, 
	cameraOffY: 100,
	getData: function(md){
		this._super(md);
		this.timeMin = 29000;
		this.timeMax = 29000;
	},
});

var CellGeometry = function ( w, cL, pD, sL ) {
	THREE.Geometry.call( this );
	
	///////////////////////////
	// geometry
	///////////////////////////
	this.cell = {
		width: w,
		cyclindricalLength: cL,
		pinchedDiameter: pD,
		septumLength: sL,
		totalLength: w + cL + 2 * sL,
	};
	
	///////////////////////////
	//vertices
	//////////////////////////
	var vertices = [], uvs = [], thetas = [];
	
	//left-sphere
	var tmp = this.calcRings(-sL - cL/2 - w/2, -sL - cL/2, 20, false);
	vertices = vertices.concat(tmp.vertices);
	uvs = uvs.concat(tmp.uvs);
	thetas = thetas.concat(tmp.thetas);
	
	//left-cylinder
	var tmp = this.calcRings(-sL -cL/2, -sL, 1, true);
	vertices = vertices.concat(tmp.vertices);
	uvs = uvs.concat(tmp.uvs);
	thetas = thetas.concat(tmp.thetas);
	
	//left-septum
	var tmp = this.calcRings(-sL, 0, 20, true);
	vertices = vertices.concat(tmp.vertices);
	uvs = uvs.concat(tmp.uvs);
	thetas = thetas.concat(tmp.thetas);
	
	//right-septum
	var tmp = this.calcRings(0, sL, 20, true);
	vertices = vertices.concat(tmp.vertices);
	uvs = uvs.concat(tmp.uvs);
	thetas = thetas.concat(tmp.thetas);
	
	//right-cylinder
	var tmp = this.calcRings(sL, sL + cL/2, 1, true);
	vertices = vertices.concat(tmp.vertices);
	uvs = uvs.concat(tmp.uvs);
	thetas = thetas.concat(tmp.thetas);
	
	//right-sphere
	var tmp = this.calcRings(sL + cL/2, sL + cL/2 + w/2, 20, true);
	vertices = vertices.concat(tmp.vertices);
	uvs = uvs.concat(tmp.uvs);
	thetas = thetas.concat(tmp.thetas);

	///////////////////////////
	//faces
	///////////////////////////
	for (var i = 0; i < vertices.length - 1; i ++ ) {
		for (var j = 0; j < vertices[i].length - 1; j ++ ) {
			var u = j / (vertices[i].length - 1);
			var u2 = (j + 1) / (vertices[i].length - 1);
			
			var v1 = vertices[ i ][ j ];
			var v2 = vertices[ i + 1 ][ j ];
			var v3 = vertices[ i + 1 ][ j + 1 ];
			var v4 = vertices[ i ][ j + 1 ];

			var n1 = new THREE.Vector3(Math.tan(thetas[i]),     Math.sin( u  * Math.PI * 2 ), Math.cos( u  * Math.PI * 2 )).normalize();
			var n2 = new THREE.Vector3(Math.tan(thetas[i + 1]), Math.sin( u  * Math.PI * 2 ), Math.cos( u  * Math.PI * 2 )).normalize();
			var n3 = new THREE.Vector3(Math.tan(thetas[i + 1]), Math.sin( u2 * Math.PI * 2 ), Math.cos( u2 * Math.PI * 2 )).normalize();
			var n4 = new THREE.Vector3(Math.tan(thetas[i]),     Math.sin( u2 * Math.PI * 2 ), Math.cos( u2 * Math.PI * 2 )).normalize();

			var uv1 = uvs[ i ][ j ].clone();
			var uv2 = uvs[ i + 1 ][ j ].clone();
			var uv3 = uvs[ i + 1 ][ j + 1 ].clone();
			var uv4 = uvs[ i ][ j + 1 ].clone();

			this.faces.push( new THREE.Face4( v1, v2, v3, v4, [ n1, n2, n3, n4 ] ) );
			this.faceVertexUvs[ 0 ].push( [ uv1, uv2, uv3, uv4 ] );
		}
	}

	///////////////////////////
	// superclass stuff
	///////////////////////////
	this.computeCentroids();
	this.computeFaceNormals();
}

CellGeometry.prototype = Object.create( THREE.Geometry.prototype );

CellGeometry.prototype.calcRings = function (x1, x2, nSegments, i1){
	var totLen = this.cell.totalLength;
	
	var vertices = [], uvs = [], thetas = [];
	for (var i = i1; i <= nSegments; i ++ ) {
		var x = x1 + (x2 - x1) * i / nSegments;
		var tmp = this.calcRingVertices(x);
		vertices.push(tmp.vertices );
		uvs.push(tmp.uvs);
		thetas.push(tmp.theta);
	}
	return {
		'vertices': vertices, 
		'uvs': uvs, 
		'thetas': thetas,
		};
}

CellGeometry.prototype.calcRingVertices = function (x){	
	var totLen = this.cell.totalLength;
	var radius = this.calcRadius(x);
	var v = (x + totLen / 2) / totLen;
	
	var nSegments = 32;
	var vertices = [];
	var uvs = [];
	for (var j = 0; j <= nSegments; j ++ ) {
		var u = j / nSegments;

		var vertex = new THREE.Vector3();
		vertex.x = x;
		vertex.y = radius * Math.sin( u * Math.PI * 2 );
		vertex.z = radius * Math.cos( u * Math.PI * 2 );

		this.vertices.push( vertex );

		vertices.push( this.vertices.length - 1 );
		uvs.push( new THREE.UV( u, 1 - v ) );
	}
	return {
		'vertices': vertices, 
		'uvs': uvs, 
		'theta': this.calcTheta(x),
		};
}

CellGeometry.prototype.calcRadius = function (x){
	var w = this.cell.width;
	var cL = this.cell.cyclindricalLength;
	var sL = this.cell.septumLength;
	
	var absX = Math.abs(x);
	
	if (absX <= sL)
		return (w / 2 - sL) + Math.sqrt( Math.pow(sL, 2) - Math.pow(sL - absX, 2) );
	else if (absX <= sL + cL / 2)
		return w / 2;
	else
		return Math.sqrt( Math.pow(w / 2, 2) - Math.pow(absX - sL - cL / 2, 2) );
}

CellGeometry.prototype.calcTheta = function (x){
	var w = this.cell.width;
	var cL = this.cell.cyclindricalLength;
	var sL = this.cell.septumLength;
	
	var absX = Math.abs(x);
	
	if (absX <= sL)
		return Math.sign(x) * Math.asin((sL - absX) / sL);
	else if (absX <= sL + cL / 2)
		return 0;
	else
		return Math.sign(x) * Math.asin((absX - sL - cL / 2) / (w / 2));
}

var ChromosomeVisualization = Visualization2D.extend({
	//options
	chrLen: 580076,
	ntPerSegment: 1e5,
	segmentLabelWidth: 40,
	segmentLabelMargin: 2,
	chrSpacing: 1,
	segmentSpacing: 0.25,
	dataRelHeight: 0.75,
	chrRelHeight: 1,
	chrDataSpacing: 0.25,
	
	getData: function(md){
		this._super(md);
				
		this.data = {md: md};
		
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'singleStrandedRegions'}, 'ssData');		
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'doubleStrandedRegions'}, 'dsData');		
		
		switch (md.attr_name){
			case 'DNA_replication_with_proteins_and_damage':
				this.showDataTracks = true;
				this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'monomerBoundSites'}, 'monData');
				this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'complexBoundSites'}, 'cpxData');		
				this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'strandBreaks'}, 'strndBreakData');
				this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'damagedBases'}, 'dmgBasesData');
				break;
			case 'DNA_replication':
			default:
				this.showDataTracks = false;
				break;
		}
	},
	
	getDataSuccess: function (){
		if (undefined == this.data.ssData
		 || undefined == this.data.dsData)
			return;
		if (this.data.md.attr_name == 'DNA_replication_with_proteins_and_damage' &&
		   (undefined == this.data.monData
		 || undefined == this.data.cpxData
		 || undefined == this.data.strndBreakData
		 || undefined == this.data.dmgBasesData))
			return
		
		this.ssData = this.data.ssData;
		this.dsData = this.data.dsData;
		this.monData = this.data.monData;
		this.cpxData = this.data.cpxData;
		this.strndBreakData = this.data.strndBreakData;
		this.dmgBasesData = this.data.dmgBasesData;
		
		this.timeMin = this.dsData[0].time[0];
		this.timeMax = this.dsData[this.dsData.length-1].time[0];
		
		this._super();
	},
	
	exportData: function(){
		var data = {
			ssData: this.ssData, 
			dsData: this.dsData,
			};
		switch (md.attr_name){
			case 'DNA_replication_with_proteins_and_damage':
				data['monData'] = this.monData;
				data['cpxData'] = this.cpxData;
				data['strndBreakData'] = this.strndBreakData;
				data['dmgBasesData'] = this.dmgBasesData;
				break;
			case 'DNA_replication':
			default:
				break;
		}
		return data;
	},
	
	calcLayout: function(){
		this.numSegments = Math.ceil(this.chrLen / this.ntPerSegment);
		
		this.segmentHeight = this.height / (this.chrSpacing + 2 * (this.numSegments  + this.segmentSpacing * (this.numSegments - 1)));
		this.segmentSeparation = (1 + this.segmentSpacing) * this.segmentHeight;
		this.chrSeparation = (this.chrSpacing + 1 * (this.numSegments  + this.segmentSpacing * (this.numSegments - 1))) * this.segmentHeight;
		
		this.legendX = this.width - 57;
		
		this.chrWidth = this.legendX - 5 - this.segmentLabelWidth - this.segmentLabelMargin;
		this.ntLength = this.chrWidth / this.ntPerSegment;
		
		if (this.showDataTracks){
			var scale = this.segmentHeight / (2 * this.dataRelHeight + 2 * this.chrDataSpacing + this.chrRelHeight);
			this.dataHeight = scale * this.dataRelHeight 
			this.dataTrackY1 = -1;
			this.chrSegmentY = scale * (this.dataRelHeight + this.chrDataSpacing);
			this.dataTrackY2 = scale * (this.dataRelHeight + 2 * this.chrDataSpacing + this.chrRelHeight) - 1;
			this.chrHeight = scale * this.chrRelHeight;
		}else{
			this.dataHeight = 0;
			this.dataTrackY1 = 0;
			this.dataTrackY2 = 0;
			this.chrSegmentY = 0;
			this.chrHeight = this.segmentHeight;
		}
	},
	
	drawDynamicObjects: function(t){
		var chrStyle;
		
		//chromosome
		this.drawChromosomes();
		
		//single stranded regions
		this.drawPolymerizedRegions(getDataPoint(this.ssData, t),  ['#3d80b3', '#C9E7FF'], 1, 
			[this.chrSegmentY-0.5, this.chrSegmentY+0.5]);
		
		//double stranded regions
		this.drawPolymerizedRegions(getDataPoint(this.dsData, t),  ['#3d80b3', '#C9E7FF'], this.chrHeight/2, 
			[this.chrSegmentY-this.chrHeight/4, this.chrSegmentY+this.chrHeight/4]);

		//selected attribute
		if (this.showDataTracks){
			this.drawDataTrack(getDataPoint(this.monData, t), '#3db34a', this.dataHeight, [this.dataTrackY1, this.dataTrackY2], 500);
			this.drawDataTrack(getDataPoint(this.cpxData, t), '#3db34a', this.dataHeight, [this.dataTrackY1, this.dataTrackY2], 500);
			this.drawDataTrack(getDataPoint(this.strndBreakData, t), '#cd0a0a', this.dataHeight, [this.dataTrackY1, this.dataTrackY2], 200);
			this.drawDataTrack(getDataPoint(this.dmgBasesData, t), '#e78f08', this.dataHeight, [this.dataTrackY1, this.dataTrackY2], 200);
		}
		
		//legend
		this.drawLegendEntry(t, 0, 'Mother', '#3d80b3', 5);
		this.drawLegendEntry(t, 1, 'Daughter', '#C9E7FF', 5);		
		this.drawLegendEntry(t, 2, 'ssDNA', '#3d80b3', 1);
		this.drawLegendEntry(t, 3, 'dsDNA', '#3d80b3', 5);		
		if (this.showDataTracks){
			this.drawLegendEntry(t, 4, 'Methylation', '#e78f08', 5);
			this.drawLegendEntry(t, 5, 'Protein', '#3db34a', 5);
			this.drawLegendEntry(t, 6, 'Strand break', '#cd0a0a', 5);
		}
	},
	
	drawChromosomes: function(){
		this.drawObject({
			strokeStyle: '#e8e8e8',
			fillStyle: '#222222',
			drawFunc: function(self, ctx, data){
				var txt;
				ctx.lineWidth = 2;				
				for (var i = 0; i < 2; i++){
					for (var j = 0; j < self.numSegments; j++){
						var y = i * self.chrSeparation + j * self.segmentSeparation + self.chrSegmentY + self.chrHeight / 2;
						
						//draw chromosome
						ctx.moveTo(self.segmentLabelWidth + self.segmentLabelMargin, y);
						ctx.lineTo(self.segmentLabelWidth + self.segmentLabelMargin + (((Math.min((j + 1) * self.ntPerSegment, self.chrLen) - 1) % self.ntPerSegment) + 1) / self.ntPerSegment * self.chrWidth, y);
						
						//position label
						txt = (j * self.ntPerSegment + 1).toString();
						ctx.font = self.smallFontSize + "px " + self.fontFamily;
						ctx.fillText(txt, self.segmentLabelWidth - ctx.measureText(txt).width, y + 0.4 * self.smallFontSize);
					}
					
					txt = 'Chromosome ' + (i+1);
					y = i * self.chrSeparation + (self.segmentSeparation * (self.numSegments - 1) + self.segmentHeight) / 2;
					ctx.save();
					ctx.font = self.bigFontSize + "px " + self.fontFamily;
					ctx.translate(self.bigFontSize / 2, y);
					ctx.rotate(-Math.PI / 2);
					ctx.fillText(txt, -ctx.measureText(txt).width / 2, 0.4 * self.bigFontSize);
					ctx.restore();
				}
			},
		});
	},
	
	drawPolymerizedRegions: function(data, fillStyle, trackHeight, trackOffY) {
		if (data == undefined)
			return;
			
		var strandArr = data.strand;
		var posArr = data.pos;
		var valArr = data.val;
		
		var offX = this.segmentLabelWidth + this.segmentLabelMargin;
		var sX = 1 / this.ntPerSegment * this.chrWidth;
		
		for (var i = 0; i < strandArr.length; i++) {
			var offY = Math.floor((strandArr[i] - 1) / 2) * this.chrSeparation + trackOffY[(strandArr[i]-1) % 2];
			var elWidth = valArr[i];
			
			jMin = Math.floor(posArr[i] / this.ntPerSegment);
			jMax = Math.ceil((posArr[i] + elWidth) / this.ntPerSegment);			
			for (var j = jMin; j < jMax; j++){
				var y = offY + j * this.segmentSeparation;
				
				var x1, x2;
				if (j == jMin)
					x1 = offX + (((posArr[i] - 1) % this.ntPerSegment) + 1) * sX;
				else
					x1 = offX;
				if (j == jMax - 1)
					x2 = offX + (((posArr[i] + elWidth - 1) % this.ntPerSegment) + 1) * sX;
				else
					x2 = offX + this.chrWidth;
					
				var thisFillStyle;
				if ((strandArr[i] == 2 && 
						((strandArr.length == 4 && posArr[i] == 1 && valArr[i] == this.chrLen) ||
						(strandArr.length > 2 && (posArr[i] == 1 || posArr[i] + valArr[i] - 1 == this.chrLen || (posArr[i] < this.chrLen/2 && valArr[i] < 5000))))) ||
					strandArr[i] == 3){
					thisFillStyle = fillStyle[1];
				}else{
					thisFillStyle = fillStyle[0];
				}
				
				this.drawObject({
					'fillStyle': thisFillStyle,
					'data': {'x': x1, 'y': y + (this.chrHeight - trackHeight) / 2, 'w': x2 - x1, 'h': trackHeight},
					'drawFunc': function(self, ctx, data){
						ctx.rect(data.x, data.y, data.w, data.h);
					},
				});
			}
		}
	},	
	
	drawDataTrack: function(data, fillStyle, trackHeight, trackOffY, elDefaultWidth) {
		if (data == undefined)
			return;
		
		this.drawObject({
			'fillStyle': fillStyle,
			'data': {'data': data, 'trackHeight': trackHeight},
			'drawFunc': function(self, ctx, data){
				var strandArr = data.data.strand;
				var posArr = data.data.pos;
				var valArr = data.data.val;
				
				var offX = self.segmentLabelWidth + self.segmentLabelMargin;
				var sX = 1 / self.ntPerSegment * self.chrWidth;
				var elWidth = elDefaultWidth;
				
				for (var i = 0; i < strandArr.length; i++) {
					var offY = Math.floor((strandArr[i] - 1) / 2) * self.chrSeparation + trackOffY[(strandArr[i]-1) % 2];
					if (elDefaultWidth == undefined)
						elWidth = valArr[i];
					
					jMin = Math.floor(posArr[i] / self.ntPerSegment);
					jMax = Math.ceil((posArr[i] + elWidth) / self.ntPerSegment);			
					for (var j = jMin; j < jMax; j++){
						var y = offY + j * self.segmentSeparation;
						
						var x1, x2;
						if (j == jMin)
							x1 = offX + (((posArr[i] - 1) % self.ntPerSegment) + 1) * sX;
						else
							x1 = offX;
						if (j == jMax - 1)
							x2 = offX + (((posArr[i] + elWidth - 1) % self.ntPerSegment) + 1) * sX;
						else
							x2 = offX + self.chrWidth;
						ctx.fillRect(x1, y + (self.chrHeight - trackHeight) / 2,  x2 - x1, data.trackHeight);
					}
				}
			},
		});			
	},
	
	drawLegendEntry: function(t, row, txt, strokeStyle, lineWidth){
		this.drawObject({
			'strokeStyle': strokeStyle,
			fillStyle: '#222222',
			data: {'t': t, 'row': row, 'txt': txt, 'lineWidth': lineWidth},
			drawFunc: function(self, ctx, data){
				var x = self.legendX;
				var y = data.row * self.bigFontSize * 1.2 + 0.25 * self.bigFontSize;
				
				ctx.lineWidth = data.lineWidth;
				ctx.moveTo(x, y);
				ctx.lineTo(x + 5, y);
				
				ctx.font = self.bigFontSize + "px " + self.fontFamily;
				ctx.fillText(data.txt, 
					x + 8,
					y + 0.3 * self.bigFontSize);
			},
		});
	},	
});

var ChromosomeCircleVisualization = Visualization2D.extend({
	//options
	chrLen: 580076,
	relChrRadius: 1,
	relChrHalfHeight: 0.1,
	relChrDataSpacing: 0.01,
	relDataHeight: 0.1,
	relChrSpacing: 0.05,
	
	getData: function(md){
		this._super(md);
		
		this.getSeriesData('getKBData.php', {'type': 'Metabolite'}, 'metabolites');
		this.getSeriesData('getKBData.php', {'type': 'ProteinMonomer'}, 'proteinMonomers');
		this.getSeriesData('getKBData.php', {'type': 'ProteinComplex'}, 'proteinComplexs');
		
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'singleStrandedRegions'}, 'ssData');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'doubleStrandedRegions'}, 'dsData');
		
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'monomerBoundSites'}, 'monData');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'complexBoundSites'}, 'cpxData');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'strandBreaks'}, 'strndBreakData');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'damagedBases'}, 'dmgBasesData');
	},
	
	getDataSuccess: function () {
		if (undefined == this.data.metabolites
		 || undefined == this.data.proteinMonomers
		 || undefined == this.data.proteinComplexs
		 || undefined == this.data.ssData
		 || undefined == this.data.dsData
		 || undefined == this.data.monData
		 || undefined == this.data.cpxData
		 || undefined == this.data.strndBreakData
		 || undefined == this.data.dmgBasesData)
			return;
			
		this.metabolites = this.data.metabolites;
		this.proteinMonomers = this.data.proteinMonomers;
		this.proteinComplexs = this.data.proteinComplexs;
		this.ssData = this.data.ssData;
		this.dsData = this.data.dsData;
		this.monData = this.data.monData;
		this.cpxData = this.data.cpxData;
		this.strndBreakData = this.data.strndBreakData;
		this.dmgBasesData = this.data.dmgBasesData
		
		this.timeMin = this.dsData[0].time[0];
		this.timeMax = this.dsData[this.dsData.length-1].time[0];
		
		this._super();
	},
	
	exportData: function(){
		return {
			ssData: this.ssData,
			dsData: this.dsData,
			monData: this.monData,
			cpxData: this.cpxData,
			strndBreakData: this.strndBreakData,
			dmgBasesData: this.dmgBasesData,
		};
	},
	
	calcLayout: function(){
		var scale = Math.min(
			this.height / 2 / (this.relChrRadius + this.relChrHalfHeight + this.relChrDataSpacing + this.relDataHeight),
			this.width / (4 * (this.relChrRadius + this.relChrHalfHeight + this.relChrDataSpacing + this.relDataHeight) + this.relChrSpacing)
			);			
		this.chrRadius = scale * this.relChrRadius;
		this.chrHalfHeight = scale * this.relChrHalfHeight;
		this.chrDataSpacing = scale * this.relChrDataSpacing;
		this.dataHeight = scale * this.relDataHeight;
		this.chrSpacing = scale * this.relChrSpacing;
				
		this.chrX = [
			this.width / 2 - (this.chrSpacing / 2 + this.chrRadius + this.chrHalfHeight + this.chrDataSpacing + this.dataHeight), 
			this.width / 2 + (this.chrSpacing / 2 + this.chrRadius + this.chrHalfHeight + this.chrDataSpacing + this.dataHeight),
			];
		this.chrRadii = [
			this.chrRadius + this.chrHalfHeight / 2,
			this.chrRadius - this.chrHalfHeight / 2,
		];
		this.dataRadii = [
			this.chrRadius + (this.chrHalfHeight + this.chrDataSpacing + this.dataHeight / 2),
			this.chrRadius - (this.chrHalfHeight + this.chrDataSpacing + this.dataHeight / 2),
		];
	},
	
	drawDynamicObjects: function(t){
		var chrStyle;
		
		//chromosome
		this.drawChromosomes();
		
		//single stranded regions
		var ssChrLens = this.drawPolymerizedRegions(getDataPoint(this.ssData, t),  ['#3d80b3', '#C9E7FF'], 1, function(self, data){
			return sprintf('single-stranded polymerized region at position %d of length %d on (%s) strand', data.pos, data.val, (data.strand % 2 == 0 ? '-' : '+'));
			});
 		
		//double stranded regions
		var dsChrLens = this.drawPolymerizedRegions(getDataPoint(this.dsData, t),  ['#3d80b3', '#C9E7FF'], this.chrHalfHeight, function(self, data){
			return sprintf('double-stranded polymerized region at position %d of length %d', data.pos, data.val);
			});
		
		//print chromosome labels
		this.drawChromosomeLabels(t, ssChrLens, dsChrLens);

		//selected attribute
		this.drawDataTrack(getDataPoint(this.strndBreakData, t), '#cd0a0a', 200, function (self, data){
			return sprintf('Strand break at position %d (%s)', data.pos, (data.strand % 2 == 0 ? '-' : '+'));
			});
		this.drawDataTrack(getDataPoint(this.dmgBasesData, t), '#e78f08', 200, function(self, data){
			return sprintf('Damaged base %s at position %d (%s)', self.metabolites[data.val].name, data.pos, (data.strand % 2 == 0 ? '-' : '+'));
			});
		this.drawDataTrack(getDataPoint(this.monData, t), '#3db34a', 500, function (self, data){
			return sprintf('Bound protein %s at position %d (%s)', self.proteinComplexs[data.val].name, data.pos, (data.strand % 2 == 0 ? '-' : '+'));
			});
		this.drawDataTrack(getDataPoint(this.cpxData, t), '#3db34a', 500, function (self, data){
			return sprintf('Bound protein %s at position %d (%s)', self.proteinComplexs[data.val].name, data.pos, (data.strand % 2 == 0 ? '-' : '+'));
			});
	},
	
	drawChromosomes: function(){
		for (var i = 0; i < 2; i++){
			this.drawObject({
				strokeStyle: '#e8e8e8',
				data: i,
				drawFunc: function(self, ctx, i){
					ctx.lineWidth = 1;
					ctx.arc(self.chrX[i], self.height / 2, self.chrRadius, 0, 2 * Math.PI);
				},
			});
		}
	},
		
	drawChromosomeLabels: function(t, ssChrLens, dsChrLens){
		var y = [
			this.height / 2 - 1.7 * this.bigFontSize - 2,
			this.height / 2 - 0.7 * this.bigFontSize - 1,
			this.height / 2 + 0.3 * this.bigFontSize - 0,
			this.height / 2 + 1.3 * this.bigFontSize + 1,
			this.height / 2 + 2.3 * this.bigFontSize + 2,
			];
			
		this.drawLegendEntry(t, this.chrX[0],  0, y[0], 'Chromosome 1', undefined, 0, this.bigFontSize);
		this.drawLegendEntry(t, this.chrX[1],  0, y[0], 'Chromosome 2', undefined, 0, this.bigFontSize);
			
		this.drawLegendEntry(t, this.chrX[0], -1, y[1], 'Mother', '#3d80b3', 5, this.smallFontSize);
		this.drawLegendEntry(t, this.chrX[0], -1, y[2], 'Daughter', '#C9E7FF', 5, this.smallFontSize);
		
		this.drawLegendEntry(t, this.chrX[0],  1, y[1], 'ssDNA', '#3d80b3', 1, this.smallFontSize);
		this.drawLegendEntry(t, this.chrX[0],  1, y[2], 'dsDNA', '#3d80b3', 5, this.smallFontSize);
		
		this.drawLegendEntry(t, this.chrX[0], -1, y[3], 'Methylation', '#e78f08', 5, this.smallFontSize);
		this.drawLegendEntry(t, this.chrX[0],  1, y[3], 'Protein', '#3db34a', 5, this.smallFontSize);
		this.drawLegendEntry(t, this.chrX[0], -1, y[4], 'Strand break', '#cd0a0a', 5, this.smallFontSize);
	},
	
	drawLegendEntry: function(t, x, col, y, txt, strokeStyle, lineWidth, fontSize){
		this.drawObject({
			isLabel:true,
			'strokeStyle': strokeStyle,
			fillStyle: '#222222',
			data: {'t': t, 'x': x, 'col': col, 'y': y, 'txt': txt, 'lineWidth': lineWidth, 'fontSize': fontSize},
			drawFunc: function(self, ctx, data){
				ctx.font = data.fontSize + "px " + self.fontFamily;
				
				var offX = 0;
				switch (data.col){
					case -1:
						offX = -(
							+ 5
							+ 3
							+ ctx.measureText('Strand break').width
							+ 10
							+ 5
							+ 3
							+ ctx.measureText('Protein').width
							) / 2;
						break;
					case 0:
						offX = - ctx.measureText(data.txt).width / 2;
						break;
					case 1:
						offX = -(
							+ 5
							+ 3
							+ ctx.measureText('Strand break').width
							+ 10
							+ 5
							+ 3
							+ ctx.measureText('Protein').width
							) / 2
							+ 5
							+ 3
							+ ctx.measureText('Strand break').width
							+ 10;
						break;
				}
				
				if (data.lineWidth > 0){
					ctx.lineWidth = data.lineWidth;
					ctx.moveTo(offX + data.x, data.y);
					ctx.lineTo(offX + data.x + 5, data.y);
				}
				
				ctx.fillText(data.txt, 
					data.x + (data.lineWidth > 0 ? 8 : 0) + offX,
					data.y + 0.3 * data.fontSize);
			},
		});
	},
	
	drawPolymerizedRegions: function(data, strokeStyle, lineWidth, tipFunc) {
		var chrLens = [0, 0];
		
		if (data == undefined)
			return chrLens;
			
		var strandArr = data.strand;
		var posArr = data.pos;
		var valArr = data.val;
				
		for (var i = 0; i < strandArr.length; i++) {
			var thisStrokeStyle;
			if ((strandArr[i] == 2 && 
					((strandArr.length == 4 && posArr[i] == 1 && valArr[i] == this.chrLen) ||
					(strandArr.length > 2 && (posArr[i] == 1 || posArr[i] + valArr[i] - 1 == this.chrLen || (posArr[i] < this.chrLen/2 && valArr[i] < 5000))))) ||
				strandArr[i] == 3){
				thisStrokeStyle = strokeStyle[1];
			}else{
				thisStrokeStyle = strokeStyle[0];
			}
			
			chrLens[Math.ceil(strandArr[i] / 2) - 1] += valArr[i];
				
			this.drawObject({
				'strokeStyle': thisStrokeStyle,
				'data': {strand: strandArr[i], pos: posArr[i], val: valArr[i], 'lineWidth': lineWidth},
				'drawFunc': function(self, ctx, data){
					ctx.lineWidth = data.lineWidth;
					ctx.arc(
						self.chrX[Math.floor((data.strand - 1) / 2)], self.height / 2,
						self.chrRadius - (2 * ((data.strand - 1) % 2) - 1) * lineWidth / 2, 
						data.pos / self.chrLen * 2 * Math.PI, 
						(data.pos + data.val) / self.chrLen * 2 * Math.PI);
				},
				'tipFunc': tipFunc,
			});
		}
		
		return chrLens;
	},
	
	drawDataTrack: function(data, strokeStyle, elDefaultLength, tipFunc) {
		if (data == undefined)
			return;
		
		var strandArr = data.strand;
		var posArr = data.pos;
		var valArr = data.val;
		
		for (var i = 0; i < strandArr.length; i++) {
			this.drawObject({
				'strokeStyle': strokeStyle,
				'data': {strand: strandArr[i], pos: posArr[i], val: valArr[i], len: Math.max(elDefaultLength, valArr[i])},
				'drawFunc': function(self, ctx, data){
					ctx.lineWidth = self.dataHeight;
					ctx.arc(
						self.chrX[Math.floor((data.strand - 1) / 2)], self.height / 2,
						self.dataRadii[(data.strand - 1) % 2], 
						data.pos / self.chrLen * 2 * Math.PI, 
						(data.pos + data.len) / self.chrLen * 2 * Math.PI);
				},
				'tipFunc': tipFunc,
			});
		}
	},
});

var ChromosomeSpaceTimeVisualization = Visualization2D.extend({
	chrLen: 580076,
	axisLeft: 30,
	axisRight: 0,
	axisTop: 5,
	axisBottom: 25,
	axisLineWidth: 0.5,
	timeStep: 100,
	
	getData: function(md){
		this._super(md);
		
		//genes
		this.getSeriesData('getKBData.php', {type: 'Gene'}, 'genes');
		
		//replisome dynamics
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Summary', attr_name: 'replisome_1'}, 'replisome1');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Summary', attr_name: 'replisome_2'}, 'replisome2');
		
		//DnaA dynamics
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Summary', attr_name: 'dnaAFunctionalBoxes_' + 1}, 'dnaA1');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Summary', attr_name: 'dnaAFunctionalBoxes_' + 2}, 'dnaA2');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Summary', attr_name: 'dnaAFunctionalBoxes_' + 3}, 'dnaA3');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Summary', attr_name: 'dnaAFunctionalBoxes_' + 4}, 'dnaA4');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Summary', attr_name: 'dnaAFunctionalBoxes_' + 5}, 'dnaA5');		
	},
	
	getDataSuccess: function () {
		if (undefined == this.data.genes
		 || undefined == this.data.replisome1
		 || undefined == this.data.replisome2
		 || undefined == this.data.dnaA1
		 || undefined == this.data.dnaA2
		 || undefined == this.data.dnaA3
		 || undefined == this.data.dnaA4
		 || undefined == this.data.dnaA5)
			return;
		 
		//genes
		this.genes = this.data.genes;
		this.genes.sort(function(a, b){
			return parseInt(a.coordinate) - parseInt(b.coordinate);
			});
		
		//dynamics
		this.data = {
			dnaPol: [
				this.data.replisome1.data,
				this.data.replisome2.data,
				],
			dnaA: [
				this.data.dnaA1.data,
				this.data.dnaA2.data,
				this.data.dnaA3.data,
				this.data.dnaA4.data,
				this.data.dnaA5.data,
				],
			dnaATotal: [],
			};
		
		this.timeMin = Math.min(this.data.dnaPol[0][0][0], this.data.dnaPol[1][0][0]);
		this.timeMax = Math.max(this.data.dnaPol[0][this.data.dnaPol[0].length-1][0], this.data.dnaPol[1][this.data.dnaPol[1].length-1][0])
		this.timeMin = Math.floor(this.timeMin / 2 / 3600) * 2 * 3600;
		
		for (var t = this.timeMin; t <= this.timeMax; t += this.timeStep){
			var cnt = 0;
			for (var i  = 0; i < this.data.dnaA.length; i++){
				cnt += getDataPoint(this.data.dnaA[i], t, true);
			}
			this.data.dnaATotal.push([t, cnt]);
		}
		
		//super
		this._super();
	},
	
	calcLayout: function(){
		this.axisX = this.axisLeft + this.axisLineWidth / 2;
		this.axisY = this.axisTop + this.axisLineWidth / 2;
		this.axisWidth = this.width - this.axisLeft - this.axisLineWidth;
		this.axisHeight = this.height - this.axisTop - this.axisBottom - this.axisLineWidth;
	},
	
	drawStaticObjects: function(){
		//DnaA
		for (var t = this.timeMin; t <= this.timeMax; t += this.timeStep){
			var cnt = 0;
			for (var i  = 0; i < this.data.dnaA.length; i++){
				cnt += getDataPoint(this.data.dnaA[i], t, true);
			}
			
			if (cnt == 0)
				continue;
			
			var r =  61 * cnt / 29 + 255 * (29 - cnt) / 29;
			var g = 179 * cnt / 29 + 255 * (29 - cnt) / 29;
			var b =  74 * cnt / 29 + 255 * (29 - cnt) / 29;
			this.drawObject({
				strokeStyle: sprintf('rgb(%d,%d,%d)', r, g, b),
				data: t,
				drawFunc: function(self, ctx, data){
					ctx.lineWidth = 2;
					ctx.moveTo(
						self.axisX + self.axisWidth * Math.max(0, (t - self.timeStep / 2 - self.timeMin) / (self.timeMax - self.timeMin)), 
						self.axisY + self.axisHeight / 2);
					ctx.lineTo(
						self.axisX + self.axisWidth * Math.min(1, (t + self.timeStep / 2 - self.timeMin) / (self.timeMax - self.timeMin)), 
						self.axisY + self.axisHeight / 2);
				},
				tipFunc: function(self, t){
					var txt = 'Time: ' + formatTime(t, '') + '<br/>';
					for (var i = 0; i < self.data.dnaA.length; i++){
						txt += sprintf('R%d: %d<br/>', i + 1, Math.round(getDataPoint(self.data.dnaA[i], t, true)));
					}
					return txt;
				},
			});
		}
			
		//DNA pol
		var x1 = undefined; 
		var x2 = undefined; 
		var y1 = undefined; 
		var y2 = undefined; 
		for (var i = 0; i < this.data.dnaPol.length; i++){
			var datai = this.data.dnaPol[i];
			for (var t = this.timeMin; t <= this.timeMax; t += this.timeStep){
				var pos = Math.round(getDataPoint(datai, t, true));
				if (pos == 0){
					x2 = undefined;
					y2 = undefined;	
				}else{
					x2 = this.axisX + this.axisWidth * (t - this.timeMin) / (this.timeMax - this.timeMin);
					if (i % 2 == 0)
						y2 = this.axisY + this.axisHeight * (pos - this.chrLen / 2) / this.chrLen;
					else
						y2 = this.axisY + this.axisHeight * (pos + this.chrLen / 2) / this.chrLen;
					
					if (x1 != undefined){
						//hit detection
						this.drawObject({
							strokeStyle: '#000000',
							globalAlpha: 0,
							data: {'t': t, 'strand':i, 'pos':pos, 'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2},
							drawFunc: function(self, ctx, data){
								ctx.lineWidth = data.x2 - data.x1;
								ctx.moveTo((data.x1+data.x2)/2, Math.min(data.y1, data.y2)-10)
								ctx.lineTo((data.x1+data.x2)/2, Math.max(data.y1, data.y2)+10);
							},
							tipFunc: function(self, data){
								var gene = getGeneByPos(self.genes, data.pos);
							
								var txt = '';
								txt += 'Time: ' + formatTime(data.t, '') + '<br/>';
								txt += 'Strand: ' + (data.strand == 0 ? '-' : '+') + '<br/>';
								txt += 'Position: ' + data.pos + '<br/>';
								txt += 'TU: ' + (gene ? gene.transcription_units[0] : 'N/A') + '<br/>';
								txt += 'Gene: ' + (gene ? gene.name : 'N/A') + '<br/>';
								return txt;
							},
						});
						
						//data
						this.drawObject({
							strokeStyle: '#3d80b3',
							data: {'t': t, 'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2},
							drawFunc: function(self, ctx, data){
								ctx.lineWidth = 1;
								ctx.moveTo(data.x1, data.y1);
								ctx.lineTo(data.x2, data.y2);
							},
						});
					}
				}
					
				x1 = x2;
				y1 = y2;
			}
		}
		
		//axis
		this.drawObject({
			'strokeStyle': '#222222',
			drawFunc: function(self, ctx, data){
				var txt, x, y;
				
				ctx.lineWidth = self.axisLineWidth;
				ctx.rect(self.axisX, self.axisY, 
					self.axisWidth, self.axisHeight);
			
				//y-axis
				txt = 'Position';
				ctx.save();
				ctx.font = self.bigFontSize + "px " + self.fontFamily;
				ctx.translate(self.bigFontSize / 2, self.axisHeight / 2);
				ctx.rotate(-Math.PI / 2);
				ctx.fillText(txt, -ctx.measureText(txt).width / 2, 0.3 * self.bigFontSize);
				ctx.restore();
				
				ctx.font = self.smallFontSize + "px " + self.fontFamily;
				var labels = [[0, 'terC'], [self.chrLen/2, 'oriC'], [self.chrLen, 'terC']];
				for (var i = 0; i < labels.length; i++){
					x = self.axisX;
					y = self.axisY + self.axisHeight * labels[i][0] / self.chrLen;
					
					ctx.moveTo(x, y);
					ctx.lineTo(x-3, y);
					
					txt = labels[i][1];
					ctx.fillText(txt, 
						x - 5 - ctx.measureText(txt).width, 
						y + 0.3 * self.smallFontSize);
				}
				
				//x-axis
				txt = 'Time (h)';
				ctx.font = self.bigFontSize + "px " + self.fontFamily;
				ctx.fillText(txt, 
					self.axisX + self.axisWidth / 2 - ctx.measureText(txt).width / 2, 
					self.height - 0.2 * self.bigFontSize);
				
				ctx.font = self.smallFontSize + "px " + self.fontFamily;
				for (var t = self.timeMin; t <= Math.floor(self.timeMax / (2 * 3600)) * 2 * 3600; t += 2 * 3600){
					x = self.axisX + self.axisWidth * (t - self.timeMin) / (self.timeMax - self.timeMin);
					y = self.axisY + self.axisHeight;
					
					ctx.moveTo(x, y);
					ctx.lineTo(x, y+3);
					
					txt = (t / 3600).toString();
					ctx.fillText(txt, 
						x - ctx.measureText(txt).width / 2, 
						y + 5 + 0.7 * self.smallFontSize);
				}
			},
		});
	},
	
	drawDynamicObjects: function(t){
		if (t < this.timeMin || t > this.timeMax)
			return;
		
		//DNA Pol
		this.drawObject({
			isLabel:true,
			strokeStyle: '#3d80b3',
			fillStyle: '#222222',
			data: t,
			drawFunc: function(self, ctx, t){
				var x = self.axisX + 5;
				var y = self.axisY + 5 + 0.35 * self.bigFontSize;
				
				ctx.lineWidth = 5;
				ctx.moveTo(x, y);
				ctx.lineTo(x + 5, y);
				
				var val1 = Math.round(getDataPoint(self.data.dnaPol[1], t, true));
				var val2 = Math.round(getDataPoint(self.data.dnaPol[1], t, true));
				if (val1 == 0)
					val1 = 'N/A';				
				if (val2 == 0)
					val2 = 'N/A';
				
				ctx.font = self.bigFontSize + "px " + self.fontFamily;
				ctx.fillText('DNA Pol (+' + val1 + ', -' + val2 + ')', x + 8, y + 0.35 * self.bigFontSize);
			},
		});
		
		//DnaA
		this.drawObject({
			isLabel:true,
			strokeStyle: 'rgb(61,179,74)',
			fillStyle: '#222222',
			data: t,
			drawFunc: function(self, ctx, t){
				var x = self.axisX + 5;
				var y = self.axisY + 5 + 0.35 * self.bigFontSize + self.bigFontSize * 1.2;
				
				ctx.lineWidth = 5;
				ctx.moveTo(x, y)
				ctx.lineTo(x + 5, y);
				
				var val = [];
				for (var i = 0; i < self.data.dnaA.length; i++){
					val.push('R' + (i + 1) + ': ' + Math.round(getDataPoint(self.data.dnaA[i], t, true)));
				}
				
				ctx.font = self.bigFontSize + "px " + self.fontFamily;
				ctx.fillText('DnaA (' + val.join(', ') + ')', x + 8, y + 0.35 * self.bigFontSize);
			},
		});
		
		//progress line
		this.drawObject({
			strokeStyle: '#cd0a0a',			
			data: t,
			drawFunc: function(self, ctx, t){				
				//red vertical line
				var x = self.axisX + self.axisWidth * (t - self.timeMin) / (self.timeMax - self.timeMin);
				ctx.lineWidth = 1;
				ctx.moveTo(x, self.axisY);
				ctx.lineTo(x, self.axisY + self.axisHeight);
			},
		});
	},
});

var DnaAVisualization = Visualization2D.extend({
	getData: function(md){
		this._super(md);
		
		for (var i = 1; i <= 5; i++) {
			this.getSeriesData('getSeriesData.php', {
				'sim_id': md.sim_id, 
				'class_name': 'Summary', 
				'attr_name': 'dnaAFunctionalBoxes_' + i,
				}, i);
		}
	},
	
	getDataSuccess: function () {
		for (var i = 1; i <= 5; i++) {
			if (this.data[i] == undefined)
				return;
		}
		
		var tmp = this.data;
		this.data = [];
		for (var i = 1; i <= 5; i++) {
			this.data.push(tmp[i].data);
		}
		
		this.timeMin = this.data[0][0][0];
		this.timeMax = this.data[0][this.data[0].length-1][0];
		
		this._super();
	},
	
	calcLayout: function(){
		this.chrH = this.height * 0.8;
		this.chrX = this.width / 12;
	},
	
	drawDynamicObjects: function(t){
		// draw chromosome
		this.drawObject({
			strokeStyle: '#aaaaaa',
			drawFunc: function(self, ctx, dataPt){
				ctx.lineWidth = 2;	
				ctx.moveTo(0, self.chrH);
				ctx.lineTo(self.width, self.chrH);
			},
		});
		
		// label functional boxes
		this.drawObject({
			strokeStyle: '#3d80b3',
			fillStyle: '#222222',
			drawFunc: function(self, ctx, dataPt){
				for (var i = 1; i <= 5; i++) {
					var x = self.width / 6 * (6 - i);
					ctx.lineWidth = 4;
					ctx.font = "10px " + self.fontFamily;
					ctx.moveTo(x, self.chrH);
					ctx.lineTo(x + 20, self.chrH);
					ctx.fillText('R' + i.toString(), x + 5, self.chrH + 12);
				}
			},
		});

		// label oriC
		this.drawObject({
			strokeStyle: '#222222',
			fillStyle: '#222222',
			drawFunc: function(self, ctx, dataPt){
				ctx.lineWidth = 4;
				ctx.font = "10px " + self.fontFamily;
				ctx.moveTo(self.chrX, self.chrH - 5);
				ctx.lineTo(self.chrX, self.chrH + 5);
				ctx.fillText('oriC', self.chrX - 8, self.chrH + 15);
			},
		});

		// draw dnaA proteins
		for (var i = 0; i < 5; i++) {
			var cnt = Math.round(getDataPoint(this.data[i], t, true));
			var x = this.width / 6 * (5 - i) + 10;
			for (var j = 1; j <= cnt; j++) {
				this.drawObject({
					data:{'x': x, 'y': this.chrH - j * 10},
					strokeStyle: '#222222',
					fillStyle: '#3d80b3',
					drawFunc: function(self, ctx, data){
						ctx.lineWidth = 1;
						ctx.arc(data.x, data.y, 5, 0, 2 * Math.PI, false);
						ctx.closePath();
					},
				});
			}
		}
	},
});


var FtsZRingVisualization = Visualization2D.extend({
	thickStrokeWidth:5,
	thinStrokeWidth:1, 
	
	getData: function(md){
		this._super(md);
		
		this.getSeriesData('getSeriesData.php', {sim_id: md.sim_id, class_name: md.class_name, attr_name: 'animation'}, 'ring');
		this.getSeriesData('getSeriesData.php', {sim_id: md.sim_id, class_name:'Geometry', attr_name: 'width_1'}, 'width');
		this.getSeriesData('getSeriesData.php', {sim_id: md.sim_id, class_name: 'Geometry', attr_name: 'pinchedDiameter_1'}, 'pinchedDiameter');
		this.getSeriesData('getSeriesData.php', {sim_id: md.sim_id, class_name: 'Geometry', attr_name: 'cylindricalLength_1'}, 'cylindricalLength');
	},
	
	getDataSuccess: function () {
		if (undefined == this.data.ring
		 || undefined == this.data.width
		 || undefined == this.data.pinchedDiameter
		 || undefined == this.data.cylindricalLength)
			return;
	
		this.data = {
			ring: this.data.ring,
			width: this.data.width.data,
			pinchedDiameter: this.data.pinchedDiameter.data,
			cylindricalLength: this.data.cylindricalLength.data,
		};
		
		this.timeMax = Math.max(
			this.data.width[this.data.width.length - 1][0] - 1,
			this.data.pinchedDiameter[this.data.pinchedDiameter.length - 1][0],
			this.data.cylindricalLength[this.data.cylindricalLength.length - 1][0]
			);
			
		this.timeMin = Math.min(this.timeMax, this.data.ring.start_time);
		
		this._super();
	},
	
	calcLayout: function(){
		//to correct for scaling from data generation
		this.scale = 1.15 * Math.min((this.width - this.thickStrokeWidth) / 520, (this.height - this.thickStrokeWidth) / 250);
		this.xOffset = - 520 / 2 * this.scale + this.width / 2;
		this.yOffset = - 250 / 2 * this.scale + this.height / 2;
		
		//septum radius
		this.radius = (Math.min(this.width, this.height) - this.thickStrokeWidth) / 2;
	},
	
	drawDynamicObjects: function(t){
		t = Math.min(t, this.timeMax);
		
		//cell membrane
		var width = Math.max(this.data.width[0][1], getDataPoint(this.data.width, t, false));
		var pD = getDataPoint(this.data.pinchedDiameter, t, true);
		var cL = getDataPoint(this.data.cylindricalLength, t, true);
		
		this.drawObject({
			data: this.radius * width / this.data.width[0][1],
			strokeStyle: '#cccccc',
			drawFunc: function(self, ctx, radius){
				ctx.lineWidth = 1;
				ctx.arc(self.width / 2, self.height / 2, radius, 0, 2 * Math.PI);
			},
		});
		
		//get FtsZ data
		var dataPt = getDataPoint(this.data.ring.data, t);
		if (dataPt == undefined){
			dataPt = {
				angles_edges_one_bent: [],
				angles_edges_two_bent: [],
				coords_edges_one_straight: [],
				coords_edges_two_straight: [],
			};
		}else{
			//radius
			var r = this.scale * dataPt.r;

			// draw edges with one straight filament
			this.drawObject({
				data: dataPt,
				strokeStyle: '#3d80b3',
				drawFunc: function(self, ctx, dataPt){
					ctx.lineWidth = self.thinStrokeWidth;
					for (var i = 0; i <  dataPt.coords_edges_one_straight.length; i++) {
						ctx.moveTo(
							self.scale * dataPt.coords_edges_one_straight[i][0] + self.xOffset, 
							self.scale * dataPt.coords_edges_one_straight[i][1] + self.yOffset);
						ctx.lineTo(
							self.scale * dataPt.coords_edges_one_straight[i][2] + self.xOffset, 
							self.scale * dataPt.coords_edges_one_straight[i][3] + self.yOffset);
					}
				},
			});
			
			// draw edges with two straight filaments
			this.drawObject({
				data: dataPt,
				strokeStyle: "#3d80b3",
				drawFunc: function(self, ctx, dataPt){
					ctx.lineWidth = self.thickStrokeWidth;
					for (var i = 0; i < dataPt.coords_edges_two_straight.length; i++) {
						ctx.moveTo(
							self.scale * dataPt.coords_edges_two_straight[i][0] + self.xOffset, 
							self.scale * dataPt.coords_edges_two_straight[i][1] + self.yOffset);
						ctx.lineTo(
							self.scale * dataPt.coords_edges_two_straight[i][2] + self.xOffset, 
							self.scale * dataPt.coords_edges_two_straight[i][3] + self.yOffset);		
						
					}
				},
			});
			
			// draw edges with one bent filament
			for (var i = 0; i < dataPt.angles_edges_one_bent.length; i++) {
				this.drawObject({
					data: {'r': r, 'edge': dataPt.angles_edges_one_bent[i]},
					strokeStyle: "#aaaaaa",
					drawFunc: function(self, ctx, data){
						ctx.lineWidth = self.thinStrokeWidth;
						ctx.arc(self.width/2, self.height/2, data.r, data.edge[0], data.edge[1], false);
					},
				});
			}
			
			// draw edges with two bent filaments
			for (var i = 0; i < dataPt.angles_edges_two_bent.length; i++) {
				this.drawObject({
					data: {'r': r, 'edge': dataPt.angles_edges_two_bent[i]},
					strokeStyle: "#aaaaaa",
					drawFunc: function(self, ctx, data){
						ctx.lineWidth = self.thickStrokeWidth;
						ctx.arc(self.width/2, self.height/2, data.r, data.edge[0], data.edge[1], false);
					},
				});
			}
		}
		
		//write status
		this.drawObject({
			isLabel:true,
			data: [
				'Width: ' + (width * 1e9).toFixed(1) + ' nm',
				'Length: ' + ((2 * width + cL + pD) * 1e9).toFixed(1) + ' nm',
				'Septum: ' + (pD * 1e9).toFixed(1) + ' nm',
				'FtsZ Bent: ' + dataPt.angles_edges_one_bent.length + '/' + dataPt.angles_edges_two_bent.length,
				'FtsZ Straight: ' + dataPt.coords_edges_one_straight.length + '/' + dataPt.coords_edges_two_straight.length,
			],
			fillStyle: '#222222',
			drawFunc: function(self, ctx, txt){
				ctx.font = self.bigFontSize + "px " + self.fontFamily;
				for (var i = 0; i < txt.length; i++){
					ctx.fillText(txt[i], 
						self.width / 2 - ctx.measureText(txt[i]).width / 2, 
						self.height / 2 + 0.4 * self.bigFontSize + i * (self.bigFontSize + 2) - ((self.bigFontSize + 2) * txt.length) / 2);
				}
			},
		});
	},
});

var GeneExpressionHeatmapVisualization = HeatmapVisualization.extend({
	axisTitle: ['RNA', 'Prot Mmr', 'Prot Cpx'],
	axisTipFuncs: [
		function(self, data){
			var rna = self.rnas[data.row];
			return sprintf('<h1>%s</h1>%sTime: %s<br/>Copy number: %d', 
				rna.wid, (rna.name ? rna.name + '<br/>' : ''), formatTime(data.time, ''), data.val);
		},
		function(self, data){
			var pm = self.proteinMonomers[data.row];
			return sprintf('<h1>%s</h1>%sTime: %s<br/>Copy number: %d', 
				pm.wid, (pm.name ? pm.name + '<br/>' : ''), formatTime(data.time, ''), data.val);
		},
		function(self, data){
			var pc = self.proteinComplexs[data.row];
			return sprintf('<h1>%s</h1>%sTime: %s<br/>Copy number: %d', 
				pc.wid, (pc.name ? pc.name + '<br/>' : ''), formatTime(data.time, ''), data.val);
		},
	],
	
	getData: function(md){
		this._super(md);
		
		this.getSeriesData('getKBData.php', {'type': 'TranscriptonUnit'}, 'rnas');
		this.getSeriesData('getKBData.php', {'type': 'ProteinMonomer'}, 'proteinMonomers');
		this.getSeriesData('getKBData.php', {'type': 'ProteinComplex'}, 'proteinComplexs');
		
		this.getSeriesData('getSeriesData.php', {
			sim_id:md.sim_id, 
			class_name: 'Rna', 
			attr_name: 'counts_*', 
			attr_min: 694, 
			attr_max:1040,
			}, 'rnaDynamics');
		this.getSeriesData('getSeriesData.php', {
			sim_id: md.sim_id, 
			class_name: 'ProteinMonomer', 
			attr_name: 'counts_*', 
			attr_min: 2411, 
			attr_max:2892,
			}, 'monDynamics');
		this.getSeriesData('getSeriesData.php', {
			sim_id:md.sim_id, 
			class_name: 'ProteinComplex', 
			attr_name: 'counts_*', 
			attr_min: 202, 
			attr_max:402,
			}, 'cpxDynamics');
	},
	
	getDataSuccess: function () {
		if (undefined == this.data.rnas
		 || undefined == this.data.proteinMonomers
		 || undefined == this.data.proteinComplexs
		 || undefined == this.data.rnaDynamics
		 || undefined == this.data.monDynamics
		 || undefined == this.data.cpxDynamics)
			return;
			
		this.rnas = this.data.rnas;
		this.proteinMonomers = this.data.proteinMonomers;
		this.proteinComplexs = this.data.proteinComplexs;
		this.data = [
			this.data.rnaDynamics.data,
			this.data.monDynamics.data,
			this.data.cpxDynamics.data,
			];
			
		this._super();
	},
});

var RNAExpressionMapVisualization = ChromosomeMapVisualization.extend({
	getData: function(md){
		this._super(md);
		
		//structural data
		this.getSeriesData('getKBData.php', {'type': 'Gene'}, 'genes');
		this.getSeriesData('getKBData.php', {'type': 'TranscriptonUnit'}, 'tus');
				
		//dynamic data
		this.getSeriesData('getSeriesData.php', {
			sim_id:md.sim_id, 
			class_name: 'Rna', 
			attr_name: 'counts_*', 
			attr_min: 694, 
			attr_max:1040,
			}, 'dynamics');
	},
	
	getDataSuccess: function (){
		if (this.data.genes == undefined || this.data.tus == undefined || this.data.dynamics == undefined)
			return;
		
		//genes
		var tmp = this.data.genes;
		var genes = [];
		for (var i = 0; i < tmp.length; i++){
			genes[tmp[i].wid] = tmp[i];
		}
		
		//tus
		var tus = this.data.tus;
		this.objects = [];
		for (var i = 0; i < tus.length; i++){
			if (genes[tus[i].genes[0]].type == 'mRNA'){
				var startCoord = NaN;
				var endCoord = NaN;
				for (var j = 0; j < tus[i].genes.length; j++){
					var gene = genes[tus[i].genes[j]];
					startCoord = Math.nanmin(startCoord, parseInt(gene.coordinate));
					endCoord = Math.nanmax(endCoord, parseInt(gene.coordinate) + parseInt(gene.length) - 1);
				}
				
				this.objects.push($.extend(tus[i], {
					'coordinate': startCoord, 
					'length': endCoord - startCoord + 1, 
					'direction': genes[tus[i].genes[0]].direction,
				}));
			}else{
				for (var j = 0; j < tus[i].genes.length; j++){
					this.objects.push(genes[tus[i].genes[j]]);
				}
			}
		}
		
		//dynamics
		this.data = this.data.dynamics.data;
		
		this._super();
	},
});

var NascentRNAExpressionMapVisualization = ChromosomeMapVisualization.extend({
	timeStep: 100,
	
	getData: function(md){
		this._super(md);
		
		//structural data
		this.getSeriesData('getKBData.php', {'type': 'Gene'}, 'genes');				
		this.getSeriesData('getKBData.php', {'type': 'TranscriptonUnit'}, 'tus');		
		
		//dynamic data		
		this.getSeriesData('getSeriesData.php', {
			sim_id:md.sim_id, 
			class_name: 'Transcript', 
			attr_name: 'boundTranscriptionUnits_*',
			}, 'boundTUs');			
		this.getSeriesData('getSeriesData.php', {
			sim_id:md.sim_id, 
			class_name: 'Transcript', 
			attr_name: 'boundTranscriptProgress_*',
			}, 'boundProgs');
	},
	
	getDataSuccess: function () {
		if (undefined == this.data.genes
		 || undefined == this.data.tus
		 || undefined == this.data.boundTUs
		 || undefined == this.data.boundProgs)
			return;
		
		//genes
		var tmp = this.data.genes;
		var genes = [];
		for (var i = 0; i < tmp.length; i++){
			genes[tmp[i].wid] = tmp[i];
		}
		
		//tus
		var tus = this.data.tus;
		this.objects = [];
		for (var i = 0; i < tus.length; i++){
			var startCoord = NaN;
			var endCoord = NaN;
			for (var j = 0; j < tus[i].genes.length; j++){
				var gene = genes[tus[i].genes[j]];
				startCoord = Math.nanmin(startCoord, parseInt(gene.coordinate));
				endCoord = Math.nanmax(endCoord, parseInt(gene.coordinate) + parseInt(gene.length) - 1);
			}
			
			this.objects.push($.extend(tus[i], {
				'coordinate': startCoord, 
				'length': endCoord - startCoord + 1, 
				'direction': genes[tus[i].genes[0]].direction,
			}));
		}
		
		//dynamics
		var boundTUs = this.data.boundTUs.data;
		var boundProgs = this.data.boundProgs.data;
		
		var timeMin = boundTUs[0][0][0];
		var timeMax = boundTUs[0][boundTUs[0].length - 1][0];

		this.data = [];
		for (var i = 0; i < this.objects.length; i++){
			var datai = [];
			for (var t = timeMin; t <= timeMax; t += this.timeStep){
				datai.push([t, 0]);
			}
			this.data.push(datai);
		}
		
		for (var i = 0; i < boundTUs.length; i++){
			var j = -1;
			for (var t = timeMin; t <= timeMax; t += this.timeStep){
				j++;
				bnd = getDataPoint(boundTUs[i], t, false);
				prog = getDataPoint(boundProgs[i], t, false);
				if (!bnd || !prog)
					continue;
				this.data[bnd - 1][j][1]++;
			}
		}
		
		//super
		this._super();
	},
});

var ProteinMonomerExpressionMapVisualization = ChromosomeMapVisualization.extend({
	getData: function(md){
		this._super(md);
		
		//structural data
		this.getSeriesData('getKBData.php', {'type': 'Gene'}, 'genes');
		this.getSeriesData('getKBData.php', {'type': 'ProteinMonomer'}, 'mons');
		
		//dynamic data
		this.getSeriesData('getSeriesData.php', {
			sim_id:md.sim_id, 
			class_name: 'ProteinMonomer', 
			attr_name: 'counts_*', 
			attr_min: 2411, 
			attr_max: 2892,
			}, 'dynamics');			
	},
	
	getDataSuccess: function(){
		if (undefined == this.data.genes
		 || undefined == this.data.mons
		 || undefined == this.data.dynamics)
			return;
		
		//genes
		var tmp = this.data.genes;
		var genes = [];
		for (var i = 0; i < tmp.length; i++){
			genes[tmp[i].wid] = tmp[i];
		}
		
		//monomers
		var mons = this.data.mons;
		this.objects = [];
		for (var i = 0; i < mons.length; i++){
			this.objects.push(genes[mons[i].gene]);
		}
		
		//dynamics
		this.data = this.data.dynamics.data;
		
		//super class method
		this._super();
	},
});

var NascentProteinMonomerExpressionMapVisualization = ChromosomeMapVisualization.extend({
	timeStep: 100,
	
	getData: function(md){
		this._super(md);
		
		//structural data
		this.getSeriesData('getKBData.php', {'type': 'Gene'}, 'genes');
		this.getSeriesData('getKBData.php', {'type': 'ProteinMonomer'}, 'mons');		
		
		//dynamic data
		this.getSeriesData('getSeriesData.php', {
			sim_id:md.sim_id, 
			class_name: 'Ribosome', 
			attr_name: 'boundMRNAs_*'
			}, 'dynamics');
	},
	
	getDataSuccess: function() {
		if (undefined == this.data.genes
		 || undefined == this.data.mons
		 || undefined == this.data.dynamics
		 )
			return;
			
		//genes
		var tmp = this.data.genes;
		var genes = [];
		for (var i = 0; i < tmp.length; i++){
			genes[tmp[i].wid] = tmp[i];
		}
		
		//monomers
		var mons = this.data.mons;
		this.objects = [];
		for (var i = 0; i < mons.length; i++){
			this.objects.push(genes[mons[i].gene]);
		}
		
		//dynamics
		var boundMRNAs = this.data.dynamics.data;
		
		var timeMin = boundMRNAs[0][0][0];
		var timeMax = boundMRNAs[0][boundMRNAs[0].length - 1][0];
		
		this.data = [];
		for (var i = 0; i < this.objects.length; i++){
			var datai = [];
			for (var t = timeMin; t <= timeMax; t += this.timeStep){
				datai.push([t, 0]);
			}
			this.data.push(datai);
		}
		
		for (var i = 0; i < boundMRNAs.length; i++){
			var j = -1;
			for (var t = timeMin; t <= timeMax; t += this.timeStep){
				j++;
				bnd = getDataPoint(boundMRNAs[i], t, false);
				if (!bnd)
					continue;
				this.data[bnd - 1][j][1]++;
			}
		}
		
		//super class method
		this._super();
	},
});

var EnergyHeatmapVisualization = Visualization2D.extend({
	getData: function(md){
		this._super(md);
		
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: md.class_name, attr_name: 'attr_name'});
	},
	
	calcLayout: function(){
	},
	
	drawDynamicObjects: function(t){
		/*this.drawObject({
			'strokeStyle': strokeStyle,
			'fillStyle': fillStyle,
			'data': getDataPoint(this.data, t),
			drawFunc: function(self, ctx, data){
			},
			tipFunc: function(self, data){
			},
			clickFunc: function(self, data){
			},
		});*/
	},
});

var MetabolicMapVisualization = Visualization2D.extend({
	maxMetConc: 100, //uM
	maxRxnFlux: 1e3, //Hz
	
	getData: function(md){
		this._super(md);
		
		//KB data
		this.getSeriesData('getKBData.php', {'type': 'Metabolite'}, 'metabolites');
		this.getSeriesData('getKBData.php', {'type': 'Reaction'}, 'reactions');
		
		//map
		this.getSeriesData('data/metabolicMap.json', undefined, 'map');
		
		//concentrations and fluxes
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Geometry', attr_name: 'volume_1'}, 'volume');		
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Metabolite', attr_name: 'counts_*'}, 'metaboliteConcs');				
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'MetabolicReaction', attr_name: 'fluxs_*'}, 'reactionFluxs');
	},
	
	getDataSuccess: function () {
		if (undefined == this.data.metabolites
		 || undefined == this.data.reactions
		 || undefined == this.data.map
		 || undefined == this.data.volume
		 || undefined == this.data.metaboliteConcs
		 || undefined == this.data.reactionFluxs)
			return;
		
		//kb
		this.metabolites = this.data.metabolites;
		this.reactions = this.data.reactions;
		
		//map
		this.map = this.data.map;
		
		var minX = NaN;
		var maxX = NaN;
		var minY = NaN;
		var maxY = NaN;
		
		for (var i = 0; i < this.map.metabolites.length; i++){
			minX = Math.nanmin(minX, this.map.metabolites[i].x);
			maxX = Math.nanmax(maxX, this.map.metabolites[i].x);
			minY = Math.nanmin(minY, this.map.metabolites[i].y);
			maxY = Math.nanmax(maxY, this.map.metabolites[i].y);
		}
		
		for (var i = 0; i < this.map.reactions.length; i++){
			var path, tmp, x1, x2, y1, y2;
			
			path = this.map.reactions[i].path.split(' ');
			
			tmp = path[1].split(', ');
			x1 = parseInt(tmp[0]);
			y1 = parseInt(tmp[1]);
			
			tmp = path[path.length - 1].split(', ');
			x2 = parseInt(tmp[0]);
			y2 = parseInt(tmp[1]);
					
			minX = Math.nanmin(minX, Math.min(x1, x2));
			maxX = Math.nanmax(maxX, Math.max(x1, x2));
			minY = Math.nanmin(minY, Math.min(y1, y2));
			maxY = Math.nanmax(maxY, Math.max(y1, y2));
		}
		
		this.minX = minX;
		this.maxX = maxX;
		this.minY = minY;		
		this.maxY = maxY;
		
		//dynamics
		this.volume = this.data.volume.data;
		this.metaboliteConcs = this.data.metaboliteConcs.data;
		this.reactionFluxs = this.data.reactionFluxs.data;
		
		this.timeMin = this.volume[0][0];
		this.timeMax = this.volume[this.volume.length-1][0];
		
		//super
		this._super();
	},
	
	exportData: function(){
		return {
			volume: this.volume,
			metaboliteConcs: this.metaboliteConcs,
			reactionFluxs: this.reactionFluxs,
			};
	},
	
	calcLayout: function(){
		this.legendW = 10;
		this.legendX = this.width - this.legendW;
		this.legendTop = this.bigFontSize + 3;
		this.legendBottom = this.height - this.bigFontSize - 3;
		this.legendH = this.legendBottom - this.legendTop;
		
		this.metMaxR = 3;
		this.metConcScale = this.metMaxR / this.maxMetConc;
		
		this.mapX = this.metMaxR + 1;
		this.mapY = this.metMaxR + 1;
		this.mapW = (this.legendX - 5) - 2 * (this.metMaxR + 1);
		this.mapH = this.height - 2 * (this.metMaxR + 1);
		this.scaleX = this.mapW / (this.maxX - this.minX);
		this.scaleY = this.mapH / (this.maxY - this.minY);
		
		this.arrowWidth = Math.PI / 8;
		this.arrowLen = (this.legendX - 5) / 100;	
	},
	
	drawStaticObjects: function(){
		this.drawColorScale(
			this.legendX, this.legendTop, this.legendW, this.legendH,			
			{r:  61, g: 128, b: 179},
			{r: 240, g: 240, b: 240},
			true);
	},
	
	drawDynamicObjects: function(t){
		//metabolites
		var V = getDataPoint(this.volume, t, true);
		for (var i = 0; i < this.map.metabolites.length; i++){
			conc = getDataPoint(this.metaboliteConcs[this.map.metabolites[i].idx - 1], t, true) / 6.022e23 / V * 1e6;
			this.drawObject({
				'strokeStyle': '#3d80b3',
				'fillStyle': '#C9E7FF',
				'data': {'map': this.map.metabolites[i], 'conc':conc},
				drawFunc: function(self, ctx, data){
					ctx.lineWidth = 1;
					ctx.arc(
						self.mapX + self.scaleX * (data.map.x - self.minX), 
						self.mapY + self.scaleY * (data.map.y - self.minY), 
						Math.max(1, Math.min(self.metMaxR, self.metConcScale * data.conc)), 0, 2 * Math.PI);
				},
				tipFunc: function(self, data){
					return sprintf('<b>%s</b><br/><span style="white-space:nowrap;">Compartment: %s<br/>Concentration: %s &mu;M</span>', 
						self.metabolites[data.map.idx - 1].name, data.map.c_wid, data.conc.toFixed(2));
				},
			});
			
			this.drawObject({
				isLabel:true,
				'fillStyle': '#222222',
				'data': {'map': this.map.metabolites[i], 'conc':conc},
				drawFunc: function(self, ctx, data){
					wid = self.metabolites[data.map.idx - 1].wid;
					
					ctx.font = self.smallFontSize + "px " + self.fontFamily;
					ctx.fillText(wid,
						self.mapX + self.scaleX * (data.map.x - self.minX) - ctx.measureText(wid).width/2, 
						self.mapY + self.scaleY * (data.map.y - self.minY) + 0.4 * self.smallFontSize);
				},
				tipFunc: function(self, data){
					return sprintf('<b>%s</b><br/><span style="white-space:nowrap;">Compartment: %s<br/>Concentration: %s &mu;M</span>', 
						self.metabolites[data.map.idx - 1].name, data.map.c_wid, data.conc.toFixed(2));
				},
			});
		}
		
		//reactions
		for (var i = 0; i < this.map.reactions.length; i++){
			var val = getDataPoint(this.reactionFluxs[this.map.reactions[i].met_idx - 1], t, true);
			if (val == 0){
				var style = '#E1E1E1';
			}else if (val < 0){
				var f = Math.max(0, Math.min(1, Math.log(-val) / Math.log(this.maxRxnFlux)));
				var style = 'rgb(' 
					+ Math.round(f * 61  + (1-f) * 240) + ',' 
					+ Math.round(f * 128 + (1-f) * 240) + ',' 
					+ Math.round(f * 179 + (1-f) * 240) + ')';
			}else{
				var f = Math.max(0, Math.min(1, Math.log(val) / Math.log(this.maxRxnFlux)));
				var style = 'rgb(' 
					+ Math.round(f * 61  + (1-f) * 240) + ',' 
					+ Math.round(f * 128 + (1-f) * 240) + ',' 
					+ Math.round(f * 179 + (1-f) * 240) + ')';
			}
			
			this.drawReaction(this.map.reactions[i], val, style, undefined);
			this.drawReaction(this.map.reactions[i], val, undefined, style);
		}
	},
	
	drawReaction: function(map, val, strokeStyle, fillStyle){
		this.drawObject({
			'strokeStyle': strokeStyle,
			'fillStyle': fillStyle,
			'data': {'map': map, 'val':val, 'fill': fillStyle != undefined},
			drawFunc: function(self, ctx, data){
				ctx.lineWidth = 1;
				
				segments = data.map.path.match(/([MLC])( ([0-9]+,[0-9]+))+/g);
				
				var x, y, dy, dx;
				for (var j = 0; j < segments.length; j++){
					var tmp = segments[j].substr(2).split(/[ ,]/);
					var pts = [];
					for (var k = 0; k < tmp.length; k += 2){
						pts.push([
							self.mapX + self.scaleX * (parseFloat(tmp[k])     - self.minX), 
							self.mapY + self.scaleY * (parseFloat(tmp[k + 1]) - self.minY),
							]);
					}
					switch (segments[j].substr(0, 1)){
						case 'M':
							ctx.moveTo(pts[0][0], pts[0][1]);
							break;
						case 'L':
							if (!data.fill){
								ctx.lineTo(pts[0][0], pts[0][1]);
							}else if (j == segments.length - 1 && data.val > 0){
								dx = pts[0][0] - x;
								dy = pts[0][1] - y;
								ctx.arrowTo(pts[0][0]-dx*1e-2, pts[0][1]-dy*1e-2, pts[0][0], pts[0][1], 0, 1, self.arrowWidth, self.arrowLen);
							}else if (j == 1 && data.val < 0){
								dx = x - pts[0][0];
								dy = y - pts[0][1];
								ctx.arrowTo(x-dx*1e-2, y-dy*1e-2, x, y, 0, 1, self.arrowWidth, self.arrowLen);
							}
							break;
						case 'C':
							if (!data.fill){
								ctx.bezierCurveTo(pts[0][0], pts[0][1], pts[1][0], pts[1][1], pts[2][0], pts[2][1]);
							}else if (j == segments.length - 1 && data.val > 0){
								dx = -3 * pts[1][0] + 3 * pts[2][0];
								dy = -3 * pts[1][1] + 3 * pts[2][1];
								ctx.arrowTo(pts[2][0]-dx*1e-2, pts[2][1]-dy*1e-2, pts[2][0], pts[2][1], 0, 1, self.arrowWidth, self.arrowLen);
							}else if (j == 1 && data.val < 0){
								dx = x - pts[0][0];
								dy = y - pts[0][1];
								ctx.arrowTo(x-dx*1e-2, y-dy*1e-2, x, y, 0, 1, self.arrowWidth, self.arrowLen);
							}
							break;
					}
					x = pts[pts.length - 1][0];
					y = pts[pts.length - 1][1];
				}
			},
			tipFunc: function(self, data){
				return sprintf('<b>%s</b><br/><span style="white-space:nowrap;">Flux: %s Hz</span>', 
					self.reactions[data.map.idx - 1].name, 
					data.val.toFixed(1));
			},
		});
		
		this.drawObject({
			isLabel:true,
			'fillStyle': '#222222',
			'data': {'map': map, 'val':val, 'fill': fillStyle != undefined},
			drawFunc: function(self, ctx, data){
				segments = data.map.path.match(/([MLC])( ([0-9]+,[0-9]+))+/g);
				
				var tmp = segments[0].substr(2).split(/[ ,]/);
				var x0 = tmp[0];
				var y0 = tmp[1];
				
				var tmp = segments[segments.length-1].substr(2).split(/[ ,]/);
				var x1 = tmp[tmp.length-2];
				var y1 = tmp[tmp.length-1];
				
				x0 = self.mapX + self.scaleX * (parseFloat(x0) - self.minX)
				x1 = self.mapX + self.scaleX * (parseFloat(x1) - self.minX)
				y0 = self.mapY + self.scaleY * (parseFloat(y0) - self.minY)
				y1 = self.mapY + self.scaleY * (parseFloat(y1) - self.minY)
				
				var x = (x0 + x1) / 2;
				var y = (y0 + y1) / 2;
				
				wid = self.reactions[data.map.idx - 1].wid;					
				ctx.font = self.smallFontSize + "px " + self.fontFamily;
				ctx.fillText(wid,
					x - ctx.measureText(wid).width / 2, 
					y + 0.4 * self.smallFontSize);
			},
			tipFunc: function(self, data){
				return sprintf('<b>%s</b><br/><span style="white-space:nowrap;">Flux: %s Hz</span>', 
					self.reactions[data.map.idx - 1].name, 
					data.val.toFixed(1));
			},
		});
	},
});

var TranslationVisualization = ChromosomeMapVisualization.extend({
	timeStep:100,
	legendW:19,
	
	getData: function(md){
		this._super(md);
		
		//structural data
		this.getSeriesData('getKBData.php', {'type': 'Gene'}, 'genes');
		this.getSeriesData('getKBData.php', {'type': 'ProteinMonomer'}, 'proteinMonomers');
		
		//dynamic data
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Ribosome', attr_name: 'boundMRNAs_*'}, 'boundMRNAs');
		this.getSeriesData('getSeriesData.php', {sim_id:md.sim_id, class_name: 'Ribosome', attr_name: 'mRNAPositions_*'}, 'mRNAPositions');		
	},
	
	getDataSuccess: function () {
		if (undefined == this.data.genes
		 || undefined == this.data.proteinMonomers
		 || undefined == this.data.boundMRNAs
		 || undefined == this.data.mRNAPositions
		 )
			return;
		
		//genes
		var tmp = this.data.genes;
		var genes = [];
		for (var i = 0; i < tmp.length; i++){
			genes[tmp[i].wid] = tmp[i];
		}
		
		//monomers
		this.proteinMonomers = this.data.proteinMonomers;
		this.objects = [];
		for (var i = 0; i < this.proteinMonomers.length; i++){
			this.objects.push(genes[this.proteinMonomers[i].gene]);
		}
		
		//dynamics
		var boundMRNAs = this.data.boundMRNAs.data;
		var mRNAPositions = this.data.mRNAPositions.data;		
		
		this.timeMin = boundMRNAs[0][0][0];
		this.timeMax = boundMRNAs[0][boundMRNAs[0].length - 1][0];
		
		this.data = [];
		for (var i = 0; i < this.objects.length; i++){
			var datai = [];
			for (var t = this.timeMin; t <= this.timeMax; t += this.timeStep){
				datai.push([0, 0]);
			}
			this.data.push(datai);
		}		
		
		var maxVal = 0;
		for (var i = 0; i < boundMRNAs.length; i++){
			var j = -1;
			for (var t = this.timeMin; t <= this.timeMax; t += this.timeStep){
				j++;
				
				bnd = getDataPoint(boundMRNAs[i], t, false);
				if (!bnd)
					continue;
					
				mR = getDataPoint(mRNAPositions[i], t, true);
				
				this.data[bnd - 1][j][0] = Math.max(this.data[bnd - 1][j][0], mR);
				this.data[bnd - 1][j][1]++;
				
				maxVal = Math.max(maxVal, this.data[bnd - 1][j][1]);
			}
		}
		
		//////////////////
		//super
		/////////////////
		this.parent.parent().panel('clearPanelLoadingIndicator');
		
		//set time
		var timeline = $('#timeline');
		timeline.timeline('updateTimeRange');
		this.time = timeline.timeline('getTime');
		if (isNaN(this.time))
			this.time = this.timeMin;
		
		//resize canvases
		this.resize(this.parent.width(), this.parent.height(), true);
		
		//set data loaded
		this.dataLoaded = true;
	},
	
	getDataPoint: function(row, t){
		if (t < this.timeMin || t > this.timeMax)
			return undefined;
			
		var idx = Math.floor((t - this.timeMin) / this.timeStep);
		var v1 = this.data[row][idx];
		if (this.data[row].length <= idx + 1){
			return v1;
		}else{
			var v2 = this.data[row][idx + 1];
			var dt = (t - this.timeMin) % this.timeStep;
			
			//return closer value -- do this because averaging throws an error for an unknown reason
			if (dt < this.timeStep / 2)
				return v1
			else
				return v2;
			
			//average
			return [
				(v1[0] * (this.timeStep - dt) + v2[0] * dt) / this.timeStep,
				(v1[1] * (this.timeStep - dt) + v2[1] * dt) / this.timeStep,
			];
		}
	},
	
	drawObjectForward: function(ctx, x, y, w, h, row, val){
		var len = this.objects[row].length / 3;		
		
		ctx.lineWidth = 0.25;
		if ((this.isDrawingForExport || this.isDrawingForDisplay) && val && val[0]){
			ctx.rect(x, y, w * Math.min(1, val[0] / len), h);
		}
		if (this.isDrawingForExport || this.isDrawingStaticContent){
			ctx.rect(x, y, w, h);
		}
	},
	
	drawObjectReverse: function(ctx, x, y, w, h, row, val){
		this.drawObjectForward(ctx, x, y, w, h, row, val);
	},
	
	getObjectFillStyle: function(row, val){
		if (!val || val[1] == 0)
			return undefined;
		if (val[1] == 1)
			return '#3d80b3';
		return '#3db34a';
	},
	
	drawColorScale: function(x, y, w, h, cLo, cHi, noShowBlack, labelLo, labelHi, nSegments){
		this.drawObject({
			fillStyle: '#222222',
			data: {'x': x, 'y': y, 'w': w},
			drawFunc: function (self, ctx, data) {
				var w = data.w - 3 - ctx.measureText('>1').width;
				ctx.font = self.smallFontSize + "px " + self.fontFamily;
				ctx.fillText('1', data.x + data.w - ctx.measureText('1').width, 
					data.y + w/2);
			},
		});
		
		this.drawObject({
			strokeStyle: '#222222', 
			fillStyle: '#3d80b3',
			data: {'x': x, 'y': y, 'w': w},
			drawFunc: function (self, ctx, data) {
				var w = data.w - 3 - ctx.measureText('>1').width;
				ctx.rect(data.x, data.y, w, w);
			},
		});
		
		this.drawObject({
			fillStyle: '#222222',
			data: {'x': x, 'y': y, 'w': w},
			drawFunc: function (self, ctx, data) {
				var w = data.w - 3 - ctx.measureText('>1').width;
				var spcg = 3/2 * w;
				
				ctx.font = self.smallFontSize + "px " + self.fontFamily;
				ctx.fillText('>1', data.x + data.w - ctx.measureText('>1').width, 
					data.y + w/2 + spcg);
			},
		});
		
		this.drawObject({
			strokeStyle: '#222222', 
			fillStyle: '#3db34a',
			data: {'x': x, 'y': y, 'w': w},
			drawFunc: function (self, ctx, data) {
				var w = data.w - 3 - ctx.measureText('>1').width;
				var spcg = 3/2 * w;
				ctx.rect(data.x, data.y + spcg, w, w);
			},
		});
	}
});

/* helper functions */
function getGeneByPos(genes, pos, iMin, iMax){
	if (iMin == undefined)
		iMin = 0;
	if (iMax == undefined)
		iMax = genes.length - 1;
	
	if (iMin == iMax){
		var gene = genes[iMin];
		if (pos >= gene.coordinate && pos <= gene.coordinate + gene.length)
			return gene;
		else
			return undefined;
	}
	
	if (iMax - iMin == 1){
		return getGeneByPos(genes, pos, iMin, iMin) || getGeneByPos(genes, pos, iMax, iMax);
	}
		
	var i = Math.floor((iMin + iMax) / 2);
	if (pos < genes[i].coordinate)
		return getGeneByPos(genes, pos, iMin, i - 1);
	else
		return getGeneByPos(genes, pos, i, iMax);
}