# Vini Blog 🚀

A personal blog project built with the latest web technologies, focusing on high performance, modern design, and seamless content management.

## 🛠 Tech Stack

This project is built using the latest versions of modern frameworks and libraries to ensure stability and performance.

### Core
- **Next.js 15.4** (App Router, Standalone mode)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**

### Content & Styling
- **MDX**: `@next/mdx`, `next-mdx-remote` for dynamic content rendering.
- **Animations**: `framer-motion` for smooth UI transitions and interactions.
- **Syntax Highlighting**: `prismjs` & `rehype-highlight` for beautiful code snippets.
- **Icons**: `lucide-react` for modern, lightweight iconography.

### Infrastructure
- **Docker**: Containerized deployment.
- **Jenkins**: CI/CD automation.

## 🚀 Key Features
- **Dynamic Routing**: Automatic post generation based on MDX files.
- **Momentum Scrolling**: Custom `useMomentumScroll` hook for a premium scrolling experience.
- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **SEO Optimized**: Metadata API integration for better search engine visibility.
- **CI/CD Ready**: Integrated with Jenkins and Docker for automated builds and deployments.

## 📦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VIINIU/vini_blog.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## PWA

- Production builds provide a web app manifest and a service worker. Deployment requires HTTPS (localhost is also supported).
- Install through the browser's install menu, or Safari's Share → Add to Home Screen. There is no in-page install banner, and the existing web layout is unchanged.
- The service worker stores successful full-page navigations, blog content, images, and fonts after it takes control. Offline requests use saved responses; uncached pages show a self-contained offline notice. The first visit and client-side navigation do not guarantee that a full HTML page has been stored. To check a post offline, reload it online after the service worker activates, then disconnect and reload again.
- Next.js RSC navigation responses, API requests, and analytics are excluded from caching. Offline client-side navigation is not guaranteed; use a full-page reload to request a saved page.
- Cache storage is limited to 150 entries. Updates wait for existing tabs to close; bump the cache version in `public/sw.js` when changing the offline resources or cache policy.
- For verification, build and start production locally, inspect Application → Manifest / Service Workers in browser developer tools, then check installation and offline reloads. Development mode does not register the service worker. If testing development on an origin previously used for production, unregister its worker and clear its cache first.

