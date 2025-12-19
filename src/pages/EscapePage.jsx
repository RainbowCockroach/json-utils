import { useState, useEffect } from 'react'
import { escapeJSON } from '../utils/jsonProcessors'
import PipeButtons from '../components/PipeButtons'

function EscapePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if there's piped input from another function
    const pipeInput = sessionStorage.getItem('pipeInput')
    if (pipeInput) {
      setInput(pipeInput)
      sessionStorage.removeItem('pipeInput')
    }
  }, [])

  const handleProcess = () => {
    setError('')
    setOutput('')

    if (!input.trim()) {
      setError('Please enter some text to escape')
      return
    }

    try {
      const result = escapeJSON(input)
      setOutput(result)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output)
    }
  }

  return (
    <div className="function-page">
      <h2>Escape JSON</h2>
      <p>Escape a JSON string for embedding in code or other strings.</p>

      <div className="input-section">
        <label htmlFor="input">Text Input:</label>
        <textarea
          id="input"
          className="json-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter text to escape, e.g.:\n{"name": "John", "message": "Hello\\nWorld"}`}
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button className="process-button" onClick={handleProcess}>
        Escape Text
      </button>

      <div className="output-section">
        <label htmlFor="output">Escaped Output:</label>
        <textarea
          id="output"
          className="json-textarea"
          value={output}
          readOnly
          placeholder="Escaped text will appear here..."
        />
      </div>

      {output && (
        <PipeButtons
          output={output}
          currentPath="/escape"
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}

export default EscapePage