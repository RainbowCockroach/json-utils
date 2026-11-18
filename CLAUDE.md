# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JSON Utils is a client-side React web application for common JSON processing operations. The app provides 9 tools (format, minify, stringify, parse, escape, unescape, decode-url, js-to-json, compare) with a chaining feature that allows users to pipe output from one function to another. Built with React, Vite, and deployed to GitHub Pages.

## Development Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:5173/json-utils/
npm run build        # Build for production (outputs to ./dist/)
npm run preview      # Preview production build locally

# Deployment
npm run deploy       # Build and deploy to GitHub Pages (via gh-pages package)
```

## Architecture

### Application Structure
- **Single Page App (SPA)**: React Router with basename `/json-utils` for GitHub Pages
- **Full-screen layout**: tab bar on top, one-line toolbar, input/output panes fill the rest. No home page: `/` redirects to `/format-json`
- **Chaining System**: Uses sessionStorage to pass data between tools
- **GitHub Pages Ready**: Includes SPA routing setup and GitHub Actions workflow

### Key Components

**Core Processing Logic**: `src/utils/jsonProcessors.js`
- Pure text-in, text-out functions; each throws an Error with a short message on bad input
- `stringifyJSON` turns a JSON document into one JSON string literal; `parseJSON` reverses it (unwrapping nested stringification)

**Tool list and routing**: `src/App.jsx`
- `TOOLS` maps each route to its label and processor; adding a single-input tool is one line there plus one in `PipeButtons.jsx`

**Shared tool page**: `src/components/ToolPage.jsx`
- Output updates live as you type; errors show in the toolbar
- Object/array output renders as a collapsible tree (`react18-json-view`) with a Tree/Text toggle

**Compare**: `src/pages/ComparePage.jsx` — three panes (A, B, result)

**Chaining System**: `src/components/PipeButtons.jsx`
- "Send to" dropdown; `sessionStorage.setItem('pipeInput', output)` then navigate
- Pages read `pipeInput` in their state initializer and remove it in an effect (safe under StrictMode)

### GitHub Pages Deployment
- **Base URL Configuration**: `vite.config.js` sets `base: '/json-utils/'`
- **SPA Routing**: Uses the spa-github-pages pattern with 404.html redirection
- **GitHub Actions**: Automated deployment on push to main branch
- **Build Output**: Static files in `./dist/` directory

### Function-Specific Notes

**Escape/Unescape Functions**: Handle complete JSON escape sequences including:
- Standard sequences: `\"`, `\\`, `\n`, `\r`, `\t`
- HTML-friendly: `\/` (forward slashes), `\b`, `\f`
- Unicode: `\uXXXX` sequences

**Compare Function**: Deep comparison that extracts all nested field paths and shows missing fields in each JSON object as a summary list.

**Decode URL Function**: Decodes URL-encoded strings using `decodeURIComponent()`. Converts percent-encoded characters back to their original form (e.g., `%20` → space).

**Format JSON Function**: Pretty-prints JSON with proper indentation. Parses input JSON and formats it with 2-space indentation for readability.

## Important Implementation Details

- **sessionStorage**: Critical for chaining functionality - do not replace with other state management
- **Router basename**: Must match GitHub Pages repository name for correct routing
- **Error handling**: Error message shown in the toolbar
- **JSON processing**: All functions are pure and throw descriptive errors for invalid JSON
- **Styling**: CSS-in-JS is not used; all styles in `src/index.css`