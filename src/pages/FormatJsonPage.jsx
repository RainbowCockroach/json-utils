import { useState, useEffect } from 'react'
import { formatJSON } from '../utils/jsonProcessors'
import PipeButtons from '../components/PipeButtons'

function FormatJsonPage() {
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
      setError('Please enter some JSON to format')
      return
    }

    try {
      const result = formatJSON(input)
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
      <h2>Format JSON</h2>
      <p>Pretty-print JSON with proper indentation and formatting.</p>

      <div className="input-section">
        <label htmlFor="input">JSON Input:</label>
        <textarea
          id="input"
          className="json-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON to format, e.g.: {"name":"John","age":30}'
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button className="process-button" onClick={handleProcess}>
        Format JSON
      </button>

      <div className="output-section">
        <label htmlFor="output">Formatted Output:</label>
        <textarea
          id="output"
          className="json-textarea"
          value={output}
          readOnly
          placeholder="Formatted JSON will appear here..."
        />
      </div>

      {output && (
        <PipeButtons
          output={output}
          currentPath="/format-json"
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}

export default FormatJsonPage