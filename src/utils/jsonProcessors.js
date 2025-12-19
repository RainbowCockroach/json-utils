// JSON Processing Functions

export function stringifyJSON(input) {
  try {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed, null, 2)
  } catch (error) {
    throw new Error('Invalid JSON input: ' + error.message)
  }
}

export function parseJSON(input) {
  try {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed, null, 2)
  } catch (error) {
    throw new Error('Invalid JSON input: ' + error.message)
  }
}

export function escapeJSON(input) {
  return input
    .replace(/\\/g, '\\\\')     // Escape backslashes (must be first)
    .replace(/"/g, '\\"')       // Escape quotes
    .replace(/\//g, '\\/')      // Escape forward slashes
    .replace(/[\b]/g, '\\b')    // Escape backspace (literal \b character)
    .replace(/\f/g, '\\f')      // Escape form feed
    .replace(/\n/g, '\\n')      // Escape newlines
    .replace(/\r/g, '\\r')      // Escape carriage returns
    .replace(/\t/g, '\\t')      // Escape tabs
}

export function unescapeJSON(input) {
  return input
    .replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16))
    })                        // Unescape unicode sequences
    .replace(/\\b/g, '\b')    // Unescape backspace
    .replace(/\\f/g, '\f')    // Unescape form feed
    .replace(/\\n/g, '\n')    // Unescape newlines
    .replace(/\\r/g, '\r')    // Unescape carriage returns
    .replace(/\\t/g, '\t')    // Unescape tabs
    .replace(/\\"/g, '"')     // Unescape quotes
    .replace(/\\\//g, '/')    // Unescape forward slashes
    .replace(/\\\\/g, '\\')   // Unescape backslashes (must be last)
}

export function compareJSON(json1, json2) {
  try {
    const obj1 = JSON.parse(json1)
    const obj2 = JSON.parse(json2)

    const keys1 = getAllKeys(obj1)
    const keys2 = getAllKeys(obj2)

    const missingFromObj1 = keys2.filter(key => !keys1.includes(key))
    const missingFromObj2 = keys1.filter(key => !keys2.includes(key))

    return {
      missingFromFirst: missingFromObj1,
      missingFromSecond: missingFromObj2,
      identical: missingFromObj1.length === 0 && missingFromObj2.length === 0
    }
  } catch (error) {
    throw new Error('Invalid JSON input: ' + error.message)
  }
}

export function decodeURL(input) {
  try {
    return decodeURIComponent(input)
  } catch (error) {
    throw new Error('Invalid URL encoding: ' + error.message)
  }
}

export function formatJSON(input) {
  try {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed, null, 2)
  } catch (error) {
    throw new Error('Invalid JSON input: ' + error.message)
  }
}

function getAllKeys(obj, prefix = '') {
  let keys = []

  if (obj === null || typeof obj !== 'object') {
    return []
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      const newPrefix = prefix ? `${prefix}[${index}]` : `[${index}]`
      keys.push(newPrefix)
      keys = keys.concat(getAllKeys(item, newPrefix))
    })
  } else {
    Object.keys(obj).forEach(key => {
      const newPrefix = prefix ? `${prefix}.${key}` : key
      keys.push(newPrefix)
      keys = keys.concat(getAllKeys(obj[key], newPrefix))
    })
  }

  return keys
}