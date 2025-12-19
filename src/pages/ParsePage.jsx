import { useState, useEffect } from 'react'
import { parseJSON } from '../utils/jsonProcessors'
import PipeButtons from '../components/PipeButtons'

function ParsePage() {
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
      setError('Please enter some JSON to parse')
      return
    }

    try {
      const result = parseJSON(input)
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
      <h2>Parse JSON</h2>
      <p>Parse a JSON string and format it nicely.</p>

      <div className="input-section">
        <label htmlFor="input">JSON String Input:</label>
        <textarea
          id="input"
          className="json-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON string, e.g.: "{\\"name\\": \\"John\\", \\"age\\": 30}"'
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button className="process-button" onClick={handleProcess}>
        Parse JSON
      </button>

      <div className="output-section">
        <label htmlFor="output">Parsed Output:</label>
        <textarea
          id="output"
          className="json-textarea"
          value={output}
          readOnly
          placeholder="Parsed and formatted JSON will appear here..."
        />
      </div>

      {output && (
        <PipeButtons
          output={output}
          currentPath="/parse"
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}

export default ParsePage