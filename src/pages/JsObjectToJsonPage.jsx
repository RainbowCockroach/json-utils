import { useState, useEffect } from 'react'
import { jsObjectToJSON } from '../utils/jsonProcessors'
import PipeButtons from '../components/PipeButtons'

function JsObjectToJsonPage() {
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
      setError('Please enter a JavaScript object')
      return
    }

    try {
      const result = jsObjectToJSON(input)
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
      <h2>JS Object to JSON</h2>
      <p>Convert a JavaScript object literal to valid JSON format.</p>

      <div className="input-section">
        <label htmlFor="input">JavaScript Object Input:</label>
        <textarea
          id="input"
          className="json-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JS object, e.g.: {name: 'John', age: 30}"
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button className="process-button" onClick={handleProcess}>
        Convert to JSON
      </button>

      <div className="output-section">
        <label htmlFor="output">JSON Output:</label>
        <textarea
          id="output"
          className="json-textarea"
          value={output}
          readOnly
          placeholder="Valid JSON will appear here..."
        />
      </div>

      {output && (
        <PipeButtons
          output={output}
          currentPath="/js-to-json"
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}

export default JsObjectToJsonPage
