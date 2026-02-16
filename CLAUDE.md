# CLAUDE.md — Atmosync

This file provides context for AI assistants working on the Atmosync repository.

## Project Overview

Atmosync is a weather/atmospheric data synchronization application. The repository is currently in its initial setup phase.

**Repository:** `yaberah/Atmosync`

## Repository Status

This project is in early development. The codebase has not yet been populated with application code. This document should be updated as the project grows to reflect the actual structure, tooling, and conventions in use.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yaberah/Atmosync.git
   cd Atmosync
   ```
2. Check the project's package manager and install dependencies once a `package.json`, `requirements.txt`, or equivalent is added.
3. Follow any setup instructions added to the project README.

## Project Structure

> **Note:** Update this section as the project evolves.

```
Atmosync/
├── CLAUDE.md          # AI assistant context (this file)
└── (project files to be added)
```

## Development Workflow

### Branching

- The default branch is used for stable, reviewed code.
- Feature branches should follow the pattern: `feature/<description>` or `<username>/<description>`.
- Claude-generated branches follow the pattern: `claude/<description>-<id>`.

### Commits

- Write clear, concise commit messages that describe the "why" over the "what."
- Keep commits focused — one logical change per commit.

### Pull Requests

- PRs should include a summary of changes and a test plan.
- Link related issues when applicable.

## Code Conventions

> **Note:** Update this section once the tech stack and linting/formatting tools are established.

- Follow the language-specific style guide for whichever stack is adopted.
- Prefer consistency with existing code over personal preferences.
- Keep functions small and focused on a single responsibility.
- Write meaningful variable and function names — avoid abbreviations unless widely understood.

## Testing

> **Note:** Update this section once a test framework is chosen.

- Tests should be added for new features and bug fixes.
- Run the full test suite before submitting a PR.

## Common Tasks

| Task | Command |
|------|---------|
| Install dependencies | *(to be defined)* |
| Run development server | *(to be defined)* |
| Run tests | *(to be defined)* |
| Lint / format code | *(to be defined)* |
| Build for production | *(to be defined)* |

## AI Assistant Guidelines

When working in this repository:

1. **Read before writing.** Always read a file before modifying it. Understand the surrounding context.
2. **Stay focused.** Only make changes that are directly requested or clearly necessary. Avoid adding features, refactoring, or "improving" code beyond the task at hand.
3. **Keep it simple.** Prefer the simplest solution that solves the problem. Avoid over-engineering, premature abstractions, and speculative features.
4. **Match existing style.** Follow the patterns, naming conventions, and formatting already present in the codebase.
5. **Don't break things.** Run tests and linters after making changes. If a test fails, fix it before moving on.
6. **Security matters.** Do not introduce vulnerabilities (injection, XSS, hardcoded secrets, etc.). Validate inputs at system boundaries.
7. **Update this file.** When the project structure, tooling, or conventions change significantly, update CLAUDE.md to keep it accurate.
