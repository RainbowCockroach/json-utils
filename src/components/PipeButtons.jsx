import { useNavigate } from 'react-router-dom'

const FUNCTIONS = [
  { path: '/stringify', label: 'Stringify' },
  { path: '/parse', label: 'Parse' },
  { path: '/escape', label: 'Escape' },
  { path: '/unescape', label: 'Unescape' },
  { path: '/compare', label: 'Compare' },
  { path: '/decode-url', label: 'Decode URL' },
  { path: '/format-json', label: 'Format JSON' }
]

function PipeButtons({ output, currentPath, onCopy }) {
  const navigate = useNavigate()

  const handlePipe = (targetPath) => {
    // Store the output in sessionStorage to pass to the next page
    sessionStorage.setItem('pipeInput', output)
    navigate(targetPath)
  }

  const availableFunctions = FUNCTIONS.filter(func => func.path !== currentPath)

  return (
    <div className="actions">
      <button className="copy-button" onClick={onCopy}>
        Copy to Clipboard
      </button>
      <span>Send to:</span>
      {availableFunctions.map(func => (
        <button
          key={func.path}
          className="pipe-button"
          onClick={() => handlePipe(func.path)}
        >
          {func.label}
        </button>
      ))}
    </div>
  )
}

export default PipeButtons