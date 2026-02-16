# CLAUDE_WORKFLOW.md

## File Change Workflow

**For existing files:**
1. Claude asks for the file contents
2. User runs `cat [filepath]` and pastes output
3. Claude provides complete updated file as code block
4. User copies into VS Code, saves, refreshes

**For new files:**
1. Claude creates and provides download
2. User downloads and adds to project

**For batch updates (3+ files):**
1. Claude packages files for download
2. User downloads and replaces

---

## Pre-Implementation Check

Before any code change, Claude answers:
- What files are changing?
- What's the expected result?
- What could break?

---

## Project Standards

- **Breakpoints:** 900px / 600px / 400px
- **No emoji** in site content
- **Accessibility:** WCAG AA minimum
- **Animations:** Smooth, organic, calm-pace

---

## File Locations

| Type | Location |
|------|----------|
| Pages | `app/` |
| Components | `components/` |
| Styles | Component CSS modules |
| Global styles | `app/globals.css` |
| Images | `public/images/` |

---

## To Start a New Chat

Upload this file + any relevant component files, then describe where we left off.