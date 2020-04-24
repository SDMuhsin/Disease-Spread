

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var canvasWidth = 600;
var canvasHeight = 600;


function preload(){
	print("preload");
	
}
function setup(){
	createCanvas( canvasWidth, canvasHeight);
	frameRate(10);
}


//GLOBAL variables	
var rows = 50;
var columns = rows;

var matrix = createColorMatrix(rows,columns,255); // Disease strength

var quarantineMatrix = createColorMatrix(rows, columns, 0);
quarantineMatrix[48][48] = 255;
quarantineMatrix[47][48] = 255;
quarantineMatrix[46][48] = 255;

var startingRow = 0;
var startingColumn = Math.round( columns/ 5);

var pixelWidth = canvasWidth/rows;
var pixelHeight = canvasHeight/columns;
	
matrix[ Math.round((Math.random() * rows)) -1][Math.round( Math.random() * columns)-1] = 0;// Infect random tile 

let fightBackMatrix = createColorMatrix(rows,columns, 0); 



function draw(){
	background(51);

	mousexPixel = getMousePixels( pixelWidth, pixelHeight)[0];
	mouseyPixel = getMousePixels( pixelWidth, pixelHeight)[1];
	
	matrix = colorCellWhite( matrix , mousexPixel, mouseyPixel);
	
	clear();
	colorMatrix(matrix, pixelWidth, pixelHeight);
	matrix = spread(matrix);
	
}

function mouseClicked(){
	mousexPixel = getMousePixels( pixelWidth, pixelHeight)[0];
	mouseyPixel = getMousePixels( pixelWidth, pixelHeight)[1];
	
	fightBackMatrix = colorCellWhite( fightBackMatrix, mousexPixel, mouseyPixel );
}
