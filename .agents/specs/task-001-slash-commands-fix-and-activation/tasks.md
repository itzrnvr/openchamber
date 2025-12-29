# Tasks - Slash Commands Fix and Activation

## Step 1: Information Gathering & Baseline
- [x] Analyzed `COLLABORATION_SUMMARY.md` and `SLASH_COMMANDS_IMPLEMENTATION_PLAN.md` to understand the intended feature set.
- [x] Verified code presence for 8 new commands in `CommandAutocomplete.tsx`, `ChatInput.tsx`, and `useSessionStore.ts`.
- [x] Identified that `bun run start:web` was serving stale assets.

## Step 2: Debugging & Verification
- [x] Executed `bun run dev:web:full` to trigger a fresh build.
- [x] **Caught Build Error**: Found `RiUndoLine`, `RiRedoLine`, and `RiCompressLine` were missing exports in `@remixicon/react` v4.
- [x] Verified incorrect usage of these icons in `packages/ui/src/components/chat/CommandAutocomplete.tsx`.

## Step 3: Implementation - Fix Breaking Changes
- [x] Modified `packages/ui/src/components/chat/CommandAutocomplete.tsx`:
    - Updated imports to use `RiArrowGoBackLine`, `RiArrowGoForwardLine`, and `RiContractLine`.
    - Updated `getCommandIcon` helper to use the new component names.
- [x] Verified that the dev server rebuild successfully after these changes.

## Step 4: UI Cleanup & Validation
- [x] Cleared stale build artifacts: `rm -rf packages/web/dist`.
- [x] Instructed user to perform a Hard Refresh (Cmd+Shift+R) to resolve "Failed to fetch module" errors.
- [x] Validated that commands appear only when context conditions are met (e.g., sending 2 messages to reveal `/revert`).

## Files Touched
- `packages/ui/src/components/chat/CommandAutocomplete.tsx`
- `.agents/specs/task-001-slash-commands-fix-and-activation/discovery.md`
- `.agents/specs/task-001-slash-commands-fix-and-activation/requirements.md`
- `.agents/specs/task-001-slash-commands-fix-and-activation/design.md`
- `.agents/specs/task-001-slash-commands-fix-and-activation/tasks.md`
- `.agents/agent-timeline.md`
