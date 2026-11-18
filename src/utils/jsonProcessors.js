// Pure text-in, text-out functions behind each tool. Each throws an Error with a short
// message on bad input; the page shows that message in its toolbar.

// #region Config
const UNESCAPE_MAP = { '"': '"', '\\': '\\', '/': '/', b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' }
// #endregion

// #region Tools
export function formatJSON(input) {
  return JSON.stringify(parseOrThrow(input), null, 2)
}

export function minifyJSON(input) {
  return JSON.stringify(parseOrThrow(input))
}

// JSON document → one JSON string literal, ready to paste into another JSON or code
export function stringifyJSON(input) {
  return JSON.stringify(JSON.stringify(parseOrThrow(input)))
}

// JSON string literal (possibly stringified several times) → formatted JSON document
export function parseJSON(input) {
  let value = parseOrThrow(input)
  while (typeof value === 'string') {
    try {
      value = JSON.parse(value)
    } catch {
      break
    }
  }
  return JSON.stringify(value, null, 2)
}

export function escapeJSON(input) {
  return input
    .replace(/\\/g, '\\\\') // must run first
    .replace(/"/g, '\\"')
    .replace(/\//g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/\f/g, '\\f')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}

// One pass, so an escaped backslash followed by "n" stays a backslash and an "n"
export function unescapeJSON(input) {
  return input.replace(/\\(u[0-9a-fA-F]{4}|["\\/bfnrt])/g, (match, sequence) => {
    if (sequence[0] === 'u') return String.fromCharCode(parseInt(sequence.slice(1), 16))
    return UNESCAPE_MAP[sequence]
  })
}

export function decodeURL(input) {
  try {
    return decodeURIComponent(input)
  } catch (error) {
    throw new Error('Invalid URL encoding: ' + error.message)
  }
}

export function jsObjectToJSON(input) {
  const trimmedInput = input.trim()
  if (!trimmedInput) throw new Error('Input is empty')

  try {
    // Parentheses make `{ a: 1 }` an object literal instead of a code block
    const jsObject = new Function('return (' + trimmedInput + ')')()
    return JSON.stringify(jsObject, null, 2)
  } catch (error) {
    throw new Error('Invalid JavaScript object: ' + error.message)
  }
}

export function compareJSON(jsonA, jsonB) {
  const keysA = getAllKeys(parseOrThrow(jsonA, 'A'))
  const keysB = getAllKeys(parseOrThrow(jsonB, 'B'))
  const setA = new Set(keysA)
  const setB = new Set(keysB)

  const missingFromFirst = keysB.filter((key) => !setA.has(key))
  const missingFromSecond = keysA.filter((key) => !setB.has(key))

  return {
    missingFromFirst,
    missingFromSecond,
    identical: missingFromFirst.length === 0 && missingFromSecond.length === 0
  }
}
// #endregion

// #region Helpers
function parseOrThrow(input, name = '') {
  try {
    return JSON.parse(input)
  } catch (error) {
    throw new Error(`Invalid JSON${name ? ' in ' + name : ''}: ${error.message}`)
  }
}

function getAllKeys(value, prefix = '') {
  if (value === null || typeof value !== 'object') return []

  const keys = []
  const entries = Array.isArray(value)
    ? value.map((item, index) => [`${prefix}[${index}]`, item])
    : Object.keys(value).map((key) => [prefix ? `${prefix}.${key}` : key, value[key]])

  for (const [path, child] of entries) {
    keys.push(path)
    keys.push(...getAllKeys(child, path))
  }
  return keys
}
// #endregion
