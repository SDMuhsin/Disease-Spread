import matplotlib.pyplot as plt
import numpy as np
import random
import math
import matplotlib.animation as animation
def finiteprob(x,y): #60 percent probability funcion, if random.randint is not desired 
    num=math.floor(random.random() * 100)
    if (num>=0 and num<=59):
        return x
    else:
        return y
  

def probability(val):
    #We will use this function to assign a probability of recovery or death depending on the availability of healthcare services
    if(val>2):
        num=math.floor(random.random()*100)
        if (num>=0 and num<=59):
            return(3) #60 percent chance of recovery if there are enough health facilities available
        else:
            return(4) #40 percent chance of death despite having enough health facilities
    else:
        return(4) #100 percent chance of death if there are not enough health facilities

def plots(sa,ia,ra):
    days=np.linspace(1,10,48)
    plt.plot(sa,days, label='for st')
    plt.plot(ia,days, label='for it')
    plt.plot(ra,days, label='for rt')  
    plt.legend()
    plt.show() #The animation is causing the plots to hang. This needs to be debugged.'''
class matrix:
    def __init__(self):
        self.value=0
        self.quart=finiteprob(0,1)#Quart to initiate quarantine. If zero, the person is susceptible to getting infected else, they stay healthy
        self.health=finiteprob(0,1)#0 for no facilities 1 for availability of facilities
    def quarantine(self):
        if(self.quart==0):
            self.quart=1 #Setting Quarantine
            
        
def start(narray):
    global S,I,R,N,st,it,rt,sa,ia,ra
    sa=[]
    ia=[]
    ra=[]
    newmatrix=narray.copy()
    for i in range(1,49):
        for j in range(1,49):
            if(narray[i][j].quart==0 and narray[i][j].value==0):#Healthy and Not Quarantined puts the person in risk of getting symptoms
                S+=1
                if(narray[i+1][j].value!=0 or narray[i-1][j].value!=0 or narray[i][j+1].value!=0 or narray[i][j-1].value!=0):
                    newmatrix[i][j].value=1 #give symptom

            elif(narray[i][j].value==1):#Symptom
                I+=1
                newmatrix[i][j].value=2
                newmatrix[i][j].quarantine()
            #CASE 3 if there is a disease, since we have to rely on health facilities
            elif(narray[i][j].value==2):
                R+=1
                s=narray[i+1][j].health + narray[i-1][j].health + narray[i][j+1].health + narray[i][j-1].health
                newmatrix[i][j].value=probability(s)
            
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
    valmatrix=np.array([[newmatrix[i][j].value for i in range(0,50)] for j in range(0,50)])
    gifarray.append([plt.imshow(valmatrix)])       
    return(newmatrix)
#creating random matrix and plotting
global narray
narray=np.array([[matrix() for j in range(0,50)] for i in range(0,50)])
narray[24][24].value=2
narray[4][4].value=1
narray[27][26].value=2
narray[24][30].value=1
narray[20][24].value=1
narray[44][24].value=2
narray[15][47].value=2
fig,ax=plt.subplots()
x=ax.imshow(np.array([[narray[i][j].value for i in range(0,50)] for j in range(0,50)]))
ax.set_title('Healthy Susceptible and Affected')
plt.show()
fig,ax=plt.subplots()
y=ax.imshow(np.array([[narray[i][j].quart for i in range(0,50)] for j in range(0,50)]))
ax.set_title('Quarantine State')
plt.show()
fig,ax=plt.subplots()
z=ax.imshow(np.array([[narray[i][j].health for i in range(0,50)] for j in range(0,50)]))
ax.set_title('Health facilities')
plt.show()
fig=plt.figure()
print(narray)
gifarray=[]
#gifplot=[]
beta=0.071 #infection rate
gamma= 0.16 #recovery rate
S=0
I=0
R=0
repno=float(beta/gamma) #reproduction number
for j in range(0,100):
    narray=start(narray)

#plot the animation right after this j loop, it works
#ani2=animation.ArtistAnimation(fig2,gifplot,interval=200, blit=True,repeat_delay=10)
ani=animation.ArtistAnimation(fig, gifarray, interval=1000, blit=True,repeat_delay=10)
plt.show()
plt.close()
print(gifarray)
print("Total Susceptible samples ",S*48,"\n Total infected samples ",I*48,"\n Total Recovered/Dead samples ",R*48,"\n Total number of samples ",N*48)
s1=np.array(sa)
i1=np.array(ia)
r1=np.array(ra)
plots(s1,i1,r1)
            
            
            
            
            
                
                


