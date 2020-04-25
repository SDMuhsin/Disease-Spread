

function spread(matrix){
	
	//Create a 2D array
	var newMatrix = new Array(rows);
	for( var i = 0; i < rows; i++){
		newMatrix[i] = new Array(columns);
	}
	
	
	for( var i = 0; i < rows; i++){
		for( var j = 0; j < columns; j++){
			
			if( i > startingColumn){
				if(borderMatrix[i][j] == 0){
					if(matrix[i][j] < 255 && matrix[i][j] > 0){
						matrix[i][j] = matrix[i][j] - 1; // If tile is already infected, infect further
					}
					if( i>0 && i < rows-1 && j > 0 && j <columns-1 && matrix[i][j] > 0){ 
						
						adjacentInfection = 255*4 - matrix[i-1][j] - matrix[i+1][j] - matrix[i][j-1] - matrix[i][j+1];
						adjacentInfection = Math.round(  adjacentInfection / 4 -  2*fightBackMatrix[i][j]);
						adjacentInfection = Math.round( ((265 - quarantineMatrix[i][j])/265) * adjacentInfection);
						
						newMatrix[i][j] = matrix[i][j] - adjacentInfection/16 > 0 ? matrix[i][j] - (adjacentInfection/16) : 0;
					}
					else{
						newMatrix[i][j] = matrix[i][j];
					}
				}else{
					newMatrix[i][j] = 255;
				}
			}
			else{
				newMatrix[i][j] = matrix[i][j];
			}
		}
	}
	return newMatrix;
}