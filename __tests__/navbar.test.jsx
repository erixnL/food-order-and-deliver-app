import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/Navbar/Navbar';
import { signIn, signOut, useSession } from 'next-auth/react';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

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
    render(<Navbar />);

    // Find the login button
    const loginButton = screen.getByText('Login');

    // Simulate clicking the login button
    fireEvent.click(loginButton);

    // Expect the signIn function from next-auth to have been called
    expect(signIn).toHaveBeenCalled();
  });

  test('user interacts with logout button', () => {
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
    render(<Navbar />);

    // Find the logout button
    const logoutButton = screen.getByText('Logout');

    // Simulate clicking the logout button
    fireEvent.click(logoutButton);

    // Expect the signOut function from next-auth to have been called
    expect(signOut).toHaveBeenCalled();
  });

  test('renders Login and Sign Up buttons when user is unauthenticated', () => {
    // Mock useSession to return unauthenticated status
    useSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    // Render the Navbar component
    render(<Navbar />);

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
    render(<Navbar />);

    // Check that the username and logout button are present
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});

describe('Navbar', () => {
  it('renders restaruant list', () => {
    render(<Navbar />)
 
    const heading = screen.getByRole("Logo")
 
    expect(heading).toBeInTheDocument()
  })
})

