import { useState, useEffect } from 'react'
import { compareJSON } from '../utils/jsonProcessors'
import PipeButtons from '../components/PipeButtons'

function ComparePage() {
  const [input1, setInput1] = useState('')
  const [input2, setInput2] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if there's piped input from another function
    const pipeInput = sessionStorage.getItem('pipeInput')
    if (pipeInput) {
      setInput1(pipeInput)
      sessionStorage.removeItem('pipeInput')
    }
  }, [])

  const handleProcess = () => {
    setError('')
    setOutput('')

    if (!input1.trim()) {
      setError('Please enter JSON in the first input')
      return
    }

    if (!input2.trim()) {
      setError('Please enter JSON in the second input')
      return
    }

    try {
      const result = compareJSON(input1, input2)

      let outputText = ''

      if (result.identical) {
        outputText = 'The JSON objects are identical.'
      } else {
        outputText = 'JSON Comparison Results:\n\n'

        if (result.missingFromFirst.length > 0) {
          outputText += `Fields missing from Object A:\n${result.missingFromFirst.map(field => `- ${field}`).join('\n')}\n\n`
        }

        if (result.missingFromSecond.length > 0) {
          outputText += `Fields missing from Object B:\n${result.missingFromSecond.map(field => `- ${field}`).join('\n')}`
        }

        if (result.missingFromFirst.length === 0 && result.missingFromSecond.length === 0) {
          outputText += 'Both objects have the same structure.'
        }
      }

      setOutput(outputText.trim())
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
      <h2>Compare JSON</h2>
      <p>Compare two JSON objects and see which fields are missing from each.</p>

      <div className="compare-inputs">
        <div className="input-section">
          <label htmlFor="input1">JSON Object A:</label>
          <textarea
            id="input1"
            className="json-textarea"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            placeholder='Enter first JSON object, e.g.: {"name": "John", "age": 30}'
          />
        </div>

        <div className="input-section">
          <label htmlFor="input2">JSON Object B:</label>
          <textarea
            id="input2"
            className="json-textarea"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder='Enter second JSON object, e.g.: {"name": "Jane", "city": "NYC"}'
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button className="process-button" onClick={handleProcess}>
        Compare JSON Objects
      </button>

      <div className="output-section">
        <label htmlFor="output">Comparison Result:</label>
        <textarea
          id="output"
          className="json-textarea"
          value={output}
          readOnly
          placeholder="Comparison results will appear here..."
        />
      </div>

      {output && (
        <PipeButtons
          output={output}
          currentPath="/compare"
          onCopy={handleCopy}
        />
      )}
    </div>
  )
}

export default ComparePage