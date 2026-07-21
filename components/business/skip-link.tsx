'use client'

export default function SkipLink() {
  const focusMainContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const mainContent = document.getElementById('main-content');
    mainContent?.focus();
    window.history.replaceState(null, '', '#main-content');
  };

  return (
    <a
      href="#main-content"
      onClick={focusMainContent}
      className="fixed left-4 top-4 z-[100] -translate-y-24 bg-foreground px-4 py-3 text-sm font-semibold text-background transition-transform focus:translate-y-0"
    >
      Skip to main content
    </a>
  );
}
