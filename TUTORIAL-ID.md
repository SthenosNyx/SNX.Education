# S-NX Education | Technical Instructions

This document provides comprehensive technical instructions for content synchronization, structural updates, and the deployment workflow for the S-Edu Portal utilizing Vercel's infrastructure.

---

## 1. Core Content Maintenance

All primary data is stored within the specific HTML modules. Maintenance requires precise modification of the DOM structure to ensure the minimalist S-NX aesthetic remains intact.

### A. Task Management and Filtering (tugas.html)
The task dashboard utilizes a card-based system identified by the "task-card" class. To append new assignments, replicate an existing task block while adhering to the following data parameters:
- **Category Assignment:** Modify the `data-category` attribute. Valid values include "general", "religious", "exact-sciences", or "languages". This is critical for the JavaScript filtering engine.
- **Header Specification:** Update the text within the `<h3>` tags for the assignment title.
- **Narrative Content:** Replace the text within the `<p>` tags for the task description.
- **Temporal Metadata:** Update the deadline information within the `<span>` tag located in the card footer.

### B. Educational Material and Accordion Logic (materi-lengkap.html)
This module employs a high-performance CSS-JS Accordion system. To ensure smooth transitions, follow these structural rules:
1. **Category Triggers:** Locate elements with the `category-btn` class to update subject headers.
2. **Content Injection:** Insert data within the `category-content` div. For optimal rendering, utilize the following standard HTML elements:
   - Paragaphs: Use `<p>` tags for standard descriptions.
   - List Structures: Use `<ul>` and `<li>` for bulleted technical points.
   - Attachment Links: Use `<a href="URL" class="nav-item">` for downloadable resources. 
   - Note: Do not remove the `max-height` logic in the script, as it calculates the scrollHeight dynamically.

### C. Academic Calendar and Event Configuration (jadwal.html)
The calendar interface is driven by a centralized JavaScript object. Navigate to the script section at the bottom of the file and locate the `myEvents` constant:
```javascript
const myEvents = {
    '2026-04-15': 'Final Semester Examination',
    '2026-04-20': 'Eid Al-Fitr Break',
    // Append new chronological data here
};
