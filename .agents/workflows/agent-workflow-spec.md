# Agent Workflow Specification
**Version:** 1.0
**Last Updated:** 2024-01-15
**Purpose:** This document defines the mandatory workflow for all feature development sessions. Every agent must read and follow this specification at the start of each session.

---

## 1. Overview

For every distinct task or feature, you must create a complete documentation package in `.agents/specs/` before, during, and after implementation. This creates persistent context for future agents and enforces disciplined engineering practices.

**Golden Rule:** When in doubt, document it. When uncertain, ask. Never assume.

---

## 2. Workflow Phases (Sequential)

### Phase 1: Discovery
**File:** `.agents/specs/task-{id}-{slug}/discovery.md`
**When:** Before any requirements are finalized.
**Purpose:** Capture raw research, exploration, and decision-making.

**Required Sections:**
- `## Problem Context` - What problem are we solving?
- `## Research & Investigation` - Libraries, APIs, patterns explored
- `## Brainstorming & Alternatives` - Approaches considered
- `## Technical Constraints` - Limitations discovered
- `## Decision Log` - Why we chose this approach (critical for future context)

### Phase 2: Requirements
**File:** `.agents/specs/task-{id}-{slug}/requirements.md`
**When:** After discovery, before design.
**Purpose:** Formalize what must be built.

**Required Sections:**
- `## Problem Statement` - Refined from discovery
- `## Functional Requirements` - Specific features (use checkboxes)
- `## Non-Functional Requirements` - Performance, security, etc.
- `## Acceptance Criteria` - How we know it's done
- `## Dependencies` - Internal/external prerequisites

### Phase 3: Design
**File:** `.agents/specs/task-{id}-{slug}/design.md`
**When:** After requirements are approved.
**Purpose:** Specify how we will build it.

**Required Sections:**
- `## Architecture Overview` - System/component diagram
- `## Data Model` - Schema changes, entities
- `## API/Interface Definitions` - Signatures, protocols
- `## Key Algorithms` - Pseudocode for complex logic
- `## Integration Points` - How components interact
- `## Design Decisions` - Rationale (link to discovery.md)

### Phase 4: Execution
**File:** `.agents/specs/task-{id}-{slug}/tasks.md`
**When:** During implementation.
**Purpose:** Track what was actually done.

**Required Sections:**
- `## Files Modified` - Complete paths (e.g., `src/auth/service.ts`)
- `## Implementation Checklist` - Step-by-step with checkboxes
- `## Testing Strategy` - What was tested, how
- `## Verification Steps` - How to validate it works
- `## Deployment Notes` - Migration, rollout considerations
- `## Rollback Plan` - How to revert if needed

### Phase 5: Timeline Logging
**File:** `@openchamber/.agents/agent-timeline.md`
**When:** Immediately after task completion.
**Purpose:** Provide quick reference for project history.

**Entry Format:**
```markdown
## YYYY-MM-DD - Task {id}: {Brief Title}

**Status:** Completed  
**Agent:** [Your Agent ID]  
**Spec Directory:** `.agents/specs/task-{id}-{slug}`

**Summary:** [2-3 sentences on what was accomplished]

**Key Changes:**
- `path/to/file1.ts` - What changed
- `path/to/file2.ts` - What changed

**Notes for Future:**
- Any watch-outs, follow-ups, or considerations
```

---

## 3. Task ID Generation

**Automatic Process:**
1. List all directories in `.agents/specs/`
2. Find the highest existing task number (e.g., `task-005-...`)
3. Increment by 1 for the new task (e.g., `task-006`)
4. Append a descriptive slug (lowercase, hyphens)

**Example:** If `.agents/specs/task-005-api-pagination` exists, the next task is `task-006-user-export`.

**Critical:** Never reuse numbers. Never skip numbers.

---

## 4. Agent Behavior Rules

- **Rule 1:** At session start, check if this is new work or continuation. If new, begin Phase 1 immediately.
- **Rule 2:** Do not proceed to the next phase until the current phase is documented.
- **Rule 3:** When modifying files, update `tasks.md` in real-time, not at the end.
- **Rule 4:** If you cannot determine something from conversation history, **ask the user**. Do not invent details.
- **Rule 5:** Cross-reference files liberally using relative paths: `[see discovery.md](./discovery.md)`
- **Rule 6:** For retroactive documentation (documenting completed work), state your understanding first and get user confirmation before creating files.

---

## 5. Example Task Structure

```
.agents/specs/task-007-payment-integration/
├── discovery.md          # Researched Stripe vs. Braintree
├── requirements.md       # Must support 3D Secure, webhooks
├── design.md            # Adapter pattern for payment gateway
├── tasks.md             # 5 files modified, testing steps
└── resources/           # Optional: diagrams, API responses
    └── webhook-flow.png
```

---

## 6. Session Start Checklist

At the beginning of every session, verify:
- [ ] Is this continuing an existing task? (Check `.agents/specs/`)
- [ ] If new task, created `discovery.md` first?
- [ ] All four spec files will be created before session ends?
- [ ] Timeline entry will be added after completion?