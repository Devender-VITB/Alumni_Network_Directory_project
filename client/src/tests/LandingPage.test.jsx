import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import HomePage from '../pages/HomePage';

describe('HomePage Landing Screen', () => {
  it('renders hero title and core value proposition', () => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <HomePage />
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Your Alumni Network Is Your/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore Alumni Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/Apex Alumni at a Glance/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Platform Capabilities/i)).toBeInTheDocument();
    expect(screen.getByText(/Featured Alumni Leaders/i)).toBeInTheDocument();
  });
});
