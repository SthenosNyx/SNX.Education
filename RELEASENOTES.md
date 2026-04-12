# S-NX Education | Release Notes

## [Version 1.2.0] - 2026-04-12
### Fixed
- **Viewport Displacement:** Resolved the "black gap" issue on the left flank by decoupling the Fixed Sidebar from the transformed Main Content wrapper.
- **Push Logic Calibration:** Synchronized the Top Navigation bar with the content displacement, ensuring the "Back to Catalog" link shifts correctly without layout breakage.

## [Version 1.1.0] - 2026-04-11
### Added
- **Dynamic Push Effect:** Implemented a translation-based navigation system for mobile viewports to prevent UI overlap.
- **State Management:** Added JavaScript triggers to toggle the 'sidebar-open' class on the body element for global layout control.

## [Version 1.0.0] - 2026-04-08
### Changed
- **Thematic Consistency:** Defined missing CSS variables for sidebar backgrounds to ensure opacity across Dark and Light modes.
- **Architectural Cleanup:** Removed redundant animations that interfered with the Montserrat typography rendering and initial page load speed.
