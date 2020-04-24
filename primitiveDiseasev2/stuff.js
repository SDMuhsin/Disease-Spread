
// Get pixel touched by mouse

class MouseCords{
	
	constructor(x,y){
		this.x = 0;
		this.y = 0;
		
		this.xPixel = 0;
		this.yPixel = 0;
	}
	
	latchCurrentCords( pixelWidth, pixelHeight){
		this.x = mouseX;
		this.y = mouseY;
		
		this.xPixel = (mouseX < 0 || mouseX > canvasWidth ) ?  0 : Math.round( mouseX / pixelWidth ); 
		this.yPixel = (mouseY < 0 || mouseY > canvasHeight ) ?  0 : Math.round( mouseY / pixelHeight ); 
	}
	

}

function getMousePixels( pixelWidth, pixelHeight){
	
	return [ mouseX > startingColumn*pixelWidth && mouseX < canvasWidth ? Math.round((mouseX - pixelWidth/2)/pixelWidth):0, mouseY > 0 && mouseY < canvasHeight ? Math.round((mouseY - pixelHeight/2)/pixelWidth):0 ]
}
