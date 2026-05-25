%% Fluid-Structure Interaction Analysis & Plotting
% Replicates NASTRAN Results and generates detailed Plots
% 1. Uncoupled Plate
% 2. Uncoupled Cavity (Box View)
% 3. Coupled System (Split view: Plate & Cavity Box)

clear; clc; close all;

%% 1. SYSTEM PROPERTIES
% Geometry
Lx = 0.6; Ly = 0.5; Lz = 0.4;

% Fluid (Air)
rho_f = 1.2; c_f = 340;

% Structure (Aluminum Plate)
h = 2e-3; E = 70e9; nu = 0.25; rho_s = 2700;
D = (E * h^3) / (12 * (1 - nu^2)); 

% Simulation Settings
num_modes_plot = 4; % How many modes to plot per figure
basis_P = 8; basis_C = 8; % Basis size

%% 2. CALCULATE UNCOUPLED MODES
% --- Plate ---
plate_modes = [];
for m = 1:basis_P
    for n = 1:basis_P
        freq = (pi/2) * sqrt(D/(rho_s*h)) * ((m/Lx)^2 + (n/Ly)^2);
        plate_modes = [plate_modes; freq, m, n];
    end
end
[~, idx] = sort(plate_modes(:,1));
plate_data = plate_modes(idx, :);

% --- Cavity ---
cavity_modes = [];
for i = 0:basis_C
    for j = 0:basis_C
        for k = 0:basis_C
            if i==0 && j==0 && k==0; continue; end
            freq = (c_f/2) * sqrt((i/Lx)^2 + (j/Ly)^2 + (k/Lz)^2);
            cavity_modes = [cavity_modes; freq, i, j, k];
        end
    end
end
[~, idx] = sort(cavity_modes(:,1));
cavity_data = cavity_modes(idx, :);

%% 3. SOLVE COUPLED SYSTEM
fprintf('Solving Coupled System...\n');

% Basis Lists
P_basis = []; for m=1:basis_P, for n=1:basis_P, P_basis=[P_basis; m, n]; end, end
C_basis = []; for i=0:basis_C, for j=0:basis_C, for k=0:basis_C, C_basis=[C_basis; i, j, k]; end, end, end
N_p = size(P_basis, 1); N_c = size(C_basis, 1);

% Matrices construction
omega_s = (pi^2 * sqrt(D/(rho_s*h))) .* ((P_basis(:,1)/Lx).^2 + (P_basis(:,2)/Ly).^2);
omega_f = c_f * pi * sqrt( (C_basis(:,1)/Lx).^2 + (C_basis(:,2)/Ly).^2 + (C_basis(:,3)/Lz).^2 );

M_s = (rho_s * h * Lx * Ly) / 4 * eye(N_p);
K_s = diag(diag(M_s) .* omega_s.^2);

M_f = zeros(N_c, 1); Vol = Lx*Ly*Lz;
for r = 1:N_c
    eps = (1+(C_basis(r,1)==0)) * (1+(C_basis(r,2)==0)) * (1+(C_basis(r,3)==0));
    M_f(r) = Vol / eps;
end
M_f_mat = diag(M_f); K_f_mat = diag(M_f .* omega_f.^2);

L_mat = zeros(N_c, N_p);
for r = 1:N_c
    for p = 1:N_p
        i=C_basis(r,1); j=C_basis(r,2); k=C_basis(r,3);
        m=P_basis(p,1); n=P_basis(p,2);
        
        if mod(i+m,2)==0, Ix=0; else, Ix=(2*m*Lx)/(pi*(m^2-i^2)); end
        if mod(j+n,2)==0, Iy=0; else, Iy=(2*n*Ly)/(pi*(n^2-j^2)); end
        Iz = cos(k*pi);
        L_mat(r,p) = Ix*Iy*Iz;
    end
end

