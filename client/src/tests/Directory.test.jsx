import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import DirectoryPage from '../pages/DirectoryPage';
import { alumniService } from '../services/alumniService';

describe('DirectoryPage Component', () => {
  it('alumniService.getAlumni returns items correctly', async () => {
    const data = await alumniService.getAlumni();
    expect(data.items.length).toBeGreaterThan(0);
    expect(data.items[0].fullName).toBeDefined();
    expect(data.pagination.total).toBeGreaterThan(0);
  });

  it('renders directory search, filter chips, and verified alumni cards', async () => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <DirectoryPage />
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Search by name, company/i)).toBeInTheDocument();
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText(/Showing/i)).toBeInTheDocument();
      expect(screen.getAllByText(/View Profile/i).length).toBeGreaterThan(0);
    }, { timeout: 3000 });
  });
});
