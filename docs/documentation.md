---
id: documentation
title: Writing documentation
description: How to write clear docs and keep them useful as a project changes.
---

# Writing documentation

Good documentation helps someone understand the project or finish a task. Explain how things work, give useful examples,
and keep the instructions up to date.

## Ownership and scope

The go42 guide explains ideas shared across projects. Go42's authors maintain it. Each application's contributors write
and maintain the docs for their own code, settings, and procedures. The go42x docs explain how to use and change the tool.

Keep instructions with the project they describe. An application needs complete local docs, including anything it has
changed from the go42 starting point.

## Shared writing rules

Use these rules when writing or reviewing docs, including work done with AI assistance.

- Start with the reader's task. Say what they will learn or do and what they need first.
- Use plain language. Keep sentences short and explain unfamiliar terms.
- Make examples easy to use. Say where to run commands, explain placeholders, and show the expected result.
  Keep commands and output in separate code blocks. Use exact command names, flags, and paths, with sample values
  instead of secrets.
- Check your instructions. Try the steps you describe. Say what you have not tested and label planned features.
- Make pages easy to scan. Use clear headings, useful link text, and descriptions for images.
- Update docs with the code. Fix affected instructions and links in the same change.

## Where application docs live

The application keeps its docs in `docs/`. Use the document type that fits the subject:

| Type | What to write | Folder |
| --- | --- | --- |
| Handbook | How the application works and how to use, change, or troubleshoot it | `docs/handbook/` |
| Requirements | What the application needs to do and how to tell when it is done | `docs/requirements/` |
| Decisions | Important choices, the options considered, and the reasons for the choice | `docs/decisions/` |

For a new login method, a requirement describes what users need, a decision explains the chosen approach, and the
handbook shows how to use it.

The index in `docs/README.md` helps readers find these pages. Templates in `docs/templates/` provide starting points.
Change their sample fields and remove sections that do not help the reader.

## Updating documentation

Update the existing page when something changes. Add a page when the subject needs its own explanation.

A requirement marked `accepted` means the team has agreed on it. Describe what is working and what is still missing.
Keep the handbook focused on how the application works today.

When an agreed decision changes, write a new decision and link the old one to its replacement. Keep the original
reasoning so readers can understand the change. Fixing a typo or clarifying the text can happen in the existing page.

Each project can adapt its writing rules to its needs. When a shared rule changes, update the guidance in the go42 guide,
go42, and go42x together.
