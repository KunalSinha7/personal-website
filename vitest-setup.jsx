import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));

// Mock FontAwesome
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => <span data-testid="icon" />,
}));
