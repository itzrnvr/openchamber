# Requirements - Slash Commands Fix and Activation

## Functional Requirements
The system must support the following slash commands with full end-to-end functionality:

| Command | Action | Availability Condition |
|---------|--------|-----------------------|
| `/revert` | Revert session to previous state | ≥ 2 messages exist |
| `/undo` | Alias for `/revert` | ≥ 2 messages exist |
| `/unrevert` | Undo the last revert operation | A revert operation was performed |
| `/redo` | Alias for `/unrevert` | A revert operation was performed |
| `/abort` | Interrupt current agent operation | Session state is 'busy' |
| `/edit` | Edit the last user message | Last message is from 'user' |
| `/clear` | Clear all messages in session | Messages > 0 |
| `/compact` | Compact session history | Messages > 0 |
| `/init` | Initialize AGENTS.md | New session (0 messages) |
| `/summarize`| Generate session summary | Messages > 0 |

## Non-Functional Requirements
- **UI/UX**: Commands must be discoverable via a `/` trigger in the chat input.
- **Performance**: Autocomplete must be responsive and filter results in real-time.
- **Reliability**: Commands must handle API errors gracefully and provide user feedback via toast notifications.
- **Build Integrity**: The project must build without TypeScript or ESM export errors.

## Acceptance Criteria
1. Typing `/` in an active session shows the new commands.
2. Selecting a command (e.g., `/revert`) triggers the corresponding action and shows a success/error toast.
3. Commands correctly hide/show based on the session state (e.g., `/edit` disappears if the last message is from the assistant).
4. Build process completes without "RiUndoLine is not exported" errors.
