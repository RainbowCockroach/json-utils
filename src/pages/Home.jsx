import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <p>A simple tool for common JSON processing operations. Click on any function below to get started.</p>

      <div className="main-menu">
        <Link to="/stringify" className="menu-button">
          <div>
            <h3>Stringify JSON</h3>
            <p>Convert JSON object to formatted JSON string</p>
          </div>
        </Link>

        <Link to="/parse" className="menu-button">
          <div>
            <h3>Parse JSON</h3>
            <p>Parse and format JSON string</p>
          </div>
        </Link>

        <Link to="/escape" className="menu-button">
          <div>
            <h3>Escape JSON</h3>
            <p>Escape JSON string for embedding</p>
          </div>
        </Link>

        <Link to="/unescape" className="menu-button">
          <div>
            <h3>Unescape JSON</h3>
            <p>Unescape JSON string</p>
          </div>
        </Link>

        <Link to="/compare" className="menu-button">
          <div>
            <h3>Compare JSON</h3>
            <p>Compare two JSON objects and find differences</p>
          </div>
        </Link>

        <Link to="/decode-url" className="menu-button">
          <div>
            <h3>Decode URL</h3>
            <p>Decode URL-encoded strings back to their original form</p>
          </div>
        </Link>

        <Link to="/format-json" className="menu-button">
          <div>
            <h3>Format JSON</h3>
            <p>Pretty-print JSON with proper indentation</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Home