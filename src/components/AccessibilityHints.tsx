// Accessibility hints component
export const AccessibilityHints = () => (
  <div className="sr-only" aria-live="polite">
    <div>Keyboard navigation: Use arrow keys to navigate between sections</div>
    <div>Press Escape to close mobile menu</div>
    <div>Press Space or Enter to toggle music playback</div>
  </div>
);