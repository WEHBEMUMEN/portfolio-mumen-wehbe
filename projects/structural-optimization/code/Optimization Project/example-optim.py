#!/usr/bin/env python
# coding: utf-8

# # Examples of use of `scipy` library
# 
# 

# In[ ]:


import scipy.optimize as opt
import numpy as np


# ## Considered problem
# $$\begin{align}
# \min_{x_0,x_1} &f(x)\\
# \text{subject to}&\begin{cases}
# x_0+2x_1\leq1\\
# x_0^2+x_1\leq1\\
# x_0^2-x_1\leq1\\
# 2x_0+x_1=1\\
# 0\leq x_0\leq1\\
# -0.5\leq x_1\leq 2
# \end{cases}
# \end{align}$$
# 
# avec $f(\mathbf{x})=100(x_1-x_0^2)^2+(1-x_0)^2$

# ## Definition of the objective function (and gradient)

# In[ ]:


funObj= lambda x: 100*(x[1]-x[0]**2)**2 + (1-x[0])**2
funGradObj=lambda x: np.array([-400*x[0]*(x[1]-x[0]**2)-2*(1-x[0]),200*(x[1]-x[0]**2)])


# In[ ]:


import matplotlib.pyplot as plt


# In[ ]:


gX,gY=np.meshgrid(np.linspace(-2,2,100),np.linspace(-1,3,100))
gZ = funObj([gX,gY])
plt.contour(gX,gY,gZ,100)
plt.xlabel('x_0')
plt.ylabel('x_1')
plt.title('Contour plot of Rosenbrock function')

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
surface = ax.plot_surface(gX,gY,gZ, cmap='inferno', linewidth=0, antialiased=False)

fig.colorbar(surface, shrink=0.7, aspect=10)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D surface plot of Rosenbrock function')

plt.show()


# In[ ]:


gX,gY=np.meshgrid(np.linspace(0,1,100),np.linspace(-0.5,2,100))
gZ = funObj([gX,gY])
plt.contour(gX,gY,gZ,100)
plt.xlabel('x_0')
plt.ylabel('x_1')
plt.title('Contour plot of Rosenbrock function')

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
surface = ax.plot_surface(gX,gY,gZ, cmap='inferno', linewidth=0, antialiased=False)

fig.colorbar(surface, shrink=0.7, aspect=10)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('3D surface plot of Rosenbrock function')

plt.show()


# ## Definition of constraints

# ### 1. with provided gradients
# 

# In[ ]:


ineq_cons_w_grad = {'type': 'ineq',
             'fun' : lambda x: np.array([1 - x[0] - 2*x[1],
                                         1 - x[0]**2 - x[1],
                                         1 - x[0]**2 + x[1]]),
             'jac' : lambda x: np.array([[-1.0, -2.0],
                                         [-2*x[0], -1.0],
                                         [-2*x[0], 1.0]])}

eq_cons_w_grad = {'type': 'eq',
           'fun' : lambda x: np.array([2*x[0] + x[1] - 1]),
           'jac' : lambda x: np.array([2.0, 1.0])}


# ### 2. without gradients

# In[ ]:


ineq_cons_wo_grad = {'type': 'ineq',
             'fun' : lambda x: np.array([1 - x[0] - 2*x[1],
                                         1 - x[0]**2 - x[1],
                                         1 - x[0]**2 + x[1]])}

eq_cons_wo_grad = {'type': 'eq',
           'fun' : lambda x: np.array([2*x[0] + x[1] - 1])}


# ## Run of optimization

# ### Set of parameters bounds

# In[ ]:


# bounds = opt.Bounds([0, -0.5], [1.0, 2.0])
bounds = [(0,1),(-0.5,2)]


# ### Execution of gradient-based optimization

# In[ ]:


## 
x0 = np.array([0.5, 0])
res = opt.minimize(funObj,
                x0, 
               method='SLSQP', 
               jac=funGradObj,
               constraints=[eq_cons_w_grad, ineq_cons_w_grad], 
               options={'ftol': 1e-9, 'disp': True},
               bounds=bounds)
print(res)


# ### Execution of optimization without gradients

# In[ ]:


## 
x0 = np.array([0.5, 0])
res = opt.minimize(funObj,
                x0, 
               method='SLSQP', 
               jac=None,
               constraints=[eq_cons_wo_grad, ineq_cons_wo_grad], 
               options={'ftol': 1e-9, 'disp': True},
               bounds=bounds)
print(res)


# ### Extract optimization data along iterations

# #### Class for storage

# In[ ]:


class objStore:
    def __init__(self):
        self.x=[]
        self.fun=[]
    def store(self,x,f):
        self.x.append(x)
        self.fun.append(f)
data = objStore()


# ### modification of the objective function to store the data

# In[ ]:


def funObjMod(x):
    f = funObj(x)
    data.store(x,f)
    return f


# ### Run optimization

# In[ ]:


x0 = np.array([0.5, 0])
res = opt.minimize(funObjMod,
                x0, 
               method='SLSQP', 
               jac=None,
               constraints=[eq_cons_wo_grad, ineq_cons_wo_grad], 
               options={'ftol': 1e-9, 'disp': True},
               bounds=bounds)
print(res)


# In[ ]:


print(data.x)


# In[ ]:


plt.step(range(len(data.x)),data.fun,where='post')
plt.xlabel('Iteration')
plt.ylabel('Objective value')


# In[ ]:




