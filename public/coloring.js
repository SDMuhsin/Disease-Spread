
function colorCellWhite( matrix, xPixel, yPixel ){
	
	if (xPixel > startingRow){
		matrix[ xPixel][yPixel] = 255;
	}
	return matrix;
}
function colorMatrix(matrix,pixelWidth,pixelHeight){
	for( var i = 0; i < rows; i++){
		for( var j = 0; j < columns; j++){
			
			stroke( quarantineMatrix[i][j], fightBackMatrix[i][j], borderMatrix[i][j], 255);

			fill(matrix[i][j]); // fill the next shape drawn with this color
			if(borderMatrix[i][j] == 255){
				fill( 0, 0, borderMatrix[i][j], 255);
			}
			rect( i * pixelWidth, j * pixelHeight , (i+1) * pixelWidth, (j + 1)*pixelHeight  );// Draw a square
		}
	}
}
