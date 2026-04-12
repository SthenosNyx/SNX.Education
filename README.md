# S-NX Education | Opening
S-NX Education (S-Edu) is a digital learning ecosystem that prioritizes an ultra-minimalist aesthetic and high functionality. We will continue to update the system in accordance with user complaints and will develop it until the final stage of perfection.

The portal is a high-fidelity academic environment custom-built for Ibnul Qayyim Islamic School Makassar (IQIS). Developed under the S-NX design philosophy, it integrates a sophisticated UI/UX framework with high-performance logic to streamline the student academic journey.

---

## Technical Features

### Advanced Navigation Architecture
- **Independent Layering System:** Utilizing a decoupled DOM hierarchy to ensure 100% viewport stability, eliminating layout drift and dead zones during sidebar transitions.
- **Synchronized Push Logic:** A hardware-accelerated movement engine that shifts the primary interface in tandem with the navigation drawer, maintaining full discoverability of interactive elements.

### Persistence and State Management
- **S-Edu Theme Engine:** A memory-persistent Dark/Light mode toggle utilizing LocalStorage to maintain user preferences across multiple sessions.
- **Dynamic Content Filtering:** Integrated search and categorization logic for academic tasks, allowing for instantaneous data retrieval without page reloads.

### Responsive Design Philosophy
- **Adaptive Viewports:** Fully optimized for high-resolution desktop monitors and mobile devices, utilizing fluid typography and calibrated cubic-bezier animations (0.4s) for a premium feel.
- **Intelligent Scheduler:** A JavaScript-driven calendar system designed to manage academic agendas with real-time status updates.

## Technical Stack
- **Languages:** HTML5 (Semantic Structure), CSS3 (Modern Flex/Grid & Variables), JavaScript (Vanilla ES6+)
- **Architecture:** Zero-Framework approach for maximum performance and pure hand-coded logic.
- **Typography & Icons:** Montserrat System and Google Material Symbols (Rounded variant).
- **Core Intelligence:** Collaborative logic development via Gemini AI Partner.

## Directory Structure
```text
/ (root)
├── LICENSE              (Project Licensing)
├── README.md            (General Project Overview)
├── RELEASENOTES.md      (Version History and Changelogs)
├── TUTORIAL-ID.md       (User and Deployment Manual)
└── /core                (Primary Application Logic)
    ├── index.html       (Main Landing Page / Gateway)
    ├── info.html        (Project Metadata and Credits)
    ├── jadwal.html      (Academic Calendar Interface)
    ├── materi-lengkap.html (Educational Material with Accordion UI)
    ├── materi.html      (General Resource Library)
    └── tugas.html       (Task Management Dashboard)
