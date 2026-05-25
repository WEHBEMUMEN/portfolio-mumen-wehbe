#!/usr/bin/env python
# coding: utf-8

# # Study of optimal design of a truss

# In[ ]:


import numpy as np
import libTruss
import libTruss_dev as libdev


# ## Set the geometry (mesh)

# In[10]:


l = 1.0
# mesh
Nodes = np.array([[0, 0], [l, 0], [l, l]])
Connectivity = np.array([[0, 1], [1, 2]])


# In[ ]:


libTruss.plotResults(Nodes, Connectivity, title='Truss',
                     options={'showNumPoints': True, 'showNumElem': True})


# ## Set Material properties

# In[ ]:


class material:
    def __init__(self):
        self.E = ...
        self.rho = ...
mat = material()
print('Young modulus:', mat.E)


# ## Building of the elementary stiffness matrix

# In[ ]:


stiff_elem = libdev.getElemBarStiffnessMatrix(...)


# ## Assembly of the global stiffness matrix

# In[ ]:


stiff_global = libdev.getGlobalStiffnessMatrix(...)    


# ## Finite Elements problem computation

# In[ ]:


solFE = libdev.solveFEProblem(...):


# ## Computation of stresses and strains in bars

# In[ ]:


stress_strain_elem = libdev.getElemStressStrain(...)


# In[ ]:


stress_strain = libdev.getStressStrain(...)


# ## Parametric analysis

# In[ ]:


mass_truss = libdev.getMassTruss(...)


# In[ ]:


valuesFE = libdev.parametricFE(...)


# ## Parametric gradients computations

# In[ ]:


grad_stiff =libdev.getGlobalStiffnessMatrixDerivative(...):


# In[ ]:


grad_sol = libdev.solveFEProblemGrad(...)


# ## Optimization

# In[ ]:




