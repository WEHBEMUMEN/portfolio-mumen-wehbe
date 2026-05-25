%% Memory Clear
clc; clear; close all;

%% Parameters (CAN BE CHANGED)
% Beam geometry (rectangular cross-section)
b = 0.1;            % Width of the beam [m]
h = 0.2;            % Height of the beam [m]
L = 1.0;            % Beam length [m]
rho = 7800;         % Density [kg/m^3]
E = 210e9;          % Young's modulus [Pa]
nu = 0.3;           % Poisson's ratio
s = 0.1;           % Load eccentricity [m]
F = 1000;           % Vertical force [N]
ne = 20;            % Number of elements (for static analysis)
ne_vib = 10;        % Number of elements (for vibration analysis)

% Derived properties (automatically calculated)
A = b*h;                            % Cross-sectional area [m^2]
J = (b*h^3)/12;                     % Bending moment of inertia [m^4]
Jp = b*h*(b^2 + h^2)/12;            % Polar moment of inertia [m^4]
G = E/(2*(1+nu));                   % Shear modulus [Pa]
m = rho*A;                          % Mass per unit length [kg/m]
I_theta = rho*Jp;                   % Mass polar moment [kg·m^2/m]

fprintf('Beam Properties:\n');
fprintf('Width (b): %.3f m\n', b);
fprintf('Height (h): %.3f m\n', h);
fprintf('Area (A): %.6f m²\n', A);
fprintf('Bending inertia (J): %.6e m⁴\n', J);
fprintf('Polar inertia (Jp): %.6e m⁴\n', Jp);
fprintf('Mass per unit length (m): %.3f kg/m\n', m);
fprintf('Mass polar moment (Iθ): %.6e kg·m²/m\n\n', I_theta);

%% Part 1: Symbolic Derivation of Equations of Motion
fprintf('=== Part 1: Symbolic Derivation ===\n');

% Define symbolic variables
syms x t s_sym L_sym real;
syms E_sym J_sym G_sym Jp_sym m_sym I_theta_sym real;

% Define displacement functions
syms w(x,t) theta(x,t);

% Elastic energy (spatial derivatives only)
deltaW_E = -int(E_sym*J_sym*diff(w,x,2)^2 + G_sym*Jp_sym*diff(theta,x)^2, x, 0, L_sym);

% Inertia terms (time derivatives)
deltaW_I = int((-I_theta_sym*diff(theta,t,t) + m_sym*s_sym*diff(w,t,t))*theta + ...
           (m_sym*s_sym*diff(theta,t,t) - m_sym*diff(w,t,t))*w, x, 0, L_sym);

% Strong form equations
strong_form_bending = diff(E_sym*J_sym*diff(w,x,2), x, 2) + m_sym*diff(w,t,t) - m_sym*s_sym*diff(theta,t,t);
strong_form_torsion = -diff(G_sym*Jp_sym*diff(theta,x), x) + I_theta_sym*diff(theta,t,t) - m_sym*s_sym*diff(w,t,t);

fprintf('Strong Form Equations:\n');
fprintf('Bending: %s = 0\n', char(strong_form_bending));
fprintf('Torsion: %s = 0\n\n', char(strong_form_torsion));

% Boundary conditions
fprintf('Boundary Conditions (Clamped at x=0):\n');
fprintf('Dirichlet: w(0,t)=0, dw/dx(0,t)=0, theta(0,t)=0\n');
fprintf('Natural (Free End): M(L,t)=0, T(L,t)=0\n\n');

%% Part 2: Numerical Solution Setup
fprintf('=== Part 2: Numerical Solution ===\n');

