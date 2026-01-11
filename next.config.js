import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://docs.netlify.com/frameworks/next-js/overview/',
        permanent: false,
      },
      {
        source: '/old-blog/:slug',
        destination: '/classics',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/netlify-templates/next-platform-starter',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  rewrites() {
    return [
      {
        source: '/blog',
        destination: '/classics',
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
