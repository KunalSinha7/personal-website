import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './footer';

describe('Footer', () => {
  it('renders the copyright text with the current year', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    expect(screen.getByText(/Kunal Sinha/i)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    const githubLink = screen.getByLabelText(/GitHub/i);
    const linkedinLink = screen.getByLabelText(/LinkedIn/i);
    const twitterLink = screen.getByLabelText(/Twitter/i);
    const resumeLink = screen.getByLabelText(/Resume/i);

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(resumeLink).toBeInTheDocument();
  });
});
