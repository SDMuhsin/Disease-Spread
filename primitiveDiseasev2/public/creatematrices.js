
function createColorMatrix( rows, columns, color){
	
	//Make a 2D array
	var matrix = new Array(rows);
	for( var i = 0; i < columns; i++ ){
		matrix[i] = new Array(columns);
	}
	
	//Initialise colour
	for( var i = 0; i < rows; i++){
		for(var j = 0; j < columns; j++){
			matrix[i][j] =  color;
		}
	}
	
	// infect a random tile ( color 0)
	
	return matrix;
}