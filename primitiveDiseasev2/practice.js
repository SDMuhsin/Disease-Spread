

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

function colorMatrix(matrix,pixelWidth,pixelHeight){
	for( var i = 0; i < rows; i++){
		for( var j = 0; j < columns; j++){
			fill(matrix[i][j]); // fill the next shape drawn with this color
			rect( i * pixelWidth, j * pixelHeight , (i+1) * pixelWidth, (j + 1)*pixelHeight  );// Draw a square
		}
	}
}

function spread(matrix){
	
	//Create a 2D array
	var newMatrix = new Array(rows);
	for( var i = 0; i < rows; i++){
		newMatrix[i] = new Array(columns);
	}
	
	for( var i = 0; i < rows; i++){
		for( var j = 0; j < columns; j++){
			
			if(matrix[i][j] < 255 && matrix[i][j] > 0){
				matrix[i][j] = matrix[i][j] - 1; // If tile is already infected, infect further
			}
			if( i>0 && i < rows-1 && j > 0 && j <columns-1 && matrix[i][j] > 0){ 
				
				adjacentInfection = 255*4 - matrix[i-1][j] - matrix[i+1][j] - matrix[i][j-1] - matrix[i][j+1];
				adjacentInfection = Math.round( adjacentInfection / 4 - fightBackMatrix[i][j]);
				
				
				newMatrix[i][j] = matrix[i][j] - adjacentInfection/16 > 0 ? matrix[i][j] - (adjacentInfection/16) : 0;
			}
			else{
				newMatrix[i][j] = matrix[i][j];
			}
		}
	}
	return newMatrix;
}

//GLOBAL variables	
var rows = 100;
var columns = rows;
var matrix = createColorMatrix(rows,columns,255);

var pixelWidth = canvasWidth/rows;
var pixelHeight = canvasHeight/columns;
	
matrix[Math.round((Math.random() * rows)) -1][Math.round( Math.random() * columns)-1] = 0;// Infect random tile 

let fightBackMatrix = createColorMatrix(rows,columns, 0); 

var startingRow = 0;
var startingColumn = 0;
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
