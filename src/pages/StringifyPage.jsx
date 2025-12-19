import { useState, useEffect } from 'react'
import { stringifyJSON } from '../utils/jsonProcessors'
import PipeButtons from '../components/PipeButtons'

function StringifyPage() {
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
      setError('Please enter some JSON to stringify')
      return
    }

    try {
      const result = stringifyJSON(input)
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
      <h2>Stringify JSON</h2>
      <p>Convert a JSON object to a formatted JSON string.</p>

      <div className="input-section">
        <label htmlFor="input">JSON Input:</label>
        <textarea
          id="input"
          className="json-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON object, e.g.: {"name": "John", "age": 30}'
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button className="process-button" onClick={handleProcess}>
        Stringify JSON
      </button>

      <div className="output-section">
        <label htmlFor="output">Stringified Output:</label>
        <textarea
          id="output"
          className="json-textarea"
          value={output}
          readOnly
          placeholder="Stringified JSON will appear here..."
        />
      </div>

      {output && (
        <PipeButtons
          output={output}
          currentPath="/stringify"
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}

export default StringifyPage