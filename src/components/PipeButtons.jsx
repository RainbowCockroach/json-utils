// "Send to" dropdown: hands the current output to another tool through sessionStorage.

// #region Setup
import { useNavigate } from 'react-router-dom'
// #endregion

// #region Config
const TARGETS = [
  { path: '/format-json', label: 'Format' },
  { path: '/minify-json', label: 'Minify' },
  { path: '/stringify', label: 'Stringify' },
  { path: '/parse', label: 'Parse' },
  { path: '/escape', label: 'Escape' },
  { path: '/unescape', label: 'Unescape' },
  { path: '/decode-url', label: 'Decode URL' },
  { path: '/js-to-json', label: 'JS → JSON' },
  { path: '/compare', label: 'Compare' }
]
// #endregion

// #region Dropdown
function PipeButtons({ output, currentPath }) {
  const navigate = useNavigate()

  const sendTo = (targetPath) => {
    sessionStorage.setItem('pipeInput', output)
    navigate(targetPath)
  }

  return (
    <select value="" disabled={!output} onChange={(event) => sendTo(event.target.value)}>
      <option value="" disabled>Send to…</option>
      {TARGETS.filter((target) => target.path !== currentPath).map((target) => (
        <option key={target.path} value={target.path}>{target.label}</option>
      ))}
    </select>
  )
}

export default PipeButtons
// #endregion
