import matplotlib.pyplot as plt
import numpy as np
import random
import imageio
import matplotlib.animation as animation
def plots(sa,ia,ra):
    days=np.linspace(1,10,2304)
    plt.plot(sa,days, label='for st')
    plt.plot(ia,days, label='for it')
    plt.plot(ra,days, label='for rt')  
    plt.legend()
    plt.show() #The animation is causing the plots to hang. This needs to be debugged. (EDIT: Solved)
    
def start(narray):
    global S,I,R,N,st,it,rt,sa,ia,ra
    sa=[]
    ia=[]
    ra=[]
    newmatrix=narray.copy()
    for i in range(1,49):
        for j in range(1,49):
            if(narray[i][j]==0):#Healthy/Susceptible
                S+=1
                if(narray[i+1][j]!=0 or narray[i-1][j]!=0 or narray[i][j+1]!=0 or narray[i][j-1]!=0):
                    newmatrix[i][j]=1 #give symptom

            elif(narray[i][j]==1):#Symptom
                I+=1
                newmatrix[i][j]=2
                '''if(narray[i+1][j]==2)
                    newmatrix[i][j]=2 #give disease
                
                elif(narray[i-1][j]==2):
                    newmatrix[i][j]=2
                elif(narray[i][j+1]==2):
                    newmatrix[i][j]=2
                elif(narray[i][j-1]==2):
                    newmatrix[i][j]=2'''
            #CASE 3 if there is a disease, since we have no cure, pass
            elif(narray[i][j]==2):
                R+=1
                newmatrix[i][j]=random.randint(3,4) #3 for recovery, 4 for death
            
            N=S+I+R
            st=S/N
            it=I/N
            rt=R/N
            eq1=-beta*st*it
            eq2=beta*st*it-gamma*it
            eq3=gamma*it
            sa.append(eq1) 
            ia.append(eq2)
            ra.append(eq3)
            
    gifarray.append([plt.imshow(newmatrix)])       
    return(newmatrix)
#creating random matrix and plotting
global narray
narray=np.array([[0 for j in range(0,50)] for i in range(0,50)])
narray[24][24]=2
plt.imshow(narray)
fig=plt.figure()
print(narray)
gifarray=[]
#gifplot=[]
beta=0.57 #infection rate
gamma= 0.1 #recovery rate
S=0
I=0
R=0
repno=float(beta/gamma) #reproduction number
for j in range(0,100):
    narray=start(narray)

#plot the animation right after this j loop, it works
#ani2=animation.ArtistAnimation(fig2,gifplot,interval=200, blit=True,repeat_delay=10)
ani=animation.ArtistAnimation(fig, gifarray, interval=200, blit=True,repeat_delay=10)
plt.show()
plt.close()
print(gifarray)
print(S,I,R,N)
s1=np.array(sa)
i1=np.array(ia)
r1=np.array(ra)
plots(s1,i1,r1)

            
            
            
            
            
                
                


