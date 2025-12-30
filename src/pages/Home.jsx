import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="main-menu">
        <Link to="/stringify" className="menu-button">
          <div>
            <h3>Stringify JSON</h3>
          </div>
        </Link>

        <Link to="/parse" className="menu-button">
          <div>
            <h3>Parse JSON</h3>
          </div>
        </Link>

        <Link to="/escape" className="menu-button">
          <div>
            <h3>Escape JSON</h3>
          </div>
        </Link>

        <Link to="/unescape" className="menu-button">
          <div>
            <h3>Unescape JSON</h3>
          </div>
        </Link>

        <Link to="/compare" className="menu-button">
          <div>
            <h3>Compare JSON</h3>
          </div>
        </Link>

        <Link to="/decode-url" className="menu-button">
          <div>
            <h3>Decode URL</h3>
          </div>
        </Link>

        <Link to="/format-json" className="menu-button">
          <div>
            <h3>Format JSON</h3>
          </div>
        </Link>

        <Link to="/js-to-json" className="menu-button">
          <div>
            <h3>JS Object to JSON</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
