---
title: Documentation boundaries
description: Understand how Go42 guidance and each application's documentation are maintained.
---

# Documentation boundaries

## Ownership and scope

Go42's author solely maintains go42-docs as the source for the public Go42 website, its operational guides, and its blog.
The guides explain adoption, development, and operation of the blueprint. Users can read them online; this repository is
outside their application checkout and documentation responsibilities.

Each application's contributors and AI agents maintain its embedded documents. Application work, documentation checks,
and publishing do not require a go42-docs checkout or changes to this guide.

| Subject | Owner |
| --- | --- |
| How the go42 release mechanism works | Go42's author, in this guide |
| How a particular application is released and deployed | Application handbook |
| Why go42 supplies a capability or default | Go42's author, supported by upstream evidence |
| What an application needs from that capability | Application requirements |
| Why an application retained or replaced a default | Application decisions |
| Current commands, settings, conventions, and exceptions for an application | Application repository |

The guide's author documents mechanisms and defaults that apply to go42. Application contributors document their own
promises, choices, configuration, and operating instructions, even when they retain a default. Their handbook contains the
effective local instructions needed for routine development and operation. Links to this guide provide additional
explanation and identify the applicable version where needed.

## The embedded document model

Each application has three collections:

- **Handbook:** how the current application works and how to work with it. Update it alongside implementation changes.
- **Requirements:** the desired outcomes and behavior, with acceptance criteria and verification evidence. Maintain one
  living document per capability or concern.
- **Decisions:** significant choices, alternatives, reasoning, and consequences. Preserve historical reasoning and link
  a superseded decision to its replacement.

The source files remain readable in a checkout and can be compiled into the application's own Pages site. Authoring
templates are presented separately from actual records. API reference is generated from its contracts.

## Why go42 supplies these defaults

The earlier documentation layout contained an empty core page and broad BRD and ADR templates. Their responsibilities
and update rules were unclear, and publishing treated templates as project records while excluding local conventions.
The current defaults distinguish present behavior, intended outcomes, and decision history, with small templates and
explicit metadata for people and AI.

The blueprint supplies a local policy, templates, and checks so each application can maintain documentation that matches
its code revision. Go42's design explanation stays in this guide. Local records describe the application's own
requirements and choices; the initial documentation requirement and decision are drafts for its adoption review.

## Local policy and inherited defaults

The application carries a small documentation policy, templates, and conventions so people and AI can work from its
checkout. These files are local contracts, inherited from the blueprint and reviewed during adoption or an upstream
upgrade. They define the metadata, statuses, checks, and maintenance process used by that code revision.

Start at the application's `docs/README.md`, its documentation entry point and published homepage. It links the application
profile, `docs/handbook/conventions.md`, the documentation policy, and the document collections. This guide explains the
go42 defaults; the local policy records the rules actually in force for the application. The usable templates remain with
the code and its validation tooling.

## Updating documentation

Application contributors update affected documentation alongside implementation changes in their application repository.
They can use this guide as a reference without maintaining it.

The go42 author updates this operational guide when the blueprint's mechanisms or defaults change. Those updates are
separate from application contributions and should identify the code revision they describe.

Acceptance of a requirement or decision and implementation progress are separate facts. Record unknowns and delivery gaps
explicitly. Validate commands and claims against their sources. Keep original reasoning and distinguish documented
evidence from retrospective inference.
