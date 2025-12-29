# Design - Slash Commands Fix and Activation

## Architecture Overview
The slash command system is distributed across four main layers:

### 1. UI Layer (`CommandAutocomplete.tsx`)
- **Responsibility**: Listens for the `/` trigger, fetches command metadata, and filters visibility based on `isCommandAvailable`.
- **Logic**: Uses a context-aware filtering system that checks the current message count and session state from the store.

### 2. Execution Layer (`ChatInput.tsx`)
- **Responsibility**: Intercepts command selection. 
- **Handling**: 
    - **Built-in Commands**: Executed immediately via local handlers (`handleRevertCommand`, etc.).
    - **Custom Commands**: Inserted into the textarea for manual sending.

### 3. State Layer (`useSessionStore.ts`)
- **Responsibility**: Manages command history and provides helper methods for session-level operations.
- **Methods**: `executeCommand`, `canExecuteCommand`, `getLastMessageId`.

### 4. API Layer (`opencodeApi.ts` & `opencodeClient.ts`)
- **Responsibility**: Performs the actual network calls.
- **`opencodeClient`**: Used for SDK-supported actions like `revert` and `abort`.
- **`opencodeApi`**: A custom HTTP client for server-only endpoints like `edit`, `clear`, and `compact`.

## Key Technical Decisions

### Context-Aware Visibility
Instead of showing all commands and throwing errors when conditions aren't met, the design hides unavailable commands. This reduces user frustration and maintains a clean UI.

### Alias System
`undo` and `redo` were designed as aliases for `revert` and `unrevert` to match standard IDE keyboard shortcut paradigms, making the agent feel more like a developer tool.

### Recovery from Stale Assets
By switching to `dev:web:full`, we leverage Vite's alias system:
```ts
// vite.config.ts
alias: {
  '@openchamber/ui': path.resolve(__dirname, '../ui/src')
}
```
This ensures the browser always gets the latest TypeScript source changes regardless of the state of the `dist` folder.
