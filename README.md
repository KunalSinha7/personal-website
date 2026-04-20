# Kunal Sinha's Personal Website

A high-performance, minimalist personal portfolio built using the latest web technologies. This project serves as a professional showcase of work experience and education, optimized for speed, SEO, and developer experience.

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/) (utilizing the new **React Compiler**)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (CSS-first configuration)
- **Content:** [MDX](https://mdxjs.com/) for structured pages (`/work`, `/education`)
- **Icons:** [FontAwesome 7](https://fontawesome.com/)
- **Deployment:** [Netlify](https://www.netlify.com/) (configured with Netlify Core Primitives)

## 📂 Project Structure

- `app/`: Core application routes and metadata.
  - `page.jsx`: Hero/Home page.
  - `work/page.mdx`: Professional history.
  - `education/page.mdx`: Academic background.
  - `layout.jsx`: Root layout with global background and metadata.
- `components/`: Shared React components (e.g., `Footer`).
- `styles/`: Global styles and Tailwind `@theme` configuration in `globals.css`.
- `public/`: Static assets including optimized WebP backgrounds and SVG icons.

## 🛠️ Local Development

### Prerequisites

- **Node.js:** 20+ (recommended for Tailwind 4 performance)
- **Netlify CLI:** [Install globally](https://docs.netlify.com/cli/get-started/) for local emulation.
  ```bash
  npm install netlify-cli@latest -g
  ```

### Getting Started

1. Clone the repository and navigate to the root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Link your local repository to your Netlify site (ensures runtime parity):
   ```bash
   netlify link
   ```
4. Run the development server via Netlify CLI:
   ```bash
   netlify dev
   ```
   Open [http://localhost:8888](http://localhost:8888) in your browser.

## 🏗️ Build & Deployment

### Production Build
To generate an optimized production build:
```bash
npm run build
```

### Netlify Deployment
The project is configured for seamless deployment on Netlify. 
- **Build Command:** `npm run build`
- **Publish Directory:** `.next`
- **Configuration:** Managed via `netlify.toml` for standard platform builds.
