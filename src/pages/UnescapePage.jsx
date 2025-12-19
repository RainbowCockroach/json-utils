import { useState, useEffect } from 'react'
import { unescapeJSON } from '../utils/jsonProcessors'
import PipeButtons from '../components/PipeButtons'

function UnescapePage() {
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
      setError('Please enter some escaped text to unescape')
      return
    }

    try {
      const result = unescapeJSON(input)
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
      <h2>Unescape JSON</h2>
      <p>Unescape a JSON string by converting escape sequences back to their original characters.</p>

      <div className="input-section">
        <label htmlFor="input">Escaped Text Input:</label>
        <textarea
          id="input"
          className="json-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter escaped text, e.g.:\n{\\"name\\": \\"John\\", \\"message\\": \\"Hello\\\\nWorld\\"}`}
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button className="process-button" onClick={handleProcess}>
        Unescape Text
      </button>

      <div className="output-section">
        <label htmlFor="output">Unescaped Output:</label>
        <textarea
          id="output"
          className="json-textarea"
          value={output}
          readOnly
          placeholder="Unescaped text will appear here..."
        />
      </div>

      {output && (
        <PipeButtons
          output={output}
          currentPath="/unescape"
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}

export default UnescapePage