import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppContext } from '@/Context/AppContext';
import Navbar from '@/components/Navbar/Navbar';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {}
    })
  }
})

describe('Navbar Component', () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('user interacts with login button', () => {
    // Mock useSession to return unauthenticated status
    useSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    // Render the Navbar component
    render(
      <AppContext.Provider value={{ getCartTotal: 0, showProfileMenu: false, setShowProfileMenu: false }}>
        <Navbar />
      </AppContext.Provider>
    );

    // Find the login button
    const loginButton = screen.getByText('Login');

    // Simulate clicking the login button
    fireEvent.click(loginButton);

    // Expect the signIn function from next-auth to have been called
    expect(signIn).toHaveBeenCalled();
  });

  test('renders Login and Sign Up buttons when user is unauthenticated', () => {
    // Mock useSession to return unauthenticated status
    useSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    // Render the Navbar component
    render(
      <AppContext.Provider value={{ getCartTotal: 0, showProfileMenu: false, setShowProfileMenu: false }}>
        <Navbar />
      </AppContext.Provider>
    );

    // Check that the Login and Sign Up buttons are present
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('renders user info and logout button when user is authenticated', () => {
    // Mock useSession to return authenticated status with a user object
    useSession.mockReturnValue({
      data: {
        user: {
          username: 'testuser',
        },
      },
      status: 'authenticated',
    });

    // Render the Navbar component
    render(
      <AppContext.Provider value={{ getCartTotal: 0, showProfileMenu: false, setShowProfileMenu: false }}>
        <Navbar />
      </AppContext.Provider>
    );

    // Check that the username and logout button are present
    expect(screen.getByText('testuser')).toBeInTheDocument();
    
  });
});

describe('Navbar', () => {
  it('renders restaruant list', () => {
    render(
      <AppContext.Provider value={{ getCartTotal: 0, showProfileMenu: false, setShowProfileMenu: false }}>
        <Navbar />
      </AppContext.Provider>
    );
 
    const heading = screen.getByRole("Logo")
 
    expect(heading).toBeInTheDocument()
  })
})




