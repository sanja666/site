# NebulaChat Studio

NebulaChat Studio is a fully client-side prototype that reimagines a human-guided conversational
workspace similar to modern chat copilots. Instead of AI-generated answers, the "Nebula Navigator"
assistant responds with curated, human-authored insights, guided workflows, and actionable
playbooks.

## Features

- **Immersive shell:** desktop-inspired layout with session sidebar, conversational canvas, and
  intelligence panels for metrics, knowledge, and assistant context.
- **Session management:** create, pin, search, and reset conversations, with persistent state stored
  locally in the browser.
- **Conversational flow:** rich message bubbles, quick prompt dock, and composer actions for
  attachments, snippets, and reactions.
- **Workspace intelligence:** session metrics, event timeline, focus modes, and knowledge vault with
  curated datasets.
- **Modals & utilities:** responsive dialogs for settings, playbooks, knowledge browsing, and
  changelog history plus export, theme, and density controls.
- **Responsive design:** adaptive layout for wide screens down to mobile breakpoints with compact
  density mode.

## Getting started

1. Serve the project locally, for example:

   ```bash
   npx serve
   ```

2. Visit the URL in your browser (typically `http://localhost:3000`).

The workspace stores preferences and sample conversations in `localStorage`. Use your browser's
storage tools or the "Reset" button inside a session to clear data.
