// One full-screen page for any single-input tool: input on the left, output on the right.
// Output updates as you type. When the output is a JSON object or array it shows as a
// collapsible tree, with a toggle back to plain text.

// #region Setup
import { useState, useMemo, useEffect } from 'react'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'
import PipeButtons from './PipeButtons'
// #endregion

// #region Page
function ToolPage({ path, label, process, defaultView = 'tree' }) {
  const [input, setInput] = useState(() => sessionStorage.getItem('pipeInput') ?? '')
  const [view, setView] = useState(defaultView)
  const [collapseDepth, setCollapseDepth] = useState(false)
  const [treeResetCount, setTreeResetCount] = useState(0)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    sessionStorage.removeItem('pipeInput')
    document.title = `${label} · JSON Utils`
  }, [label])

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' }
    try {
      return { output: process(input), error: '' }
    } catch (processError) {
      return { output: '', error: processError.message }
    }
  }, [input, process])

  const tree = useMemo(() => {
    try {
      const parsed = JSON.parse(output)
      return parsed !== null && typeof parsed === 'object' ? parsed : null
    } catch {
      return null
    }
  }, [output])

  const showTree = tree && view === 'tree'

  // Remount the tree so the depth applies again after nodes were toggled by hand
  const resetTree = (depth) => {
    setCollapseDepth(depth)
    setTreeResetCount((count) => count + 1)
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1000)
  }

  return (
    <div className="page">
      <div className="toolbar">
        <span className={error ? 'status error' : 'status'}>{error}</span>
        {tree && (
          <>
            <button className={view === 'tree' ? 'active' : ''} onClick={() => setView('tree')}>Tree</button>
            <button className={view === 'text' ? 'active' : ''} onClick={() => setView('text')}>Text</button>
          </>
        )}
        {showTree && (
          <>
            <button title="Expand all" onClick={() => resetTree(false)}>Expand</button>
            <button title="Show top level only" onClick={() => resetTree(1)}>Collapse</button>
          </>
        )}
        <button onClick={copyOutput} disabled={!output}>{isCopied ? 'Copied' : 'Copy'}</button>
        <PipeButtons output={output} currentPath={path} />
      </div>

      <div className="panes">
        <textarea
          className="pane"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Input"
          spellCheck={false}
          autoFocus
        />
        {showTree ? (
          <div className="pane tree">
            <JsonView
              key={treeResetCount}
              src={tree}
              collapsed={collapseDepth}
              collapseObjectsAfterLength={collapseDepth === false ? 100000 : 99}
              collapseStringsAfterLength={200}
              displaySize="collapsed"
              matchesURL={false}
            />
          </div>
        ) : (
          <textarea className="pane" value={output} readOnly placeholder="Output" spellCheck={false} />
        )}
      </div>
    </div>
  )
}

export default ToolPage
// #endregion
