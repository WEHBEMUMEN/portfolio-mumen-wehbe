import numpy as np
import scipy.linalg as la
import matplotlib as mpl
from matplotlib import cm
import matplotlib.pyplot as plt
from typing import Union, List, Dict, Tuple
from numpy.typing import ArrayLike
from loguru import logger

def getNodesInBBX(NodesList: ArrayLike, bbx: ArrayLike) -> ArrayLike:
    """Find nodes that lie within a 2D bounding box.
    This function identifies and returns the indices of nodes whose coordinates
    are inside or on the boundary of a specified rectangular bounding box,
    with a small threshold tolerance to account for floating point precision.
        NodesList (ArrayLike): Array of node coordinates, where each node is 
            represented by its (x, y) coordinates.
        bbx (ArrayLike): 1D array or list of bounding box coordinates in the format 
            [xmin, ymin, xmax, ymax].
        ArrayLike: Integer array containing the indices of nodes that lie within 
            the bounding box.
    Notes:
        A small threshold (1e-6) is used to include nodes that lie exactly on 
        the boundary of the bounding box.
    """  
    
    xmin, ymin, xmax, ymax = bbx.flatten()
    NodesInBBX = []
    # select threshold
    threshold = __DEF_THRESHOLD
    # Loop over nodes
    for ix, n in enumerate(NodesList):
        if (
            n[0] >= xmin - threshold
            and n[0] <= xmax + threshold
            and n[1] >= ymin - threshold
            and n[1] <= ymax + threshold
        ):
            NodesInBBX.append(ix)
    return np.array(NodesInBBX, dtype="int")


def getNodesBC(nodes: ArrayLike, bc: ArrayLike, tBC: Union[str, List] = 'none')-> Tuple[ArrayLike, ArrayLike]:
    """Get nodes and associated type of boundary conditions.
    This function processes boundary conditions specified either as bounding boxes or
    explicit node lists, and returns the affected node indices along with their
    boundary condition types.
        nodes (ArrayLike): Array of node coordinates, typically shape (n_nodes, n_dims).
        bc (ArrayLike): Boundary condition specification as a dictionary or list of dictionaries.
            Each dictionary should have the following structure:
            - For bounding box specification:
              {"type": "bbx", "bbx": np.array([xmin, ymin, xmax, ymax]), "value": np.array([val_x, val_y])}
            - For explicit node specification:
              {"type": "nodes", "nodes": np.array([node_idx1, node_idx2, ...]), "value": np.array([val_x, val_y])}
            The "value" field contains the boundary condition values (forces or displacements)
            that will be applied to the selected nodes.
        tBC (str, optional): Type of boundary condition. Defaults to 'none'.
            - 'force': Interprets values as forces, nodes with zero force are marked as 'p'
            - 'disp': Interprets values as displacements, nodes with NaN values are marked as 'p'
            - 'none': No specific interpretation
        ValueError: If the shape of BC values doesn't match the number of nodes or can't be broadcast.
        Tuple[ArrayLike, ArrayLike]: A tuple containing:
            - Array of indices for nodes with boundary conditions
            - Array of strings indicating the type of boundary condition for each node:
              'f' for full (all components have values)
              'p' for partial (some components don't have values)
    Examples:
        >>> nodes = np.array([[0,0], [1,0], [1,1], [0,1]])
        >>> bc = {"type": "bbx", "bbx": np.array([0.9, -0.1, 1.1, 1.1]), "value": np.array([0, -100])}
        >>> nodesList, typeBC = getNodesBC(nodes, bc, tBC='force')

    """    
    if not isinstance(bc,list):
        bc = [bc]
    nodesList = np.empty((0), dtype="int")
    valuesOk = np.empty((0,2))
    for c in bc:
        if c["type"] == "bbx":
            newNodes = getNodesInBBX(nodes, c["bbx"])
        elif c["type"] == "nodes":
            newNodes = np.array(c["nodes"],dtype='int')
        nbNodes = len(newNodes)
        # adapt bc values
        initValues = np.array(c["value"])
        if len(initValues.shape) == 1:
                initValues = initValues[np.newaxis, :]
        # prepare values
        if initValues.shape[0] == nbNodes:
            newValues = initValues
        elif initValues.shape[0] == 1:
            newValues = np.tile(initValues, (nbNodes, 1))
        else:
            raise ValueError("BC value has wrong shape")
        # merge data
        nodesList = np.append(nodesList,newNodes)
        valuesOk = np.vstack((valuesOk,newValues))
    # clean duplicates
    nodesList,iXunique = np.unique(nodesList, return_index=True)
    valuesOk = valuesOk[iXunique,:]
    # check values depending on type
    typeBC = np.array(len(nodesList) * ['f']) # full force or displacement (f or p)
    if len(typeBC)>0:
        if tBC == 'force':
            typeBC[np.where((valuesOk==0))[0]] = 'p' 
        elif tBC == 'disp':
            typeBC = [ 'p' if x else 'f' for x in np.isnan(valuesOk).any(axis=1)]
        elif tBC == 'none':
            pass
        else:
            logger.info('Bad boundary condition type')
    return nodesList,typeBC

