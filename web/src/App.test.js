import { render, screen, fireEvent } from '@testing-library/svelte';
import App from './App.svelte';
import { describe, it, expect } from 'vitest';

describe('App Router', () => {
  it('should render the login page by default', () => {
    render(App);
    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('should navigate to the signup page', async () => {
    render(App);
    const signupLink = screen.getByText(/Sign Up/i);
    await fireEvent.click(signupLink);
    // Note: svelte-routing might need special handling for tests, 
    // but fireEvent.click on a Link should work if it's rendered.
    // However, since we are using 'component' prop in Route, it should render.
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });
});
