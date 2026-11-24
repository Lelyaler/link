# LinkFlow — Autonomous Signal & Workflow Orchestration

> High-performance multi-page enterprise landing website built with semantic HTML5, BEM methodology, modular SCSS, and Vanilla JavaScript. Features seamless 30 FPS canvas boomerang video playback, interactive data calculators, real-time signal simulation playground, and a **98+ Mobile Performance score** on Google Lighthouse.

🌐 **Live Demo:** [https://lelyaler.github.io/link/](https://lelyaler.github.io/link/)

---

## 🚀 Key Highlights & Architectural Features

- **Multi-Page Architecture:**
  - `index.html` — Hero section with dynamic boomerang video background, platform metrics, and interactive signal simulation.
  - `process.html` — Architectural deep-dive: ingress, reasoning, and distributed dispatch engine.
  - `capabilities.html` — Enterprise features: visual composer, SOC2 Type II compliance, and observability.
  - `pricing.html` — Dynamic signal volume & ROI calculator with monthly/annual toggle.
  - `about.html` — Mission, leadership team, and global distributed edge infrastructure.
  - `contact.html` — Technical evaluation form and VIP sandbox access.
- **Visual Design & Performance:**
  - **98 Mobile Performance** on Google Lighthouse (FCP 1.3s, LCP 1.3s, TBT 150ms, CLS 0.001).
  - **100 Best Practices & 100 SEO**.
  - **Canvas Boomerang Engine (`js/boomerang.js`):** Silky-smooth 30 FPS forward-and-backward video playback loop with zero memory leaks.
  - **Adaptive Payload Strategy:** Serves ambient animated gradient on mobile (<768px / data-saver) to keep network payload under 150 KB, while loading full video on desktop.
  - **Strict BEM Methodology:** Predictable, maintainable CSS component architecture.
  - **Modular SCSS:** Organized into variables, mixins, reset, and component blocks.

---

## 🛠️ Tech Stack

- **Markup:** HTML5 (Semantic, accessible, WCAG AA compliant)
- **Styles:** SCSS / Sass (BEM methodology, compiled with Dart Sass)
- **Scripts:** Vanilla JavaScript (ES6+, zero heavy external dependencies)
- **Video & Graphics:** HTML5 Video + Canvas 2D API
- **Fonts:** Inter (Google Fonts with non-blocking preload & swap) + System fallbacks

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lelyaler/link.git
   cd link
   ```

2. **Install dependencies (Sass compiler):**
   ```bash
   npm install
   ```

3. **Compile or watch styles:**
   ```bash
   # Compile compressed CSS for production
   npm run build:css

   # Watch for changes during development
   npm run watch:css
   ```

4. **Run local server:**
   ```bash
   # Using Python
   python3 -m http.server 8080

   # Or using npx serve
   npx serve .
   ```

5. Open `http://localhost:8080` in your browser.

---

## 📄 License

MIT License © 2026 [Valeriya Cherniavskaya](https://github.com/Lelyaler).
