

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var canvasWidth = 600;
var canvasHeight = 600;




//GLOBAL variables

let economy = 0;

let settings = {
	"quarantineStrength":"0",
	"fightBack":"0",
	"border":"0",
	"disease":"0"
}
	
var rows = 60;
var columns = rows;

var matrix = createColorMatrix(rows,columns,255); // Disease strength

var quarantineMatrix = createColorMatrix(rows, columns, 0);
quarantineMatrix[48][48] = 255;
quarantineMatrix[47][48] = 255;
quarantineMatrix[46][48] = 255;

let fightBackMatrix = createColorMatrix( rows, columns, 0); 
let borderMatrix = createColorMatrix( rows, columns, 0);

var startingRow = 0;
var startingColumn = 2;

var pixelWidth = canvasWidth/rows;
var pixelHeight = canvasHeight/columns;
	
//matrix[ Math.round((Math.random() * rows)) -1][Math.round( Math.random() * columns)-1] = 0;// Infect random tile 

let qs2;
let fb2;
let cb2;
let d2;

let e;
function setup(){
	createCanvas( canvasWidth, canvasHeight);
	
	frameRate(5);
	
	//economy
	let s0x = 50;
	let s0y = 10;
	
	eLabel = createP("Loss to economy :");
	eLabel.position( s0x, s0y);
	
	e = createInput();
	e.value(economy);
	e.position( s0x, s0y +  20 +eLabel.height);
	
	//buttons
	
	let s1x = 50;
	let s1y = 140;
	
	quarantineButton1 = createButton("-");
	quarantineButton1.position( s1x, s1y);
	
	quarantineButton2 = createButton("0");
	quarantineButton2.position( s1x + quarantineButton1.width, s1y);	
	
	quarantineButton3 = createButton("+");
	quarantineButton3.position( s1x + quarantineButton1.width + quarantineButton2.width, s1y);
	
	quarantineButton1.mousePressed( function(){settings["quarantineStrength"] = "-";});
	quarantineButton2.mousePressed( function(){settings["quarantineStrength"] = "0";});
	quarantineButton3.mousePressed( function(){settings["quarantineStrength"] = "+";});
	
	qs = createDiv("Qurantine Strength");
	qs.position( s1x, s1y - 1.5 * qs.height);
	
	qs2 = createInput(); 
	qs2.position( s1x + quarantineButton1.width + quarantineButton2.width + quarantineButton3.width , s1y );
	qs2.value("Mode "+ settings["quarantineStrength"]);
	
	let s2x = 50;
	let s2y = 240;
	
	fightBackButton1 = createButton("-");
	fightBackButton1.position( s2x, s2y);
	
	fightBackButton2 = createButton("0");
	fightBackButton2.position( s2x + fightBackButton1.width, s2y);	
	
	fightBackButton3 = createButton("+");
	fightBackButton3.position( s2x + fightBackButton1.width + fightBackButton2.width, s2y);
	
	fightBackButton1.mousePressed( function(){settings["fightBack"] = "-";});
	fightBackButton2.mousePressed( function(){settings["fightBack"] = "0";});
	fightBackButton3.mousePressed( function(){settings["fightBack"] = "+";});	

	fb = createDiv("Healthcare facilities");
	fb.position( s2x, s2y - 1.5 * fb.height);
	
	fb2 = createInput(); 
	fb2.position( s2x + fightBackButton1.width + fightBackButton2.width + fightBackButton3.width , s2y );
	fb2.value("Mode "+ settings["fightBack"]);
	
	let s3x = 50;
	let s3y = 340;
	
	borderButton1 = createButton("-");
	borderButton1.position( s3x, s3y);
	
	borderButton2 = createButton("0");
	borderButton2.position( s3x + borderButton1.width, s3y);	
	
	borderButton3 = createButton("+");
	borderButton3.position( s3x + borderButton1.width + borderButton2.width, s3y);
	
	borderButton1.mousePressed( function(){settings["border"] = "-";});
	borderButton2.mousePressed( function(){settings["border"] = "0";});
	borderButton3.mousePressed( function(){settings["border"] = "+";});

	cb = createDiv("Create Border");
	cb.position( s3x, s3y - 1.5 * cb.height);
	
	cb2 = createInput(); 
	cb2.position( s3x + borderButton1.width + borderButton2.width + borderButton3.width , s3y );
	cb2.value("Mode "+ settings["border"]);	
	
	let s4x = 50;
	let s4y = 440;
	
	diseaseButton1 = createButton("-");
	diseaseButton1.position( s4x, s4y);
	
	diseaseButton2 = createButton("0");
	diseaseButton2.position( s4x + diseaseButton1.width, s4y);	
	
	diseaseButton3 = createButton("+");
	diseaseButton3.position( s4x + diseaseButton1.width + diseaseButton2.width, s4y);
	
	diseaseButton1.mousePressed( function(){settings["disease"] = "-";});
	diseaseButton2.mousePressed( function(){settings["disease"] = "0";});
	diseaseButton3.mousePressed( function(){settings["disease"] = "+";});
	
	ds = createDiv("Inject Disease");
	ds.position( s4x, s4y - 1.5 * ds.height);
	
	ds2 = createInput(); 
	ds2.position( s4x + diseaseButton1.width + diseaseButton2.width + diseaseButton3.width , s4y );
	ds2.value("Mode "+ settings["disease"]);	
}


