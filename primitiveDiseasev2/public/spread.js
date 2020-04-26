
function nInHundred(n){
	
	var i = Math.round((Math.random() * 100 ));

	if( i < n){
		return true;
	}else{
		return false;
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
			
			if( i > startingColumn){
				if(borderMatrix[i][j] == 0){
					if(matrix[i][j] < 255 && matrix[i][j] > 20){
						
						matrix[i][j] = matrix[i][j] - Math.round(20*((255 - quarantineMatrix[i][j])/255) + 0.4); // If tile is already infected, infect further
					}

					if( i>0 && i < rows-1 && j > 0 && j <columns-1 && matrix[i][j] > 0){ 
						
						if( matrix[i-1][j] < 255 || matrix[i+1][j] <255 || matrix[i][j-1] < 255 || matrix[i][j+1] < 255){
							
							n = 4 * 255 - matrix[i-1][j] - matrix[i+1][j] - matrix[i][j-1] - matrix[i][j+1];
							n = Math.round( 100 * (n/(4 * 255)));
							
							// Being quarantined helps lower risk of infection
							decreaseOddsBy = Math.round(((quarantineMatrix[i][j]/255) - 0.2)*n); 
							if( n > decreaseOddsBy){
								n -= decreaseOddsBy;
							}else{
								n = 0;
							}
							if( nInHundred(n)){
								newMatrix[i][j] = matrix[i][j] - 1;
							}else{
								newMatrix[i][j] = matrix[i][j];
							}
						}else{
							newMatrix[i][j] = matrix[i][j];
						}
						
					}
					else{
						newMatrix[i][j] = matrix[i][j];
					}
					
					//Cure
					var cureBy = 4;
					if( fightBackMatrix[i][j] > 0){						
						if(fightBackMatrix[i][j] + newMatrix[i][j] > 255){
							newMatrix[i][j] = 255;
						}else{
							newMatrix[i][j] = newMatrix[i][j] + fightBackMatrix[i][j];
						}
					}
					//cure adjacent
					if (nInHundred( Math.round(40 * fightBackMatrix[i][j]/255))){
						if(fightBackMatrix[i+1][j] + cureBy < 255){
							fightBackMatrix[i+1][j] += cureBy;
						}
					}
					if (nInHundred( Math.round(40 * fightBackMatrix[i][j]/255))){
						if(fightBackMatrix[i-1][j] + cureBy < 255){
						fightBackMatrix[i-1][j] += cureBy;
						}
					}
					if (nInHundred( Math.round(40 * fightBackMatrix[i][j]/255))){
						if(fightBackMatrix[i][j+1] + cureBy < 255){
						fightBackMatrix[i][j+1] += cureBy;
						}
					}
					if (nInHundred( Math.round(40 * fightBackMatrix[i][j]/255))){
						if(fightBackMatrix[i][j-1] + cureBy < 255){
						fightBackMatrix[i][j-1] = cureBy;
						}
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