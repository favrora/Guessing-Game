# Contributor Guide

## Scope

Keep game rules, socket contracts, and Redux state backward-compatible. Prefer small, tested changes over broad rewrites.

## Required Checks

Run `npm run check` before opening a pull request.

## Project Rules

- Keep shared game state in `src/store` and component-local UI state in hooks.
- Validate socket payloads on the server even when the client already validates them.
- Remove every socket listener with the exact handler that registered it.
- Clear timers during cleanup and prevent overlapping rounds.
- Preserve keyboard access, labels, and responsive behavior.
- Never commit secrets or generated `dist` output.
