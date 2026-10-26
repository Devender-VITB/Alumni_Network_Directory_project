import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

describe('Authentication Form Validations', () => {
  it('renders login form and requires email and password', () => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Alumni Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Demo Credentials Quick-Fill/i)).toBeInTheDocument();
  });

  it('renders registration form with required fields', () => {
    render(
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <RegisterPage />
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete Registration/i)).toBeInTheDocument();
  });
});