function draw(){
	background(51);

	mousexPixel = getMousePixels( pixelWidth, pixelHeight)[0];
	mouseyPixel = getMousePixels( pixelWidth, pixelHeight)[1];
	
	//matrix = colorCellWhite( matrix , mousexPixel, mouseyPixel);
	
	clear();
	colorMatrix(matrix, pixelWidth, pixelHeight);
	matrix = spread(matrix);
	
	qs2.value(" Current Mode :" + settings["quarantineStrength"]);
	fb2.value(" Current Mode :" + settings["fightBack"]);
	cb2.value(" Current Mode :" + settings["border"]);
	ds2.value(" Current Mode :" + settings["disease"]);
	e.value(economy);
}

function mouseClicked(){
	mousexPixel = getMousePixels( pixelWidth, pixelHeight)[0];
	mouseyPixel = getMousePixels( pixelWidth, pixelHeight)[1];
	
	//fightBackMatrix = colorCellWhite( fightBackMatrix, mousexPixel, mouseyPixel );
}

function mouseDragged(){
	
	mousexPixel = getMousePixels( pixelWidth, pixelHeight)[0];
	mouseyPixel = getMousePixels( pixelWidth, pixelHeight)[1];	
	
	let increment = 50;
	
	if (settings["quarantineStrength"] == "+"){
		
		quarantineMatrix[mousexPixel][mouseyPixel] = quarantineMatrix[mousexPixel][mouseyPixel] + increment < 255 ? quarantineMatrix[mousexPixel][mouseyPixel] + increment : quarantineMatrix[mousexPixel][mouseyPixel];
		
		economy -= 500;
		
	}else if( settings["quarantineStrength"] == "-"){
		quarantineMatrix[mousexPixel][mouseyPixel] = quarantineMatrix[mousexPixel][mouseyPixel] - increment > 0 ? quarantineMatrix[mousexPixel][mouseyPixel] - increment : quarantineMatrix[mousexPixel][mouseyPixel];
		economy += 400;
	}	
	if (settings["fightBack"] == "+"){
		
		fightBackMatrix[mousexPixel][mouseyPixel] = fightBackMatrix[mousexPixel][mouseyPixel] + increment < 255 ? fightBackMatrix[mousexPixel][mouseyPixel] + increment : fightBackMatrix[mousexPixel][mouseyPixel];
		economy -= 5000;
	}else if( settings["fightBack"] == "-"){
		fightBackMatrix[mousexPixel][mouseyPixel] = fightBackMatrix[mousexPixel][mouseyPixel] - increment > 0 ? fightBackMatrix[mousexPixel][mouseyPixel] - increment : fightBackMatrix[mousexPixel][mouseyPixel];
	}	
	if (settings["border"] == "+"){
		
		borderMatrix[mousexPixel][mouseyPixel] = 255;
	}else if( settings["border"] == "-"){
		borderMatrix[mousexPixel][mouseyPixel] = 0;
	}	
	if (settings["disease"] == "+"){
		
		matrix[mousexPixel][mouseyPixel] = 0;
	}else if( settings["disease"] == "-"){
		matrix[mousexPixel][mouseyPixel] = 255;
	}
	
	
}