% Gaussian quadrature function
function [x, w] = lgwt(N, a, b)
    % Gauss-Legendre quadrature nodes and weights
    N = N-1;
    N1 = N+1; N2 = N+2;
    xu = linspace(-1,1,N1)';
    y = cos((2*(0:N)'+1)*pi/(2*N+2)) + (0.27/N1)*sin(pi*xu*N/N2);
    L = zeros(N1,N2);
    y0 = 2;
    while max(abs(y-y0)) > eps
        L(:,1) = 1;
        L(:,2) = y;
        for k = 2:N1
            L(:,k+1) = ((2*k-1)*y.*L(:,k)-(k-1)*L(:,k-1))/k;
        end
        Lp = N2*(L(:,N1)-y.*L(:,N2))./(1-y.^2);
        y0 = y;
        y = y0-L(:,N2)./Lp;
    end
    x = (a*(1-y)+b*(1+y))/2;
    w = (b-a)./((1-y.^2).*Lp.^2)*(N2/N1)^2;
end

%% Part 3: Static Analysis
fprintf('=== Part 3: Static Analysis ===\n');
fprintf('Using coupling parameter s = %.2f\n', s);

n_nodes = ne + 1;
n_dof = 3*n_nodes; % Total DOFs (w, dw/dx, θ per node)

% Shape functions
Le = L/ne; % Element length
% Cubic Hermite for bending
N1 = @(x) 1 - 3*(x/Le).^2 + 2*(x/Le).^3;
N2 = @(x) x .* (1 - x/Le).^2;
N3 = @(x) 3*(x/Le).^2 - 2*(x/Le).^3;
N4 = @(x) (x.^3/Le^2) - (x.^2/Le);
% Linear Lagrange for torsion
N1t = @(x) 1 - x/Le;
N2t = @(x) x/Le;

% Assemble global stiffness matrix
K_global = zeros(n_dof);
for elem = 1:ne
    % Element stiffness matrices
    K_e_BB = zeros(4,4); % Bending
    K_e_TT = zeros(2,2); % Torsion
    
    % Gaussian quadrature (4 points)
    [xi, wgt] = lgwt(4, 0, Le);
    
    for gp = 1:length(xi)
        x_gp = xi(gp);
        % Bending terms
        ddN = [(-6/Le^2 + 12*x_gp/Le^3);  % d²N1/dx²
               (-4/Le + 6*x_gp/Le^2);     % d²N2/dx²
               (6/Le^2 - 12*x_gp/Le^3);   % d²N3/dx²
               (-2/Le + 6*x_gp/Le^2)];    % d²N4/dx²
        K_e_BB = K_e_BB + E*J*(ddN*ddN')*wgt(gp);
        
        % Torsion terms
        dNt = [-1/Le; 1/Le]; % dNt/dx
        K_e_TT = K_e_TT + G*Jp*(dNt*dNt')*wgt(gp);
    end
    
    % Assembly indices
    bend_dofs = [2*elem-1, 2*elem, 2*elem+1, 2*elem+2];
    tors_dofs = [2*n_nodes + elem, 2*n_nodes + elem + 1];
    
    % Add to global matrix
    K_global(bend_dofs, bend_dofs) = K_global(bend_dofs, bend_dofs) + K_e_BB;
    K_global(tors_dofs, tors_dofs) = K_global(tors_dofs, tors_dofs) + K_e_TT;
end

% Boundary conditions (clamped at x=0)
fixed_dofs = [1, 2, 2*n_nodes + 1]; % w(0), w'(0), θ(0)
free_dofs = setdiff(1:n_dof, fixed_dofs);

% Applied loads (force F at free end with eccentricity d)
F_global = zeros(n_dof, 1);
tip_node = n_nodes;
F_global(2*tip_node-1) = F;          % Vertical force
F_global(2*n_nodes + tip_node) = F*s; % Torsional moment (F*s)

% Solve system
K_ff = K_global(free_dofs, free_dofs);
F_f = F_global(free_dofs);
u = zeros(n_dof, 1);
u(free_dofs) = K_ff \ F_f;

% Reactions
reactions = K_global * u;
R_base = reactions(fixed_dofs);

% Output results
fprintf('Static Solution Results:\n');
fprintf('Tip deflection: %.6f m\n', u(2*tip_node-1));
fprintf('Tip twist: %.6f rad\n', u(2*n_nodes + tip_node));
fprintf('Base reactions:\n');
fprintf('  Vertical force: %.6f N (Applied: %.1f N)\n', R_base(1), F);
fprintf('  Bending moment: %.6f Nm (Applied: %.1f Nm)\n', R_base(2), F*L);
fprintf('  Torque: %.6f Nm (Applied: %.1f Nm)\n\n', R_base(3), F*s);

% Analytical Validation (Uncoupled Cases)
fprintf('=== Analytical Validation ===\n');

% Uncoupled bending (s=0)
w_analytical = (F * L^3) / (3 * E * J);
fprintf('Uncoupled Bending Tip Deflection:\n');
fprintf('  Numerical: %.6f m\n', u(2*tip_node-1));
fprintf('  Analytical: %.6f m\n', w_analytical);

% Uncoupled torsion 
T = F * s;
theta_analytical = (T * L) / (G * Jp);
fprintf('Uncoupled Torsion Tip Twist:\n');
fprintf('  Numerical: %.6f rad\n', u(2*n_nodes + tip_node));
fprintf('  Analytical: %.6f rad\n', theta_analytical);

% Visualization of Static Response
x_nodes = linspace(0, L, n_nodes)';
w_nodes = u(1:2:2*n_nodes);
theta_nodes = u(2*n_nodes+1:end);

h = figure('Units', 'inches', 'Position', [0 0 8 6]);
subplot(2,1,1);
plot(x_nodes, w_nodes, 'b-o', 'LineWidth', 2);
ylabel('Deflection (m)');
title(sprintf('Static Deflection (s = %.1f)', s));
grid on;

subplot(2,1,2);
plot(x_nodes, theta_nodes, 'r-o', 'LineWidth', 2);
xlabel('Beam Position (m)');
ylabel('Twist (rad)');
title(sprintf('Static Twist (s = %.1f)', s));
grid on;

% Save plot as PDF without white margins
set(h, 'PaperPositionMode', 'auto');
print(h, 'StaticResponse.pdf', '-dpdf', '-bestfit');

%% Part 4: Free Vibration Analysis - Eigenpulsations vs Eccentricity s
fprintf('=== Part 4: Free Vibration Analysis - Eigenpulsations vs s ===\n');

% Use smaller number of elements for vibration analysis
n_nodes_vib = ne_vib + 1;
n_dof_vib = 3*n_nodes_vib;
Le_vib = L/ne_vib;

% Rebuild stiffness matrix for vibration analysis
K_global_vib = zeros(n_dof_vib);
for elem = 1:ne_vib
    K_e_BB = zeros(4,4); % Bending
    K_e_TT = zeros(2,2); % Torsion
    
    [xi, wgt] = lgwt(4, 0, Le_vib);
    
    for gp = 1:length(xi)
        x_gp = xi(gp);
        % Bending terms
        ddN = [(-6/Le_vib^2 + 12*x_gp/Le_vib^3);
               (-4/Le_vib + 6*x_gp/Le_vib^2);
               (6/Le_vib^2 - 12*x_gp/Le_vib^3);
               (-2/Le_vib + 6*x_gp/Le_vib^2)];
        K_e_BB = K_e_BB + E*J*(ddN*ddN')*wgt(gp);
        
        % Torsion terms
        dNt = [-1/Le_vib; 1/Le_vib];
        K_e_TT = K_e_TT + G*Jp*(dNt*dNt')*wgt(gp);
    end
    
    bend_dofs = [2*elem-1, 2*elem, 2*elem+1, 2*elem+2];
    tors_dofs = [2*n_nodes_vib + elem, 2*n_nodes_vib + elem + 1];
    
    K_global_vib(bend_dofs, bend_dofs) = K_global_vib(bend_dofs, bend_dofs) + K_e_BB;
    K_global_vib(tors_dofs, tors_dofs) = K_global_vib(tors_dofs, tors_dofs) + K_e_TT;
end

% Boundary conditions for vibration
fixed_dofs_vib = [1, 2, 2*n_nodes_vib + 1];
free_dofs_vib = setdiff(1:n_dof_vib, fixed_dofs_vib);

% Mass matrix assembly with coupling
s_values = linspace(0, 0.2, 21); % Eccentricity parameter range [m]
num_modes = 4;
frequencies_rads = zeros(num_modes, length(s_values)); % Natural frequencies in rad/s
frequencies_hz = zeros(num_modes, length(s_values));   % Natural frequencies in Hz

for s_idx = 1:length(s_values)
    current_s = s_values(s_idx);
    M_global_vib = zeros(n_dof_vib);
    
    for elem = 1:ne_vib
        M_e_BB = zeros(4,4); % Bending inertia
        M_e_TT = zeros(2,2); % Torsion inertia
        M_e_BT = zeros(4,2); % Coupling terms
        
        [xi, wgt] = lgwt(4, 0, Le_vib);
        
        for gp = 1:length(xi)
            x_gp = xi(gp);
            % Shape functions
            N_b = [N1(x_gp); N2(x_gp); N3(x_gp); N4(x_gp)];
            N_t = [N1t(x_gp); N2t(x_gp)];
            
            % Bending mass
            M_e_BB = M_e_BB + m*(N_b*N_b')*wgt(gp);
            
            % Torsion mass
            M_e_TT = M_e_TT + I_theta*(N_t*N_t')*wgt(gp);
            
            % Coupling terms (using current_s as load eccentricity)
            M_e_BT = M_e_BT + m*current_s*(N_b*N_t')*wgt(gp);
        end
        
        bend_dofs = [2*elem-1, 2*elem, 2*elem+1, 2*elem+2];
        tors_dofs = [2*n_nodes_vib + elem, 2*n_nodes_vib + elem + 1];
        
        M_global_vib(bend_dofs, bend_dofs) = M_global_vib(bend_dofs, bend_dofs) + M_e_BB;
        M_global_vib(tors_dofs, tors_dofs) = M_global_vib(tors_dofs, tors_dofs) + M_e_TT;
        M_global_vib(bend_dofs, tors_dofs) = M_global_vib(bend_dofs, tors_dofs) + M_e_BT;
        M_global_vib(tors_dofs, bend_dofs) = M_global_vib(tors_dofs, bend_dofs) + M_e_BT';
    end
    
    % Solve eigenvalue problem
    M_ff = M_global_vib(free_dofs_vib, free_dofs_vib);
    K_ff = K_global_vib(free_dofs_vib, free_dofs_vib);
    
    % Ensure matrices are symmetric
    K_ff = (K_ff + K_ff')/2;
    M_ff = (M_ff + M_ff')/2;
    
    % Solve using eigs for better numerical stability
    [V, D] = eigs(K_ff, M_ff, num_modes, 'sm');
    omega = sqrt(abs(diag(D))); % Eigenpulsations in rad/s
    [omega, idx] = sort(omega);
    
    % Store frequencies
    frequencies_rads(:, s_idx) = omega(1:num_modes);
    frequencies_hz(:, s_idx) = omega(1:num_modes)/(2*pi);
end

%% Plotting Results
h = figure('Units', 'inches', 'Position', [0 0 10, 8]);

% Plot 1: Frequencies in Hz vs s
subplot(2,1,1);
plot(s_values, frequencies_hz, 'LineWidth', 2);
xlabel('Load Eccentricity s (m)');
ylabel('Natural Frequency (Hz)');
title('Natural Frequencies vs Load Eccentricity');
legend('1st Bending', '2nd Bending', '1st Torsion', '2nd Torsion', 'Location', 'eastoutside');
grid on;

% Plot 2: Frequencies in rad/s vs s
subplot(2,1,2);
plot(s_values, frequencies_rads, 'LineWidth', 2);
xlabel('Load Eccentricity s (m)');
ylabel('Eigenpulsation (rad/s)');
title('Eigenpulsations vs Load Eccentricity');
grid on;

% Save plot as PDF without white margins
set(h, 'PaperPositionMode', 'auto');
print(h, 'Eigenpulsations_vs_Eccentricity.pdf', '-dpdf', '-bestfit');

%% Display Frequency Table
fprintf('\nNatural Frequencies (Hz) for Different Eccentricities:\n');
fprintf('s (m)\t1st Bend\t2nd Bend\t1st Tors\t2nd Tors\n');
for s_idx = 1:length(s_values)
    fprintf('%.3f\t%.2f\t\t%.2f\t\t%.2f\t\t%.2f\n', ...
            s_values(s_idx), frequencies_hz(1,s_idx), frequencies_hz(2,s_idx), ...
            frequencies_hz(3,s_idx), frequencies_hz(4,s_idx));
end

%% Mode Shape Visualization for Selected s Value
s_selected = 0.1; % Select a specific eccentricity to visualize modes
[~, s_idx] = min(abs(s_values - s_selected));

fprintf('\n=== Mode Shapes for s = %.2f m ===\n', s_selected);

% Get the mode shapes for selected s
M_global_vib = zeros(n_dof_vib);
for elem = 1:ne_vib
    M_e_BB = zeros(4,4);
    M_e_TT = zeros(2,2);
    M_e_BT = zeros(4,2);
    
    [xi, wgt] = lgwt(4, 0, Le_vib);
    
    for gp = 1:length(xi)
        x_gp = xi(gp);
        N_b = [N1(x_gp); N2(x_gp); N3(x_gp); N4(x_gp)];
        N_t = [N1t(x_gp); N2t(x_gp)];
        
        M_e_BB = M_e_BB + m*(N_b*N_b')*wgt(gp);
        M_e_TT = M_e_TT + I_theta*(N_t*N_t')*wgt(gp);
        M_e_BT = M_e_BT + m*s_selected*(N_b*N_t')*wgt(gp);
    end
    
    bend_dofs = [2*elem-1, 2*elem, 2*elem+1, 2*elem+2];
    tors_dofs = [2*n_nodes_vib + elem, 2*n_nodes_vib + elem + 1];
    
    M_global_vib(bend_dofs, bend_dofs) = M_global_vib(bend_dofs, bend_dofs) + M_e_BB;
    M_global_vib(tors_dofs, tors_dofs) = M_global_vib(tors_dofs, tors_dofs) + M_e_TT;
    M_global_vib(bend_dofs, tors_dofs) = M_global_vib(bend_dofs, tors_dofs) + M_e_BT;
    M_global_vib(tors_dofs, bend_dofs) = M_global_vib(tors_dofs, bend_dofs) + M_e_BT';
end

% Solve eigenvalue problem
[V, D] = eigs(K_ff, M_global_vib(free_dofs_vib, free_dofs_vib), num_modes, 'sm');
omega = sqrt(abs(diag(D)));
[omega, idx] = sort(omega);
V = V(:,idx);

% Visualize mode shapes
x_nodes = linspace(0, L, n_nodes_vib)';
beam_width = 0.05*L; % Visualization width

h = figure('Units', 'inches', 'Position', [0 0 12, 10]);
for mode = 1:4
    phi = zeros(n_dof_vib, 1);
    phi(free_dofs_vib) = V(:,mode);
    
    % Get displacements and twists
    w_mode = phi(1:2:2*n_nodes_vib);
    theta_mode = phi(2*n_nodes_vib+1:end);
    
    % Scale for visualization
    max_deform = max(abs([w_mode; theta_mode*beam_width/2]));
    w_mode = w_mode/max_deform*0.2*L;
    theta_mode = theta_mode/max_deform*0.2*L;
    
    % Calculate beam edges
    y_top = w_mode + beam_width/2*sin(theta_mode);
    y_bottom = w_mode - beam_width/2*sin(theta_mode);
    
    % Plot mode shape
    subplot(4,1,mode);
    
    % Undeformed beam
    plot(x_nodes, zeros(size(x_nodes)), 'k--', 'LineWidth', 0.5);
    hold on;
    
    % Deformed beam
    fill([x_nodes; flipud(x_nodes)], [y_top; flipud(y_bottom)], 'b', 'FaceAlpha', 0.3);
    plot(x_nodes, w_mode, 'b-', 'LineWidth', 2);
    
    title(sprintf('Mode %d: %.2f Hz (s = %.2f m)', mode, omega(mode)/(2*pi), s_selected));
    xlabel('Beam Length [m]');
    ylabel('Displacement [m]');
    grid on;
    xlim([0 L]);
    ylim([-0.3*L 0.3*L]);
end

print(h, 'ModeShapes_Selected.pdf', '-dpdf', '-bestfit');

fprintf('Analysis complete.\n');

%% Part 5: Convergence Study
fprintf('=== Part 5: Convergence Study ===\n');

% Parameters for convergence study
ne_values = [5, 10, 20, 40, 80, 160];  % Different mesh sizes to test
w_tip = zeros(size(ne_values));          % Tip deflection for each mesh
theta_tip = zeros(size(ne_values));      % Tip twist for each mesh
energy_error = zeros(size(ne_values));   % Energy norm error

% Reference solution (using finest mesh)
ne_ref = 320;
n_nodes_ref = ne_ref + 1;
n_dof_ref = 3 * n_nodes_ref;
Le_ref = L / ne_ref;

% Compute reference solution
K_global_ref = zeros(n_dof_ref);
for elem = 1:ne_ref
    K_e_BB = zeros(4,4);
    K_e_TT = zeros(2,2);
    
    [xi, wgt] = lgwt(4, 0, Le_ref);
    
    for gp = 1:length(xi)
        x_gp = xi(gp);
        ddN = [(-6/Le_ref^2 + 12*x_gp/Le_ref^3);
               (-4/Le_ref + 6*x_gp/Le_ref^2);
               (6/Le_ref^2 - 12*x_gp/Le_ref^3);
               (-2/Le_ref + 6*x_gp/Le_ref^2)];
        K_e_BB = K_e_BB + E*J*(ddN*ddN')*wgt(gp);
        
        dNt = [-1/Le_ref; 1/Le_ref];
        K_e_TT = K_e_TT + G*Jp*(dNt*dNt')*wgt(gp);
    end
    
    bend_dofs = [2*elem-1, 2*elem, 2*elem+1, 2*elem+2];
    tors_dofs = [2*n_nodes_ref + elem, 2*n_nodes_ref + elem + 1];
    
    K_global_ref(bend_dofs, bend_dofs) = K_global_ref(bend_dofs, bend_dofs) + K_e_BB;
    K_global_ref(tors_dofs, tors_dofs) = K_global_ref(tors_dofs, tors_dofs) + K_e_TT;
end

fixed_dofs_ref = [1, 2, 2*n_nodes_ref + 1];
free_dofs_ref = setdiff(1:n_dof_ref, fixed_dofs_ref);

F_global_ref = zeros(n_dof_ref, 1);
F_global_ref(2*n_nodes_ref - 1) = F;
F_global_ref(2*n_nodes_ref + n_nodes_ref) = F*s;

u_ref = zeros(n_dof_ref, 1);
u_ref(free_dofs_ref) = K_global_ref(free_dofs_ref, free_dofs_ref) \ F_global_ref(free_dofs_ref);

% Interpolate reference solution to common grid
x_ref = linspace(0, L, 1000)';
w_ref = interp1(linspace(0, L, n_nodes_ref), u_ref(1:2:2*n_nodes_ref), x_ref, 'pchip');
theta_ref = interp1(linspace(0, L, n_nodes_ref), u_ref(2*n_nodes_ref+1:end), x_ref, 'pchip');

% Loop through different mesh sizes
for i = 1:length(ne_values)
    ne = ne_values(i);
    n_nodes = ne + 1;
    n_dof = 3 * n_nodes;
    Le = L / ne;
    
    % Build stiffness matrix
    K_global = zeros(n_dof);
    for elem = 1:ne
        K_e_BB = zeros(4,4);
        K_e_TT = zeros(2,2);
        
        [xi, wgt] = lgwt(4, 0, Le);
        
        for gp = 1:length(xi)
            x_gp = xi(gp);
            ddN = [(-6/Le^2 + 12*x_gp/Le^3);
                   (-4/Le + 6*x_gp/Le^2);
                   (6/Le^2 - 12*x_gp/Le^3);
                   (-2/Le + 6*x_gp/Le^2)];
            K_e_BB = K_e_BB + E*J*(ddN*ddN')*wgt(gp);
            
            dNt = [-1/Le; 1/Le];
            K_e_TT = K_e_TT + G*Jp*(dNt*dNt')*wgt(gp);
        end
        
        bend_dofs = [2*elem-1, 2*elem, 2*elem+1, 2*elem+2];
        tors_dofs = [2*n_nodes + elem, 2*n_nodes + elem + 1];
        
        K_global(bend_dofs, bend_dofs) = K_global(bend_dofs, bend_dofs) + K_e_BB;
        K_global(tors_dofs, tors_dofs) = K_global(tors_dofs, tors_dofs) + K_e_TT;
    end
    
    % Solve system
    fixed_dofs = [1, 2, 2*n_nodes + 1];
    free_dofs = setdiff(1:n_dof, fixed_dofs);
    
    F_global = zeros(n_dof, 1);
    F_global(2*n_nodes - 1) = F;
    F_global(2*n_nodes + n_nodes) = F*s;
    
    u = zeros(n_dof, 1);
    u(free_dofs) = K_global(free_dofs, free_dofs) \ F_global(free_dofs);
    
    % Store tip values
    w_tip(i) = u(2*n_nodes - 1);
    theta_tip(i) = u(2*n_nodes + n_nodes);
    
    % Compute energy norm error (integral from 0 to L)
    x_nodes = linspace(0, L, n_nodes)';
    w = u(1:2:2*n_nodes);
    theta = u(2*n_nodes+1:end);
    
    % Interpolate to common grid
    w_interp = interp1(x_nodes, w, x_ref, 'pchip');
    theta_interp = interp1(x_nodes, theta, x_ref, 'pchip');
    
    % Compute error in displacements
    w_error = w_ref - w_interp;
    theta_error = theta_ref - theta_interp;
    
    % Compute derivatives of error (for energy norm)
    dw_error = gradient(w_error, x_ref);
    dtheta_error = gradient(theta_error, x_ref);
    d2w_error = gradient(gradient(w_error, x_ref), x_ref);
    
    % Energy norm (integral from 0 to L)
    integrand = E*J*(d2w_error).^2 + G*Jp*(dtheta_error).^2;
    energy_error(i) = sqrt(trapz(x_ref, integrand));
end

% Plot convergence results
h = figure('Units', 'inches', 'Position', [0 0 10, 8]);

% Tip deflection convergence
subplot(2,2,1);
loglog(ne_values, abs(w_tip - w_ref(end)), 'b-o', 'LineWidth', 2);
hold on;
loglog(ne_values, 10*ne_values.^(-2), 'k--', 'LineWidth', 1.5); % Expected slope
xlabel('Number of Elements');
ylabel('Error in Tip Deflection (m)');
title('Convergence of Tip Deflection');
legend('Numerical', 'O(h^2)', 'Location', 'best');
grid on;

% Tip twist convergence
subplot(2,2,2);
loglog(ne_values, abs(theta_tip - theta_ref(end)), 'r-o', 'LineWidth', 2);
hold on;
loglog(ne_values, 10*ne_values.^(-2), 'k--', 'LineWidth', 1.5); % Expected slope
xlabel('Number of Elements');
ylabel('Error in Tip Twist (rad)');
title('Convergence of Tip Twist');
legend('Numerical', 'O(h^2)', 'Location', 'best');
grid on;

% Energy norm convergence
subplot(2,2,[3,4]);
loglog(ne_values(2:end), energy_error(2:end), 'k-s', 'LineWidth', 2);
hold on;
loglog(ne_values(2:end), 10*ne_values(2:end).^(-1), 'k--', 'LineWidth', 1.5); % Expected slope
xlabel('Number of Elements');
ylabel('Energy Norm Error');
title('Convergence in Energy Norm (0 to L)');
legend('Numerical', 'O(h)', 'Location', 'best');
grid on;

% Save plot as PDF without white margins
set(h, 'PaperPositionMode', 'auto');
print(h, 'ConvergenceStudy.pdf', '-dpdf', '-bestfit');

% Display convergence rates
w_rate = diff(log(abs(w_tip - w_ref(end)))) ./ diff(log(ne_values));
theta_rate = diff(log(abs(theta_tip - theta_ref(end)))) ./ diff(log(ne_values));
energy_rate = diff(log(energy_error)) ./ diff(log(ne_values));

fprintf('\nConvergence Rates:\n');
fprintf('Tip deflection: %.2f (expected ~2)\n', mean(w_rate));
fprintf('Tip twist: %.2f (expected ~2)\n', mean(theta_rate));
fprintf('Energy norm: %.2f (expected ~1)\n', mean(energy_rate));

fprintf('\nAnalysis complete.\n');

%% Part 6: Mode Shape Error Analysis
fprintf('=== Part 6: Mode Shape Error Analysis ===\n');

% Parameters for mode shape error analysis
ne_values_mode = [5, 10, 20, 40];  % Different mesh sizes to test
mode_shape_errors = zeros(length(ne_values_mode), 4); % Errors for each mode
s_selected = 0.1; % Selected eccentricity for mode shape analysis

% Reference solution (using finest mesh)
ne_ref_mode = 80;
n_nodes_ref_mode = ne_ref_mode + 1;
n_dof_ref_mode = 3 * n_nodes_ref_mode;
Le_ref_mode = L / ne_ref_mode;

% Compute reference mass and stiffness matrices
K_ref_mode = zeros(n_dof_ref_mode);
M_ref_mode = zeros(n_dof_ref_mode);

for elem = 1:ne_ref_mode
    K_e_BB = zeros(4,4);
    K_e_TT = zeros(2,2);
    M_e_BB = zeros(4,4);
    M_e_TT = zeros(2,2);
    M_e_BT = zeros(4,2);
    
    [xi, wgt] = lgwt(4, 0, Le_ref_mode);
    
    for gp = 1:length(xi)
        x_gp = xi(gp);
        % Bending stiffness
        ddN = [(-6/Le_ref_mode^2 + 12*x_gp/Le_ref_mode^3);
               (-4/Le_ref_mode + 6*x_gp/Le_ref_mode^2);
               (6/Le_ref_mode^2 - 12*x_gp/Le_ref_mode^3);
               (-2/Le_ref_mode + 6*x_gp/Le_ref_mode^2)];
        K_e_BB = K_e_BB + E*J*(ddN*ddN')*wgt(gp);
        
        % Torsion stiffness
        dNt = [-1/Le_ref_mode; 1/Le_ref_mode];
        K_e_TT = K_e_TT + G*Jp*(dNt*dNt')*wgt(gp);
        
        % Mass matrices
        N_b = [N1(x_gp); N2(x_gp); N3(x_gp); N4(x_gp)];
        N_t = [N1t(x_gp); N2t(x_gp)];
        
        M_e_BB = M_e_BB + m*(N_b*N_b')*wgt(gp);
        M_e_TT = M_e_TT + I_theta*(N_t*N_t')*wgt(gp);
        M_e_BT = M_e_BT + m*s_selected*(N_b*N_t')*wgt(gp);
    end
    
    % Assembly indices
    bend_dofs = [2*elem-1, 2*elem, 2*elem+1, 2*elem+2];
    tors_dofs = [2*n_nodes_ref_mode + elem, 2*n_nodes_ref_mode + elem + 1];
    
    % Add to global matrices
    K_ref_mode(bend_dofs, bend_dofs) = K_ref_mode(bend_dofs, bend_dofs) + K_e_BB;
    K_ref_mode(tors_dofs, tors_dofs) = K_ref_mode(tors_dofs, tors_dofs) + K_e_TT;
    
    M_ref_mode(bend_dofs, bend_dofs) = M_ref_mode(bend_dofs, bend_dofs) + M_e_BB;
    M_ref_mode(tors_dofs, tors_dofs) = M_ref_mode(tors_dofs, tors_dofs) + M_e_TT;
    M_ref_mode(bend_dofs, tors_dofs) = M_ref_mode(bend_dofs, tors_dofs) + M_e_BT;
    M_ref_mode(tors_dofs, bend_dofs) = M_ref_mode(tors_dofs, bend_dofs) + M_e_BT';
end

% Solve reference eigenvalue problem
fixed_dofs_ref_mode = [1, 2, 2*n_nodes_ref_mode + 1];
free_dofs_ref_mode = setdiff(1:n_dof_ref_mode, fixed_dofs_ref_mode);

[V_ref, D_ref] = eigs(K_ref_mode(free_dofs_ref_mode, free_dofs_ref_mode), ...
                     M_ref_mode(free_dofs_ref_mode, free_dofs_ref_mode), ...
                     4, 'sm');
omega_ref = sqrt(abs(diag(D_ref)));
[omega_ref, idx_ref] = sort(omega_ref);
V_ref = V_ref(:,idx_ref);

% Interpolate reference mode shapes to common grid
x_ref_mode = linspace(0, L, 1000)';
w_ref_modes = zeros(length(x_ref_mode), 4);
theta_ref_modes = zeros(length(x_ref_mode), 4);

for mode = 1:4
    phi_ref = zeros(n_dof_ref_mode, 1);
    phi_ref(free_dofs_ref_mode) = V_ref(:,mode);
    
    w_ref = phi_ref(1:2:2*n_nodes_ref_mode);
    theta_ref = phi_ref(2*n_nodes_ref_mode+1:end);
    
    w_ref_modes(:,mode) = interp1(linspace(0, L, n_nodes_ref_mode), w_ref, x_ref_mode, 'pchip');
    theta_ref_modes(:,mode) = interp1(linspace(0, L, n_nodes_ref_mode), theta_ref, x_ref_mode, 'pchip');
end

% Loop through different mesh sizes
for i = 1:length(ne_values_mode)
    ne = ne_values_mode(i);
    n_nodes = ne + 1;
    n_dof = 3 * n_nodes;
    Le = L / ne;
    
    % Build stiffness and mass matrices
    K = zeros(n_dof);
    M = zeros(n_dof);
    
    for elem = 1:ne
        K_e_BB = zeros(4,4);
        K_e_TT = zeros(2,2);
        M_e_BB = zeros(4,4);
        M_e_TT = zeros(2,2);
        M_e_BT = zeros(4,2);
        
        [xi, wgt] = lgwt(4, 0, Le);
        
        for gp = 1:length(xi)
            x_gp = xi(gp);
            % Bending stiffness
            ddN = [(-6/Le^2 + 12*x_gp/Le^3);
                   (-4/Le + 6*x_gp/Le^2);
                   (6/Le^2 - 12*x_gp/Le^3);
                   (-2/Le + 6*x_gp/Le^2)];
            K_e_BB = K_e_BB + E*J*(ddN*ddN')*wgt(gp);
            
            % Torsion stiffness
            dNt = [-1/Le; 1/Le];
            K_e_TT = K_e_TT + G*Jp*(dNt*dNt')*wgt(gp);
            
            % Mass matrices
            N_b = [N1(x_gp); N2(x_gp); N3(x_gp); N4(x_gp)];
            N_t = [N1t(x_gp); N2t(x_gp)];
            
            M_e_BB = M_e_BB + m*(N_b*N_b')*wgt(gp);
            M_e_TT = M_e_TT + I_theta*(N_t*N_t')*wgt(gp);
            M_e_BT = M_e_BT + m*s_selected*(N_b*N_t')*wgt(gp);
        end
        
        % Assembly indices
        bend_dofs = [2*elem-1, 2*elem, 2*elem+1, 2*elem+2];
        tors_dofs = [2*n_nodes + elem, 2*n_nodes + elem + 1];
        
        % Add to global matrices
        K(bend_dofs, bend_dofs) = K(bend_dofs, bend_dofs) + K_e_BB;
        K(tors_dofs, tors_dofs) = K(tors_dofs, tors_dofs) + K_e_TT;
        
        M(bend_dofs, bend_dofs) = M(bend_dofs, bend_dofs) + M_e_BB;
        M(tors_dofs, tors_dofs) = M(tors_dofs, tors_dofs) + M_e_TT;
        M(bend_dofs, tors_dofs) = M(bend_dofs, tors_dofs) + M_e_BT;
        M(tors_dofs, bend_dofs) = M(tors_dofs, bend_dofs) + M_e_BT';
    end
    
    % Solve eigenvalue problem
    fixed_dofs = [1, 2, 2*n_nodes + 1];
    free_dofs = setdiff(1:n_dof, fixed_dofs);
    
    [V, D] = eigs(K(free_dofs, free_dofs), M(free_dofs, free_dofs), 4, 'sm');
    omega = sqrt(abs(diag(D)));
    [omega, idx] = sort(omega);
    V = V(:,idx);
    
    % Compute mode shape errors
    for mode = 1:4
        phi = zeros(n_dof, 1);
        phi(free_dofs) = V(:,mode);
        
        w = phi(1:2:2*n_nodes);
        theta = phi(2*n_nodes+1:end);
        
        % Interpolate to common grid
        w_interp = interp1(linspace(0, L, n_nodes), w, x_ref_mode, 'pchip');
        theta_interp = interp1(linspace(0, L, n_nodes), theta, x_ref_mode, 'pchip');
        
        % Compute L2 error
        w_error = trapz(x_ref_mode, (w_ref_modes(:,mode) - w_interp).^2);
        theta_error = trapz(x_ref_mode, (theta_ref_modes(:,mode) - theta_interp).^2);
        
        mode_shape_errors(i,mode) = sqrt(w_error + theta_error);
    end
end

% Create and save the plot with directory handling
h = figure('Units', 'inches', 'Position', [0 0 8, 6]);
loglog(ne_values_mode, mode_shape_errors, 'LineWidth', 2);
hold on;
loglog(ne_values_mode, 0.1*ne_values_mode.^(-2), 'k--', 'LineWidth', 1.5);
xlabel('Number of Elements', 'FontSize', 10);
ylabel('Mode Shape Error (L2 Norm)', 'FontSize', 10);
title('Mode Shape Convergence Analysis', 'FontSize', 12);
legend('Mode 1', 'Mode 2', 'Mode 3', 'Mode 4', 'O(h^2)', 'Location', 'northeast');
grid on;

% Handle directory creation and saving
if ~exist('Figures', 'dir')
    try
        mkdir('Figures');
        fprintf('Created Figures directory\n');
    catch
        warning('Could not create Figures directory, saving to current folder');
    end
end

try
    set(h, 'PaperPositionMode', 'auto');
    print(h, 'Figures/ModeShapeConvergence.pdf', '-dpdf', '-bestfit');
    fprintf('Plot saved to Figures/ModeShapeConvergence.pdf\n');
catch
    set(h, 'PaperPositionMode', 'auto');
    print(h, 'ModeShapeConvergence.pdf', '-dpdf', '-bestfit');
    fprintf('Plot saved to current folder as ModeShapeConvergence.pdf\n');
end


% Display convergence rates
fprintf('\nMode Shape Convergence Rates:\n');
for mode = 1:4
    rates = diff(log(mode_shape_errors(:,mode))) ./ diff(log(ne_values_mode));
    fprintf('Mode %d: %.2f (expected ~2)\n', mode, mean(rates));
end

fprintf('\nAnalysis complete.\n');


