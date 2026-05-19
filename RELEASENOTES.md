# S-NX Education | Change Logs
We will continue to update the system in accordance with tester complaints and will develop it until the final stage of perfection.

---

## Version 2.2.0
### Architectural Reconciliation & Responsive Layout Stabilization

#### Critical Schedule Page Layout Engine Isolation
- **Tester Feedback:** The Schedule and Calendar page suffered from a severe layout regression where internal HTML style overrides clashed with the global design system. This resulted in the calendar grid cells doubling, breaking the 7-column layout, and causing display inconsistencies across mobile and desktop devices.
- **Technical Solution:** Performed a surgical removal of all conflicting inline CSS styles from `jadwal.html`. Implemented a strictly decoupled responsive engine in `global.css` that utilizes specific media query breakpoints: a precise `1.6fr 1fr` grid for desktops and a forced `1fr` vertical stack for mobile. Added a protected CSS namespace for `#calendarGrid` and `.calendar-grid` to ensure the 7-column calendar structure remains immutable regardless of external layout changes.

#### Global Design System Integrity & Anti-Flicker Injection
- **Tester Feedback:** Users reported a "white flash" (flicker) artifact during page reloads, particularly when the system was running in Dark Mode. Additionally, partial updates to the global CSS caused side-effect failures on the About, Tasks, and Materials pages.
- **Technical Solution:** Re-unified the complete S-NX core token framework (v3.0) to ensure cross-page consistency. Implemented a lightweight, blocking inline script within the document `<head>` that parses `localStorage` to apply the correct `data-theme` attribute before the browser performs its first paint. This permanently eliminates theme-transition flickering and provides a seamless, professional loading experience across all page modules.

---

## Version 2.1.0
### Dynamic Data Refactoring & Aesthetic Grid Restoration

#### Synchronization and Architecture Overhaul of `materi-lengkap.html`
- **Tester Feedback:** The `materi-lengkap.html` page was found to be using an outdated visual blueprint, lacking responsiveness, and experiencing structural failures when attempting to render dynamic data.
- **Technical Solution:** Executed a comprehensive refactor by building a split-screen layout comprising two primary functional areas: the `#mainSidebar` navigation panel and the `#readerArea` reading view. Integrated a centralized dynamic data-fetching architecture powered by an asynchronous Fetch API from the `materi-db.json` file utilizing `URLSearchParams`. This is complemented by the deployment of a mobile Floating Action Button (FAB) component featuring maximum elevation (`z-index: 10005`) and high visual contrast to ensure friction-free interaction across layered elements.

#### Correction of Multi-Column Grid Anomaly (3-Card Bug)
- **Tester Feedback:** Card components within `tugas.html` and `materi.html` inadvertently split into a 3-column layout at specific viewport resolutions. This compromised the premium whitespace aesthetics characteristic of S-NX and deviated from the original Figma design blueprints.
- **Technical Solution:** Resolved the anomaly completely by locking the `.card-grid` layout configurations absolutely to a maximum of **2 Columns** on desktop resolutions and **1 Column** on mobile viewports. Implemented a strict `max-width: 950px` restriction combined with auto-centering (`margin: 0 auto`) to eliminate the stretched/skinny card issue, restoring a visual composition that is proportional, clean, and elegant.

---

## Version 2.0.0
### Mobile Interaction Restoration & Fluid Typography Optimization

#### Mobile Navigation Interactive Layer Restoration (Theme & Hamburger Lockdown)
- **Tester Feedback:** The Theme Toggle feature and the animated hamburger menu icon across the mobile interface were completely locked up, rendering them entirely non-responsive to touch or click inputs.
- **Technical Solution:** Resolved stacking context conflicts by elevating the hierarchy of the navigation elements to the topmost layer (`z-index: 10000`) and injecting `pointer-events: auto`. Furthermore, to refine the codebase arichitecture, all inline script logic scattered throughout the legacy HTML files was purged and delegated entirely to `assets/js/main.js`.

#### Proportional Scale-Based Fluid Typography Implementation
- **Tester Feedback:** The typography scale and font dimensions appeared distorted and excessively massive when viewed on small-screen devices, triggering viewport overflows that severely degraded reading comfort.
- **Technical Solution:** Initiated a global migration from static font sizes to the modern CSS `clamp()` function. This approach forces text elements (Montserrat) to scale down dynamically and proportionally based on the mobile device's viewport width without disrupting the overall design balance.

---

## Version 1.2.0
### Advanced Structural Architecture and Layout Stability

#### Elimination of Viewport Displacement
- **Tester Feedback:** We received critical reports regarding a technical visual bug where a black void or empty dead space appeared on the left flank of the interface whenever the sidebar was toggled on specific device viewports.
- **Technical Solution:** The investigation revealed a rendering conflict within the CSS stacking context, specifically between fixed positioning and parent-level hardware-accelerated transformations. To resolve this, we performed a complete decoupling of the DOM structure. The Sidebar component has been moved to a top-level independent layer, separate from the Main Content wrapper. This structural shift ensures that the viewport remains fully saturated with brand-consistent backgrounds, effectively eliminating layout drift and maintaining a stable 1:1 visual ratio across all modern browsers and screen resolutions.

#### Optimization of Interactive Layers
- **Improvement:** Refined the z-index hierarchy to prevent element overlapping during high-speed transitions.
- **Improvement:** Implemented a strict overflow-x management system on the body element to prevent accidental horizontal scrolling during sidebar deployment.

---

## Version 1.1.0
### Mobile Navigation Synchronicity and Accessibility

#### Synchronized Push Mechanic
- **Tester Feedback:** Users reported that the global navigation header and the critical 'Back to Catalog' link became obscured or completely inaccessible when the navigation drawer was expanded on mobile devices, disrupting the user journey.
- **Technical Solution:** We engineered a Unified Synchronized Push system. Rather than having the sidebar slide *over* the content, the entire interface architecture—including the sticky top navigation and backdrop filters—now shifts programmatically in tandem with the sidebar’s entry animation. By utilizing a standardized cubic-bezier transition curve (0.4, 0, 0.2, 1), we have ensured that all interactive controls remain visible and functional at all times, maintaining 100% UI discoverability and frictionless navigation flow.

#### Touch Interface Refinement
- **Improvement:** Adjusted the Floating Action Button (FAB) hitboxes to meet ergonomic standards for single-handed mobile usage.
- **Improvement:** Integrated intelligent backdrop event listeners to allow for intuitive "click-outside-to-close" functionality, streamlining the mobile experience.

---

## Version 1.0.0
### Foundation of Visual Identity and Readability

#### Material Depth and Background Integrity
- **Tester Feedback:** Initial feedback from early testers indicated that the navigation sidebar appeared ghostly or semi-transparent, causing sidebar links to overlap visually with the primary article content, which severely hindered readability and professional appeal.
- **Technical Solution:** We reinforced the core CSS variable inheritance for the side-background property across the entire stylesheet. The sidebar was upgraded from a transparent state to a high-opacity solid hex value (Deep Charcoal for Dark Mode and Pure White for Light Mode). This creates a distinct "Material Depth," establishing a clear visual boundary between the navigation layer and the content layer. This improvement adheres to the S-NX minimalist design standards, ensuring that typography remains sharp and legible regardless of the density of the underlying educational material.

#### Typography and Branding Initialization
- **Improvement:** Deployed the Montserrat typography system across all headers and UI components to establish the project's premium identity.
- **Improvement:** Standardized the S-NX branding assets, ensuring high-definition rendering of icons and logos within the sidebar header.

---
