function Footer() {
  return (
    <footer className="page-footer green lighten-2">
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} gang of thieves
        </div>
      </div>
    </footer>
  );
}

export { Footer };
