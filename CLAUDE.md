# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JSON Utils is a client-side React web application for common JSON processing operations. The app provides 7 core functions (stringify, parse, escape, unescape, compare, decode-url, format-json) with a chaining feature that allows users to pipe output from one function to another. Built with React, Vite, and deployed to GitHub Pages.

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
- **Function Pages**: Each JSON operation has its own route and component
- **Chaining System**: Uses sessionStorage to pass data between functions
- **GitHub Pages Ready**: Includes SPA routing setup and GitHub Actions workflow

### Key Components

**Core Processing Logic**: `src/utils/jsonProcessors.js`
- All JSON processing functions in one module
- Handles complete JSON escape sequence specification including HTML content
- Functions: `stringifyJSON()`, `parseJSON()`, `escapeJSON()`, `unescapeJSON()`, `compareJSON()`, `decodeURL()`, `formatJSON()`

**Chaining System**: `src/components/PipeButtons.jsx`
- Implements function-to-function data transfer
- Uses `sessionStorage.setItem('pipeInput', output)` to pass data
- Each page checks for piped input on mount via `sessionStorage.getItem('pipeInput')`

**Routing**: `src/App.jsx`
- React Router with basename for GitHub Pages deployment
- 7 function routes: `/stringify`, `/parse`, `/escape`, `/unescape`, `/compare`, `/decode-url`, `/format-json`

### Page Pattern
Each function page follows the same structure:
1. Input textarea with piped input detection
2. Process button that calls corresponding util function
3. Output textarea with results
4. Error handling with inline error messages
5. PipeButtons component for chaining to other functions

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
- **Error handling**: Uses inline error messages below input textareas
- **JSON processing**: All functions are pure and throw descriptive errors for invalid JSON
- **Styling**: CSS-in-JS is not used; all styles in `src/index.css`