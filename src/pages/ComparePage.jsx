// Compare two JSON documents and list the field paths each one is missing.
// Three panes side by side: A, B, and the result. Updates as you type.

// #region Setup
import { useState, useMemo, useEffect } from 'react'
import { compareJSON } from '../utils/jsonProcessors'
import PipeButtons from '../components/PipeButtons'
// #endregion

// #region Page
function ComparePage() {
  const [inputA, setInputA] = useState(() => sessionStorage.getItem('pipeInput') ?? '')
  const [inputB, setInputB] = useState('')

  useEffect(() => {
    sessionStorage.removeItem('pipeInput')
    document.title = 'Compare · JSON Utils'
  }, [])

  const { output, error } = useMemo(() => {
    if (!inputA.trim() || !inputB.trim()) return { output: '', error: '' }

    let result
    try {
      result = compareJSON(inputA, inputB)
    } catch (compareError) {
      return { output: '', error: compareError.message }
    }
    if (result.identical) return { output: 'Same fields in A and B.', error: '' }

    const lines = []
    if (result.missingFromFirst.length > 0) {
      lines.push(`Missing from A (${result.missingFromFirst.length}):`)
      for (const field of result.missingFromFirst) lines.push(`  ${field}`)
      lines.push('')
    }
    if (result.missingFromSecond.length > 0) {
      lines.push(`Missing from B (${result.missingFromSecond.length}):`)
      for (const field of result.missingFromSecond) lines.push(`  ${field}`)
    }
    return { output: lines.join('\n').trim(), error: '' }
  }, [inputA, inputB])

  return (
    <div className="page">
      <div className="toolbar">
        <span className={error ? 'status error' : 'status'}>{error}</span>
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output}>Copy</button>
        <PipeButtons output={output} currentPath="/compare" />
      </div>

      <div className="panes three">
        <textarea
          className="pane"
          value={inputA}
          onChange={(event) => setInputA(event.target.value)}
          placeholder="A"
          spellCheck={false}
          autoFocus
        />
        <textarea
          className="pane"
          value={inputB}
          onChange={(event) => setInputB(event.target.value)}
          placeholder="B"
          spellCheck={false}
        />
        <textarea className="pane" value={output} readOnly placeholder="Result" spellCheck={false} />
      </div>
    </div>
  )
}

export default ComparePage
// #endregion
