# Colorist - HTML Template

A maximalist, comic-editorial style HTML template built for freelance comic book colorists.

## Features
- **Design Aesthetic:** Bold ink-pop, panel grids, halftone textures.
- **RTL Support:** Full right-to-left layout support included.
- **Dark/Light Mode:** Integrated theme toggler.
- **Responsive:** 1024px hamburger drawer, perfect mobile layout.
- **Animations:** Custom CSS hero animations and panel reveals.
- **Vanilla JS:** Zero dependencies (except Phosphor icons CDN).

## File Structure
- `index.html` - Main landing page
- `home2.html` - Alternative split-layout landing page
- `portfolio.html` - Portfolio grid with category filters and lightbox
- `portfolio-single.html` - Case study with Before/After slider
- `services.html` - Services and pricing packages
- `style-guide.html` - Artist style guide and process explanation
- `blog.html` - Blog post grid
- `blog-single.html` - Single article layout
- `contact.html` - Contact form with client-side validation
- `404.html` - Comic-styled error page
- `coming-soon.html` - Countdown landing page
- `assets/css/style.css` - Main stylesheet (variables, components, dark mode overrides)
- `assets/css/rtl.css` - RTL specific overrides
- `assets/js/main.js` - Core functionality (nav, theme, RTL, form validation)
- `assets/js/portfolio.js` - Portfolio specific features (filtering, lightbox, slider)

## Usage
No build step is required. Just open `index.html` in your browser. All styles are compiled in standard CSS.
Images are placeholders from Unsplash. Phosphor icons are loaded via CDN.

## Integrating Forms
The contact form uses a placeholder `action`. To make it functional, replace the action URL with your form provider (e.g., Formspree, Netlify Forms).
