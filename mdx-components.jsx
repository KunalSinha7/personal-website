import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export function useMDXComponents(components) {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-8 text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-200">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mt-6 mb-3 text-gray-200">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-relaxed text-gray-300 mb-6">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 text-gray-300">{children}</ul>
    ),
    li: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
    strong: ({ children }) => (
      <strong className="text-white font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-gray-400">{children}</em>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-blue-400 hover:text-blue-300 hover:underline">
        {children}
      </a>
    ),
    wrapper: ({ children }) => (
      <article className="mx-auto max-w-3xl px-6 py-12 sm:px-12 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
        <div className="prose prose-invert max-w-none mb-12">
          {children}
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </article>
    ),
    ...components,
  }
}
