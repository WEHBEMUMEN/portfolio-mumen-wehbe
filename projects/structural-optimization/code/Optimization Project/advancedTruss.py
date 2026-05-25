#!/usr/bin/env python
# coding: utf-8

# In[1]:


import numpy as np
import libTruss


# ## Material

# In[2]:


class materials:
    def __init__(self):  # , nu, rho):
        self.E = 210e9
        self.sigl = 250e6
        self.rho = 7860


mat = materials()


# ## Geometry

# In[3]:


Nodes = np.array([[0,0],
                  [16,0],
                  [16,12],
                  [32,0],
                  [32,12]])
Nodes = Nodes*12
# build connectivity
Connectivity = np.array([[0,2],
                         [0,1],
                         [1,2],
                         [2,4],
                         [2,3],
                         [1,4],
                         [1,3],
                         [3,4]])


# In[4]:


# show mesh
libTruss.plotResults(Nodes, Connectivity, scaleFactor=1,
                     options={'showNumPoints':True,'showNumElem':True})
print('Number of nodes : {}'.format(Nodes.shape[0]))
print('Number of elements : {}'.format(Connectivity.shape[0]))


# In[5]:


# boundary conditions
forceBC = [{"type": "nodes", "nodes": [1], "value": np.array([0, -100e4])},
         {"type": "nodes", "nodes": [4], "value": np.array([50e4, 0])}]
dispBC = {"type": "nodes", "nodes": [0,3], "value": np.array([0, 0])}


# In[6]:


# show mesh
libTruss.plotResults(Nodes, Connectivity, scaleFactor=1,
                     bc={'force':forceBC,'disp':dispBC},
                     options={'showNumPoints':True,'showNumElem':True})


# ## Results

# In[7]:


Ufull = np.array(
    [
        0.0,
        0.0,
        0.02086667,
        -0.14948631,
        0.00388765,
        -0.10438988,
        0.0,
        0.0,
        0.0078686,
        -0.023475,
    ]
)
Ffull = np.array(
    [
        1.88437500e05,
        3.12500000e05,
        7.27595761e-12,
        -1.00000000e06,
        -1.45519152e-11,
        -4.80673973e-10,
        -6.88437500e05,
        6.87500000e05,
        5.00000000e05,
        -1.16415322e-10,
    ]
)


# In[9]:


# post-processing
stressElem = libTruss.postProcess(Nodes, Connectivity, Ffull, Ufull, mat, type="stress")
strainElem = libTruss.postProcess(Nodes, Connectivity, Ffull, Ufull, mat, type="strain")


# In[10]:


# plot results
SCALEFACTOR = 1e2
libTruss.plotResults(Nodes, Connectivity, Ufull, scaleFactor=SCALEFACTOR)
libTruss.plotResults(Nodes, Connectivity, Ufull, stressElem, title="Stress", scaleFactor=1)
libTruss.plotResults(Nodes, Connectivity, Ufull, strainElem, title="Strain", scaleFactor=1)


# In[ ]:




