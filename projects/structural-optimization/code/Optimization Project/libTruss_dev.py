import numpy as np
import scipy.linalg as la
from loguru import logger

# -----------------------------------------------------------------------------
# 4.1 Stiffness matrix of an element bar
# -----------------------------------------------------------------------------
def getElemBarStiffnessMatrix(Node1, Node2, E, S):
    """
    Computes the elementary stiffness matrix for a 2D bar element.
    Ref: Eq (1)
    """
    # Vector forming the bar
    v = Node2 - Node1
    l_bar = np.linalg.norm(v)  # Length of the bar
    
    # Avoid division by zero
    if l_bar == 0:
        raise ValueError("Bar length is zero.")

    # Direction cosines (c = cos, s = sin)
    c = v[0] / l_bar
    s = v[1] / l_bar
    
    # Stiffness coefficient (E * S / L)
    k = (E * S) / l_bar
    
    # Transformation matrix components
    # K_elem structure:
    # [ c^2  cs -c^2 -cs ]
    # [ cs   s^2 -cs -s^2]
    # [ ...              ]
    
    mat_coeff = np.array([
        [c**2,  c*s,   -c**2, -c*s],
        [c*s,   s**2,  -c*s,  -s**2],
        [-c**2, -c*s,  c**2,  c*s],
        [-c*s,  -s**2, c*s,   s**2]
    ])
    
    return k * mat_coeff

# -----------------------------------------------------------------------------
# 4.2 Assembly of the global stiffness matrix
# -----------------------------------------------------------------------------
def getGlobalStiffnessMatrix(Nodes, Connectivity, E, Areas):
    """
    Assembles the global stiffness matrix K.
    Ref: Eq (6)
    """
    nNodes = Nodes.shape[0]
    nDof = nNodes * 2
    K_global = np.zeros((nDof, nDof))
    
    # Loop over all elements
    for iElem, elem_nodes in enumerate(Connectivity):
        idx1, idx2 = elem_nodes
        
        # Get elementary matrix
        Ke = getElemBarStiffnessMatrix(Nodes[idx1], Nodes[idx2], E, Areas[iElem])
        
        # Map local DOFs to global DOFs
        # Node 1 DOFs: 2*idx1 (x), 2*idx1+1 (y)
        # Node 2 DOFs: 2*idx2 (x), 2*idx2+1 (y)
        dofs = [2*idx1, 2*idx1+1, 2*idx2, 2*idx2+1]
        
        # Assemble into Global K
        for row in range(4):
            for col in range(4):
                K_global[dofs[row], dofs[col]] += Ke[row, col]
                
    return K_global

# -----------------------------------------------------------------------------
# 4.3 Building the force vector
# -----------------------------------------------------------------------------
def getGlobalForceVector(nNodes, loads):
    """
    Builds the global force vector f.
    Ref: Eq (7)
    
    Args:
        nNodes (int): Number of nodes.
        loads (list of dicts): [{'node': int, 'value': [Fx, Fy]}, ...]
    """
    f = np.zeros(nNodes * 2)
    for load in loads:
        n = load['node']
        fx, fy = load['value']
        # Add forces to the corresponding degrees of freedom
        f[2*n] += fx
        f[2*n+1] += fy
    return f

# -----------------------------------------------------------------------------
# 4.4 Solving the finite element problem
# -----------------------------------------------------------------------------
def solveFEProblem(K, f, bc_indices, bc_values=None):
    """
    Solves the system Ku = f using partitioning for boundary conditions.
    Ref: Eq (9, 10)
    """
    nDof = K.shape[0]
    
    # Create boolean mask for free DOFs
    is_fixed = np.zeros(nDof, dtype=bool)
    is_fixed[bc_indices] = True
    free_dofs = np.where(~is_fixed)[0]
    fixed_dofs = bc_indices
    
    # Handle known displacements (u_k)
    if bc_values is None:
        u_k = np.zeros(len(fixed_dofs))
    else:
        u_k = bc_values
        
    # Partitioning the matrices
    # K_uu * u_u = f_u - K_uk * u_k
    
    K_uu = K[np.ix_(free_dofs, free_dofs)]
    K_uk = K[np.ix_(free_dofs, fixed_dofs)]
    f_u = f[free_dofs]
    
    # RHS = f_u - K_uk * u_k
    rhs = f_u - K_uk @ u_k
    
    # Check if solvable (matrix is not singular)
    if np.linalg.det(K_uu) == 0:
        logger.error("Stiffness matrix is singular. Check boundary conditions.")
        return np.zeros(nDof)
        
    # Solve for u_u
    u_u = la.solve(K_uu, rhs)
    
    # Reconstruct full u vector
    u_full = np.zeros(nDof)
    u_full[free_dofs] = u_u
    u_full[fixed_dofs] = u_k
    
    return u_full

# -----------------------------------------------------------------------------
# 4.5 Calculation of stresses and strains
# -----------------------------------------------------------------------------
def getElemStressStrain(Node1, Node2, u1, u2, E, L):
    """
    Computes strain and stress for a single element.
    Ref: Eq (11, 12)
    """
    # Unit vector e_j
    v = Node2 - Node1
    e_j = v / L
    
    # Displacement difference vector
    delta_u = u2 - u1
    
    # Strain (epsilon) = (u2 - u1) . e_j / L
    strain = np.dot(delta_u, e_j) / L
    
    # Stress (sigma) = E * epsilon
    stress = E * strain
    
    return stress, strain

def getStressStrain(Nodes, Connectivity, Ufull, E):
    """
    Computes stresses and strains for all elements in the truss.
    """
    stresses = []
    strains = []
    
    for iElem, elem_nodes in enumerate(Connectivity):
        idx1, idx2 = elem_nodes
        
        # Get nodal coordinates and length
        n1 = Nodes[idx1]
        n2 = Nodes[idx2]
        L = np.linalg.norm(n2 - n1)
        
        # Get nodal displacement vectors from global U
        u1 = Ufull[2*idx1 : 2*idx1+2]
        u2 = Ufull[2*idx2 : 2*idx2+2]
        
        sig, eps = getElemStressStrain(n1, n2, u1, u2, E, L)
        stresses.append(sig)
        strains.append(eps)
        
    return np.array(stresses), np.array(strains)

# -----------------------------------------------------------------------------
# Mass Calculation
# -----------------------------------------------------------------------------
def getMassTruss(Nodes, Connectivity, Areas, rho):
    """
    Computes the total mass of the truss.
    Mass = Sum( rho * Area_i * Length_i )
    """
    mass = 0.0
    for iElem, elem_nodes in enumerate(Connectivity):
        idx1, idx2 = elem_nodes
        L = np.linalg.norm(Nodes[idx2] - Nodes[idx1])
        mass += rho * Areas[iElem] * L
    return mass

# -----------------------------------------------------------------------------
# 4.6 Parametric analysis
# -----------------------------------------------------------------------------
def parametricFE(Nodes, Connectivity, Areas, loads, bc_indices, E, rho):
    """
    Performs the full FE analysis for a given set of cross-sectional areas.
    Returns mass, stresses, and displacements.
    """
    # 1. Compute Global Stiffness
    K = getGlobalStiffnessMatrix(Nodes, Connectivity, E, Areas)
    
    # 2. Compute Global Force
    f = getGlobalForceVector(Nodes.shape[0], loads)
    
    # 3. Solve for Displacements
    U = solveFEProblem(K, f, bc_indices)
    
    # 4. Compute Stress/Mass
    stresses, strains = getStressStrain(Nodes, Connectivity, U, E)
    mass = getMassTruss(Nodes, Connectivity, Areas, rho)
    
    return mass, stresses, U

# -----------------------------------------------------------------------------
# 4.7 Parametric gradients (BONUS - Placeholders)
# -----------------------------------------------------------------------------
def getGlobalStiffnessMatrixDerivative(Nodes, Connectivity, E, Areas):
    # Bonus section placeholder
    return None

def solveFEProblemGrad(K, K_deriv, u, f_deriv, bc_indices):
    # Bonus section placeholder
    return None

# -----------------------------------------------------------------------------
# Constraint Functions for Optimization
# -----------------------------------------------------------------------------
def constraint_stress_norm(areas, Nodes, Connectivity, loads_list, bc_indices, mat):
    """
    Normalized stress constraint for optimization.
    Returns a scalar or vector where values >= 0 indicate feasibility.
    """
    areas = np.abs(areas)
    
    # Run parametric FE analysis to get stresses
    # The 'parametricFE' function is defined in this same file.
    _, stresses, _ = parametricFE(Nodes, Connectivity, areas, loads_list, bc_indices, mat.E, mat.rho)
    
    # Normalized Margin: 1.0 - (|Current_Stress| / Yield_Limit)
    # A value >= 0 means the constraint is satisfied.
    return 1.0 - (np.abs(stresses) / mat.sigl)