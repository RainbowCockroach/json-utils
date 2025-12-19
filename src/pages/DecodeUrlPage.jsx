import { useState, useEffect } from 'react'
import { decodeURL } from '../utils/jsonProcessors'
import PipeButtons from '../components/PipeButtons'

function DecodeUrlPage() {
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
      setError('Please enter a URL-encoded string to decode')
      return
    }

    try {
      const result = decodeURL(input)
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
      <h2>Decode URL</h2>
      <p>Decode URL-encoded strings back to their original form.</p>

      <div className="input-section">
        <label htmlFor="input">URL-Encoded Input:</label>
        <textarea
          id="input"
          className="json-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter URL-encoded string, e.g.: Hello%20World%21"
        />
        {error && <div className="error-message">{error}</div>}
      </div>

      <button className="process-button" onClick={handleProcess}>
        Decode URL
      </button>

      <div className="output-section">
        <label htmlFor="output">Decoded Output:</label>
        <textarea
          id="output"
          className="json-textarea"
          value={output}
          readOnly
          placeholder="Decoded text will appear here..."
        />
      </div>

      {output && (
        <PipeButtons
          output={output}
          currentPath="/decode-url"
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}

export default DecodeUrlPage