# plot results on mesh
def plotResults(    
    Nodes: ArrayLike,
    connectivity: ArrayLike,
    Ufull: Union[ArrayLike, None]=None,
    elemField: Union[ArrayLike, None]=None,
    bc: Dict=dict(),
    title: str="",
    options: Dict=dict(),
    scaleFactor: float=1.0,
    figax = None
)-> None:
    """
    Plots the results of a structural analysis, including the mesh, deformed shape, 
    boundary conditions, and element field values.
    Parameters:
    -----------
    Nodes : ArrayLike
        Array of node coordinates with shape (nNodes, 2), where each row represents 
        the x and y coordinates of a node.
    connectivity : ArrayLike
        Array defining the connectivity of elements with shape (nElem, nNodesPerElem), 
        where each row contains the indices of nodes forming an element.
    Ufull : Union[ArrayLike, None], optional
        Array of nodal displacements with shape (nDOF,), where nDOF is the total 
        number of degrees of freedom. If None, no deformed shape is plotted.
    elemField : Union[ArrayLike, None], optional
        Array of element field values (e.g., stress or strain) with shape (nElem,). 
        If None, no element field values are plotted.
    bc : Dict, optional
        Dictionary defining boundary conditions. It may contain:
        - "disp": Dictionary of displacement boundary conditions.
        - "force": Dictionary of force boundary conditions.
    title : str, optional
        Title of the plot. Default is an empty string.
    options : Dict, optional
        Dictionary of plotting options. Supported keys:
        - "showNumPoints" (bool): Whether to display node numbers. Default is False.
        - "showNumElem" (bool): Whether to display element numbers. Default is False.
        - "showValElem" (bool): Whether to display element field values. Default is True.
    scaleFactor : float, optional
        Scaling factor for the displacements when plotting the deformed shape. 
        Default is 1.0.
    figax : tuple, optional
        Tuple containing a matplotlib figure and axis (fig, ax). If None, a new 
        figure and axis are created.
    Returns:
    --------
    None
        The function does not return any value. It directly plots the results.
    Notes:
    ------
    - The function supports both scalar and categorical element field values.
    - Boundary conditions are visualized using different colors for full and 
      partial constraints.
    - A colorbar is added if scalar element field values are provided.
    - The plot is displayed if `figax` is None; otherwise, it is drawn on the 
      provided axis.
    """
   
    
    # color for bc
    colorFullDisp = "blue"
    colorFullForce = "red"
    colorPartialDisp = "green"
    colorPartialForce = "orange"
    # manage options
    currOptions = dict()
    currOptions["showNumPoints"] = options.get("showNumPoints", False)
    currOptions["showNumElem"] = options.get("showNumElem", False)
    currOptions["showValElem"] = options.get("showValElem", True)

    # Get number of nodes
    nNodes = Nodes.shape[0]
    # Get number of elements
    nElem = connectivity.shape[0]
    # Get number of degrees of freedom
    nDOF = nNodes * 2
    if Ufull is not None:
        dispVect = Ufull.reshape((nNodes, 2))
    # prepare data to plot results
    if elemField is not None:
        if isinstance(elemField[0], str):
            # build constant thickness and color
            color ={'OK': 'green', 'NOK': 'red'}
            funThick = lambda x: 5
            funColor = lambda x: color.get(x, 'black')
        else:
            # compute range
            vmin = np.min(elemField)
            vmax = np.max(elemField)
            if np.abs(vmin-vmax)/np.abs(np.max([vmin,vmax]))<1e-6:
                vmin = vmin - vmin/2
                vmax = vmax + vmax/2
            lmax = 10
            lmin = 5
            slope = (lmax - lmin) / (vmax - vmin)
            intercept = lmin - slope * vmin
            funThick = lambda x: slope * x + intercept
            # build linear colorbar
            normColor = mpl.colors.Normalize(vmin=vmin, vmax=vmax)
            c = plt.cm.viridis
            funColor = lambda x: c(normColor(x))
    # compute middle of elements
    funMiddle = lambda x: np.array([np.sum(x[:, 0]) / 2, np.sum(x[:, 1]) / 2])
    # load new figure if necessary
    if figax is None:
        fig, ax = plt.subplots()    
    else:
        fig, ax = figax
    # Plot nodes numbers
    if currOptions["showNumPoints"]:
        for i in range(nNodes):
            ax.text(
                Nodes[i, 0],
                Nodes[i, 1],
                str(i),
                color="silver",
                verticalalignment="bottom",
                horizontalalignment="left",
                # bbox=dict(boxstyle="Round", facecolor="white", alpha=1),
            )
    # Loop over elements
    for iElem, Elem in enumerate(connectivity):
        # Get element nodes coordinates
        NodesElem = Nodes[Elem, :]
        # Plot fixed mesh
        ax.plot(NodesElem[:, 0], NodesElem[:, 1], "o-", color="silver")
        # Plot elements numbers
        if currOptions["showNumElem"]:
            ax.text(
                funMiddle(NodesElem)[0],
                funMiddle(NodesElem)[1],
                str(iElem),
                color="black",
                verticalalignment="baseline",
                horizontalalignment="center",
                bbox=dict(boxstyle="Circle", facecolor="white", alpha=1),
                fontsize=5
            )
        if Ufull is not None:
            # Get element nodes displacements
            dispElem = NodesElem + scaleFactor * dispVect[Elem, :]
            # Plot deformed mesh
            ax.plot(dispElem[:, 0], dispElem[:, 1], "ok-")

        if elemField is not None:
            ax.plot(
                NodesElem[:, 0],
                NodesElem[:, 1],
                linewidth=funThick(elemField[iElem]),
                color=funColor(elemField[iElem]),
            )
            if currOptions["showValElem"]:
                if isinstance(elemField[iElem], str):
                    valFormatElem = '{}'.format(elemField[iElem])
                else:
                    valFormatElem = '{:.2e}'.format(elemField[iElem])
                ax.text(
                    funMiddle(NodesElem)[0],
                    funMiddle(NodesElem)[1],
                    valFormatElem,
                    color="black",
                    verticalalignment="baseline",
                    horizontalalignment="center",
                    bbox=dict(boxstyle="Round", facecolor="white", alpha=1),
                    fontsize=5
                )
    # build items for legend
        legend_elements = []
    if len(bc) > 0:       
        # plot nodes with applied force
        bcDisp = bc.get("disp", dict())
        nodeDisp,typeDisp = getNodesBC(Nodes,bcDisp,tBC='disp')        
        if len(nodeDisp)>0:
            legend_elements.append(mpl.lines.Line2D([0], [0], marker='o', color=colorFullDisp,label='Full displacement BC'))
            legend_elements.append(mpl.lines.Line2D([0], [0], marker='o', color=colorPartialDisp,label='Partial displacement BC'))
        for i,iN in enumerate(nodeDisp):
            if typeDisp[i] == 'f':
                ax.plot(Nodes[iN, 0], Nodes[iN, 1], "o", color=colorFullDisp)
            elif typeDisp[i] == 'p':
                ax.plot(Nodes[iN, 0], Nodes[iN, 1], "o", color=colorPartialDisp)
        # plot nodes with applied displacement
        bcForce = bc.get("force", dict())
        nodesForce,typeForce = getNodesBC(Nodes,bcForce,tBC='force')
        if len(nodesForce)>0:
            legend_elements.append(mpl.lines.Line2D([0], [0], marker='o', color=colorFullForce,label='Full force BC'))
            legend_elements.append(mpl.lines.Line2D([0], [0], marker='o', color=colorPartialForce,label='Partial force BC'))
        for i,iN in enumerate(nodesForce):
            if typeForce[i] == 'f':
                ax.plot(Nodes[iN, 0], Nodes[iN, 1], "o", color=colorFullForce)
            elif typeForce[i] == 'p':
                ax.plot(Nodes[iN, 0], Nodes[iN, 1], "o", color=colorPartialForce)
        # nodes with mixed bc
        nodesMixed = np.intersect1d(nodeDisp,nodesForce)
        if len(nodesMixed)>0:
            legend_elements.append(mpl.lines.Line2D([0], [0], marker='o', color=colorPartialDisp,label='Partial displacement BC'))
            legend_elements.append(mpl.lines.Line2D([0], [0], marker='o', color=colorPartialForce,label='Partial force BC'))
        for i,iN in enumerate(nodesMixed):
            ax.plot(Nodes[iN, 0], Nodes[iN, 1], "o", color=colorPartialForce, alpha=0.5)
            ax.plot(Nodes[iN, 0], Nodes[iN, 1], "o", color=colorPartialDisp, alpha=0.5)
        
        
    if elemField is not None:
        if not isinstance(elemField[0], str):
            # add colorbar
            sm = plt.cm.ScalarMappable(cmap=c, norm=normColor)
            fig.colorbar(sm, ax=ax)

    if legend_elements:
        ax.legend(handles=legend_elements, loc='upper right')

    ax.axis("equal")
    ax.set_title(title)
    ax.set_xlabel("x")
    ax.set_ylabel("y")
    if figax is None:
        plt.show()
    
