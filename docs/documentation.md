---
id: documentation
title: Documentation model
description: Shared writing rules, documentation ownership, and the application documentation model supplied by go42.
---

# Documentation model

This guide explains the documentation framework supplied by go42. Its design belongs here; each application records its
own behavior, requirements, choices, and operating context alongside its code.

## Ownership and scope

Go42's authors maintain this website and its reusable blueprint guidance. Application contributors maintain their own
documentation; their changes, checks, and publication do not require a go42 guide checkout.

| Subject | Home |
| --- | --- |
| Generic quickstart, blueprint adoption, and reusable workflows | go42 guide |
| Why go42 supplies a mechanism, capability, or default | go42 guide, with upstream evidence |
| Shared writing rules and documentation ownership | This guide; local policies apply the rules in each repository |
| Orchestration commands, template defaults, and generated-file behavior | go42x source and local documentation |
| Exact commands, configuration, and API definitions | The owning repository's Taskfile, source, and contracts |
| Application behavior, effective settings, and complete operating procedures | Application handbook |
| Required application outcomes and acceptance criteria | Application requirements |
| Significant application choices and reasons for retaining or replacing defaults | Application decisions |

Local instructions must account for the application's adopted code, actual settings, and environment, including after
it diverges from the blueprint.

## Shared writing rules

These rules apply to public guides, local handbooks, CLI documentation, and work produced with AI assistance. Apply them
to the page's purpose; choose useful headings and remove empty or irrelevant template sections.

| Rule | Required practice |
| --- | --- |
| State the scope | Identify the reader's task, promised result, prerequisites, and applicable software versions or environments. |
| Make procedures executable | Specify the working directory and required inputs. Separate copyable commands from output, preserve exact identifiers, and show expected results, effects on state, recovery, and cleanup where relevant. |
| Support claims with evidence | Link the relevant source or check. Distinguish inspected code, executed checks, proposals, and delivered behavior. Label assumptions and gaps; use disposable examples and keep credentials out of recorded evidence. |
| Make content accessible | Use meaningful headings and links, readable examples, and text alternatives for informative images. Check navigation and the rendered meaning of changed content. |
| Maintain documentation with changes | Update the owning document with behavior changes, preserve important URLs and anchors, and explain documentation impact. Update authored inputs and regenerate derived output. |
| Write consistently | Use direct language, stable terminology, and exact technical identifiers. Assume technical competence while explaining knowledge specific to go42. |

### Applying the rules locally

This guide is the editorial home of the shared rules. The go42 handbook and go42x documentation policy retain the same
core rules, so contributors can use them within each checkout. Applications own their local policy after adoption and
record the scope and reason for local exceptions.

Each repository also defines its own authoring contract. Public pages in the go42 guide use `id`, `title`, and
`description` metadata; the embedded application model below defines its IDs, collections, statuses, and index rules.
CLI guidance must account for command versions, inputs, exit status, output, and generated state.

## The embedded document model

The scaffold distinguishes three kinds of application knowledge, with an overview and templates supporting them:

| Role | Purpose | Source |
| --- | --- | --- |
| Overview | Entry point, task navigation, and complete index | `docs/README.md` |
| Handbook | Current behavior, architecture, and working procedures | `docs/handbook/` |
| Requirements | Desired outcomes, scope, criteria, and evidence; one living record per capability or concern | `docs/requirements/` |
| Decisions | Significant choices, alternatives, reasoning, and consequences | `docs/decisions/` |
| Templates | Authoring resources, presented separately from application records | `docs/templates/` |

The publication tooling requires explicit `id`, `title`, and `collection` metadata. Record status expresses
agreement or lifecycle; acceptance and delivery are separate facts. Related IDs and decision replacement links connect
records, while authored IDs remain stable across ordinary moves and title changes. Source paths and published URLs need
their own compatibility checks when content moves.

Templates can show sample record fields without becoming application intent. When copying one, authors replace its ID,
collection, and placeholder metadata according to the application's local policy.

## Why go42 supplies these defaults

A shared upstream guide explains the blueprint but cannot establish an application's promises, owners, or deployment
settings. Copying it wholesale creates competing explanations to maintain. Keeping application knowledge with the code
lets contributors update facts and procedures with the behavior they describe, while linking to reusable explanations.

### Framework goals

Applications record acceptance and delivery evidence locally.

| Goal | Verification responsibility |
| --- | --- |
| Make knowledge discoverable | A complete index separates collections, orders records, and presents templates separately. |
| Distinguish intent, implementation, and history | Metadata checks enforce valid statuses and replacement links; maintainer agreement establishes acceptance. |
| Maintain knowledge with changes | Contributors review the owning documents alongside implementation and explain documentation impact. |
| Publish the authored sources | Assembler checks and tests validate metadata, index coverage/order, and local file links; the site build checks rendered links and anchors. |
| Provide usable operating instructions | Application review establishes purpose, ownership, environment, prerequisites, effects on state, expected results, and recovery steps. |
| Keep application documentation independent | The publishing workflow uses local sources, policy, templates, and tooling without importing the go42 guide. |
| Support feature work and diagnosis | Source, contract, configuration, test, and runbook links let readers trace a change or symptom and identify useful checks. |

A successful documentation build proves structural checks passed. Completeness, application behavior, and the scope of
verification evidence still need review and relevant runtime checks. Record unknowns and delivery gaps explicitly.

## Local policy and inherited defaults

Each application keeps its policy, conventions, and usable templates with its code. They define the metadata, statuses,
checks, and maintenance process actually in force there. Review those contracts when adopting or upgrading go42.

Start at the application's `docs/README.md`, then its profile, conventions, and documentation policy. Use the
scaffold policy as a reference; an adopted application's own policy takes precedence for its contributors.
Keep application-specific instructions and exceptions in their owning local documents.

## Updating documentation

Application contributors update their handbook and affected records with implementation changes. Preserve accepted
decision reasoning; record a reversal in a new decision and link the superseded record to its replacement. Distinguish
observed results, inspected source, and historical inference in the evidence.

Go42's authors update this guide when the documentation framework changes. Changes to shared mechanisms also need a
review of their global explanations.

When changing a shared writing rule, review its local counterparts in go42 and go42x. Coordinate the relevant policy
changes and record any retained local exception.
