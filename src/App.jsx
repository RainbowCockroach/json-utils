// JSON Utils: one full-screen page per tool, with a tab bar on top to switch tools.
// Every single-input tool shares ToolPage; Compare has two inputs and its own page.
// Run with `npm run dev`, open http://localhost:5173/json-utils/

// #region Setup
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import ToolPage from './components/ToolPage'
import ComparePage from './pages/ComparePage'
import {
  formatJSON,
  minifyJSON,
  stringifyJSON,
  parseJSON,
  escapeJSON,
  unescapeJSON,
  decodeURL,
  jsObjectToJSON
} from './utils/jsonProcessors'
// #endregion

// #region Config
const TOOLS = [
  { path: '/format-json', label: 'Format', process: formatJSON },
  { path: '/minify-json', label: 'Minify', process: minifyJSON, defaultView: 'text' },
  { path: '/stringify', label: 'Stringify', process: stringifyJSON },
  { path: '/parse', label: 'Parse', process: parseJSON },
  { path: '/escape', label: 'Escape', process: escapeJSON },
  { path: '/unescape', label: 'Unescape', process: unescapeJSON },
  { path: '/decode-url', label: 'Decode URL', process: decodeURL },
  { path: '/js-to-json', label: 'JS → JSON', process: jsObjectToJSON }
]

const NAV_LINKS = [...TOOLS, { path: '/compare', label: 'Compare' }]
// #endregion

// #region App
function App() {
  return (
    <Router basename="/json-utils">
      <div className="app">
        <nav className="tabs">
          {NAV_LINKS.map((tool) => (
            <NavLink key={tool.path} to={tool.path} className="tab">
              {tool.label}
            </NavLink>
          ))}
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/format-json" replace />} />
          {TOOLS.map((tool) => (
            // key forces a fresh page per tool, so piped input is read on every switch
            <Route key={tool.path} path={tool.path} element={<ToolPage key={tool.path} {...tool} />} />
          ))}
          <Route path="/compare" element={<ComparePage />} />
          <Route path="*" element={<Navigate to="/format-json" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
// #endregion
