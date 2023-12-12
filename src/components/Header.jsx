import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="green darken-2">
      <div className="nav-wrapper">
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <Link
            to="https://github.com/AndreyTorkhov/project-s3"
            target="_blank"
            rel="noreferrer"
          >
            Repo
          </Link>
        </ul>
      </div>
    </nav>
  );
}
export { Header };
