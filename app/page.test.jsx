import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Page from './page';

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Page />);
    expect(screen.getByText(/Hi, I'm/i)).toBeInTheDocument();
    expect(screen.getByText(/Kunal Sinha/i)).toBeInTheDocument();
  });

  it('renders current role information', () => {
    render(<Page />);
    expect(screen.getByText(/CarGurus/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Page />);
    const workLink = screen.getByRole('link', { name: /Work Experience/i });
    const educationLink = screen.getByRole('link', { name: /Education/i });

    expect(workLink).toBeInTheDocument();
    expect(workLink.getAttribute('href')).toBe('/work');
    expect(educationLink).toBeInTheDocument();
    expect(educationLink.getAttribute('href')).toBe('/education');
  });
});
