

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var canvasWidth = 600;
var canvasHeight = 600;




//GLOBAL variables
let mouseMode = 'Neutral';
let plusOrMinus = '0';

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
var startingColumn = Math.round( columns/ 5);

var pixelWidth = canvasWidth/rows;
var pixelHeight = canvasHeight/columns;
	
//matrix[ Math.round((Math.random() * rows)) -1][Math.round( Math.random() * columns)-1] = 0;// Infect random tile 


function setup(){
	createCanvas( canvasWidth, canvasHeight);
	frameRate(10);
	
	//buttons
	
	let s1x = 50;
	let s1y = 100;
	
	quarantineButton1 = createButton("-");
	quarantineButton1.position( s1x, s1y);
	
	quarantineButton2 = createButton("Quarantine Strength");
	quarantineButton2.position( s1x + quarantineButton1.width, s1y);	
	
	quarantineButton3 = createButton("+");
	quarantineButton3.position( s1x + quarantineButton1.width + quarantineButton2.width, s1y);
	
	quarantineButton1.mousePressed( function(){settings["quarantineStrength"] = "-";});
	quarantineButton2.mousePressed( function(){settings["quarantineStrength"] = "0";});
	quarantineButton3.mousePressed( function(){settings["quarantineStrength"] = "+";});
	
	let s2x = 50;
	let s2y = 200;
	
	fightBackButton1 = createButton("-");
	fightBackButton1.position( s2x, s2y);
	
	fightBackButton2 = createButton("HealthCare facilities");
	fightBackButton2.position( s2x + fightBackButton1.width, s2y);	
	
	fightBackButton3 = createButton("+");
	fightBackButton3.position( s2x + fightBackButton1.width + fightBackButton2.width, s2y);
	
	fightBackButton1.mousePressed( function(){settings["fightBack"] = "-";});
	fightBackButton2.mousePressed( function(){settings["fightBack"] = "0";});
	fightBackButton3.mousePressed( function(){settings["fightBack"] = "+";});	

	let s3x = 50;
	let s3y = 300;
	
	borderButton1 = createButton("-");
	borderButton1.position( s3x, s3y);
	
	borderButton2 = createButton("Create Border");
	borderButton2.position( s3x + borderButton1.width, s3y);	
	
	borderButton3 = createButton("+");
	borderButton3.position( s3x + borderButton1.width + borderButton2.width, s3y);
	
	borderButton1.mousePressed( function(){settings["border"] = "-";});
	borderButton2.mousePressed( function(){settings["border"] = "0";});
	borderButton3.mousePressed( function(){settings["border"] = "+";});
	
	let s4x = 50;
	let s4y = 400;
	
	diseaseButton1 = createButton("-");
	diseaseButton1.position( s4x, s4y);
	
	diseaseButton2 = createButton("Disease");
	diseaseButton2.position( s4x + diseaseButton1.width, s4y);	
	
	diseaseButton3 = createButton("+");
	diseaseButton3.position( s4x + diseaseButton1.width + diseaseButton2.width, s4y);
	
	diseaseButton1.mousePressed( function(){settings["disease"] = "-";});
	diseaseButton2.mousePressed( function(){settings["disease"] = "0";});
	diseaseButton3.mousePressed( function(){settings["disease"] = "+";});
}


function draw(){
	background(51);

	mousexPixel = getMousePixels( pixelWidth, pixelHeight)[0];
	mouseyPixel = getMousePixels( pixelWidth, pixelHeight)[1];
	
	//matrix = colorCellWhite( matrix , mousexPixel, mouseyPixel);
	
	clear();
	colorMatrix(matrix, pixelWidth, pixelHeight);
	matrix = spread(matrix);
	
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
	}else if( settings["quarantineStrength"] == "-"){
		quarantineMatrix[mousexPixel][mouseyPixel] = quarantineMatrix[mousexPixel][mouseyPixel] - increment > 0 ? quarantineMatrix[mousexPixel][mouseyPixel] - increment : quarantineMatrix[mousexPixel][mouseyPixel];
	}	
	if (settings["fightBack"] == "+"){
		
		fightBackMatrix[mousexPixel][mouseyPixel] = fightBackMatrix[mousexPixel][mouseyPixel] + increment < 255 ? fightBackMatrix[mousexPixel][mouseyPixel] + increment : fightBackMatrix[mousexPixel][mouseyPixel];
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