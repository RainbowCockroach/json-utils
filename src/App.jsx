import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import StringifyPage from './pages/StringifyPage'
import ParsePage from './pages/ParsePage'
import EscapePage from './pages/EscapePage'
import UnescapePage from './pages/UnescapePage'
import ComparePage from './pages/ComparePage'
import DecodeUrlPage from './pages/DecodeUrlPage'
import FormatJsonPage from './pages/FormatJsonPage'
import JsObjectToJsonPage from './pages/JsObjectToJsonPage'

function App() {
  return (
    <Router basename="/json-utils">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stringify" element={<StringifyPage />} />
          <Route path="/parse" element={<ParsePage />} />
          <Route path="/escape" element={<EscapePage />} />
          <Route path="/unescape" element={<UnescapePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/decode-url" element={<DecodeUrlPage />} />
          <Route path="/format-json" element={<FormatJsonPage />} />
          <Route path="/js-to-json" element={<JsObjectToJsonPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App