A = [K_s, -L_mat'; zeros(N_c, N_p), K_f_mat];
B = [M_s, zeros(N_p, N_c); rho_f*L_mat, M_f_mat];

[vecs, vals] = eig(A, B);
freqs_c = sqrt(diag(vals))/(2*pi);

valid = find(imag(freqs_c)==0 & real(freqs_c)>=0 & ~isinf(freqs_c));
freqs_c = freqs_c(valid); vecs = vecs(:, valid);
[freqs_c, s_idx] = sort(freqs_c); vecs = vecs(:, s_idx);

%% 4. PLOTTING
[X, Y] = meshgrid(linspace(0, Lx, 40), linspace(0, Ly, 40));
[Xv, Yv, Zv] = meshgrid(linspace(0, Lx, 20), linspace(0, Ly, 20), linspace(0, Lz, 20));

% --- FIGURE 1: UNCOUPLED PLATE ---
figure('Name', 'Uncoupled Plate', 'Color', 'w', 'Position', [50, 50, 1200, 300]);
sgtitle('Uncoupled Plate Modes (Analytical)');
for k = 1:num_modes_plot
    m = plate_data(k, 2); n = plate_data(k, 3); f = plate_data(k, 1);
    Z = sin(m*pi*X/Lx) .* sin(n*pi*Y/Ly);
    
    subplot(1, num_modes_plot, k);
    surf(X, Y, Z); shading interp; colormap jet; axis equal; axis off;
    title(sprintf('Mode %d: %.1f Hz\n(m=%d, n=%d)', k, f, m, n)); view(3);
end

% --- FIGURE 2: UNCOUPLED CAVITY (BOX VIEW) ---
figure('Name', 'Uncoupled Cavity', 'Color', 'w', 'Position', [50, 400, 1200, 300]);
sgtitle('Uncoupled Cavity Modes (Pressure Box)');
for k = 1:num_modes_plot
    i = cavity_data(k, 2); j = cavity_data(k, 3); l = cavity_data(k, 4); f = cavity_data(k, 1);
    P = cos(i*pi*Xv/Lx) .* cos(j*pi*Yv/Ly) .* cos(l*pi*Zv/Lz);
    
    subplot(1, num_modes_plot, k);
    % Plot on all 6 faces to visualize as a box
    slice(Xv, Yv, Zv, P, [0, Lx], [0, Ly], [0, Lz]); 
    shading interp; colormap jet; axis equal; axis tight; axis off;
    title(sprintf('Mode %d: %.1f Hz\n(i=%d, j=%d, k=%d)', k, f, i, j, l)); view(3);
end

% --- FIGURE 3: COUPLED SYSTEM (SPLIT VIEW) ---
figure('Name', 'Coupled System', 'Color', 'w', 'Position', [50, 100, 1200, 600]);
sgtitle('Coupled System: Plate Displacement (Top) & Cavity Pressure (Bottom)');

plot_indices = 2:5; % Skip 0 Hz rigid mode

for k = 1:length(plot_indices)
    mode_idx = plot_indices(k);
    vec = vecs(:, mode_idx);
    
    % Reconstruct Fields
    w_plate = zeros(size(X));
    p_cavity = zeros(size(Xv));
    
    q_s = vec(1:N_p);
    q_f = vec(N_p+1:end);
    
    % Plate Sum
    for p=1:N_p
        m=P_basis(p,1); n=P_basis(p,2);
        w_plate = w_plate + q_s(p) * sin(m*pi*X/Lx).*sin(n*pi*Y/Ly);
    end
    
    % Cavity Sum
    for r=1:N_c
        i=C_basis(r,1); j=C_basis(r,2); l=C_basis(r,3);
        term = cos(i*pi*Xv/Lx).*cos(j*pi*Yv/Ly).*cos(l*pi*Zv/Lz);
        p_cavity = p_cavity + q_f(r) * term;
    end
    
    % --- TOP ROW: PLATE ---
    subplot(2, 4, k);
    surf(X, Y, w_plate); 
    shading interp; colormap jet; axis equal; axis off;
    title(sprintf('Mode %d (%.1f Hz)\nPlate Disp.', mode_idx, freqs_c(mode_idx)));
    view(3); box on;
    
    % --- BOTTOM ROW: CAVITY (BOX VIEW) ---
    subplot(2, 4, k+4);
    % Plot on all 6 faces
    slice(Xv, Yv, Zv, p_cavity, [0, Lx], [0, Ly], [0, Lz]);
    shading interp; colormap jet; axis equal; axis tight; axis off;
    title('Cavity Pressure'); 
    view(3); box on;
end


