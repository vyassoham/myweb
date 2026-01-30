export default function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-[var(--border-subtle)] mt-auto">
      <div className="container">
        <div className="py-8 text-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Soham Vyas. Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
