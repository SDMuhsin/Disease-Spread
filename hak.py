import matplotlib.pyplot as plt
import numpy as np
import random
import imageio
import matplotlib.animation as animation
#creating random matrix and plotting
global narray
narray=np.array([[0 for j in range(0,50)] for i in range(0,50)])
narray[2][5]=2
fig=plt.figure()
plt.imshow(narray)
plt.show()
print(narray)
gifarray=[]
newmatrix=[[0 for j in range(0,50)] for i in range(0,50)]
'''We define 0 as no disease, 1 as symptom and 2 as infected.
If the cell has no disease, it stays that way. if it has a symptom then the
neighboring cells also develop the symptoms, if they don't have the disease
and if they have the disease, then the cell gets the disease'''
def start(narray):
    for i in range(1,49):
        for j in range(1,49):
            if(narray[i][j]==0): #Healthy
                if(narray[i+1][j]!=0):
                    newmatrix[i][j]=1 #give symptom
                elif(narray[i-1][j]!=0):
                    newmatrix[i][j]=1
                elif(narray[i][j+1]!=0):
                    newmatrix[i][j]=1
                elif(narray[i][j-1]!=0):
                    narray[i][j]=1
            elif(narray[i][j]==1 or newmatrix[i][j]==1):#Symptom
                newmatrix[i][j]=2
                '''if(narray[i+1][j]==2):
                    newmatrix[i][j]=2 #give disease
                
                elif(narray[i-1][j]==2):
                    newmatrix[i][j]=2
                elif(narray[i][j+1]==2):
                    newmatrix[i][j]=2
                elif(narray[i][j-1]==2):
                    newmatrix[i][j]=2'''
            #CASE 3 if there is a disease, since we have no cure, pass
            elif(narray[i][j]==2):
                newmatrix[i][j]=2
    gifarray.append([plt.imshow(newmatrix)])
    return(newmatrix)
for j in range(0,10):
    narray=start(narray)
    
ani=animation.ArtistAnimation(fig, gifarray, interval=200, blit=True,repeat_delay=10)
plt.show()
plt.close()
print(gifarray)


            
            
            
            
            
                
                


