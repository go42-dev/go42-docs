---
title: Documentation model
description: The documentation model supplied by go42, its design goals, and the boundary with application knowledge.
---

# Documentation model

This guide explains the documentation framework supplied by go42. Its design belongs here; each application records its
own behavior, requirements, choices, and operating context alongside its code.

Tooling reference: [go42 revision a7a46c6][revision].

## Ownership and scope

Go42's author maintains this website and its reusable blueprint guidance. Application contributors maintain their own
documentation; their changes, checks, and publication do not require a go42-docs checkout.

| Subject | Home |
| --- | --- |
| Generic Quick start, blueprint adoption, and reusable workflows | go42-docs |
| Why go42 supplies a mechanism, capability, or default | go42-docs, with upstream evidence |
| Application behavior, effective settings, setup deviations, and operating procedures | Application handbook |
| Required application outcomes and acceptance criteria | Application requirements |
| Significant application choices and reasons for retaining or replacing defaults | Application decisions |

Use the upstream version that applies to the adopted code. Local instructions must account for the application's actual
settings and environment, including after it diverges from the blueprint.

## The embedded document model

The scaffold distinguishes three kinds of application knowledge, with an overview and templates supporting them:

| Role | Purpose | Source |
| --- | --- | --- |
| Overview | Entry point, task navigation, and complete index | `docs/README.md` |
| Handbook | Current behavior, architecture, and working procedures | `docs/handbook/` |
| Requirements | Desired outcomes, scope, criteria, and evidence; one living record per capability or concern | `docs/requirements/` |
| Decisions | Significant choices, alternatives, reasoning, and consequences | `docs/decisions/` |
| Templates | Authoring resources, presented separately from application records | `docs/templates/` |

The [publication tooling][assembler] requires explicit `id`, `title`, and `collection` metadata. Record status expresses
agreement or lifecycle; acceptance and delivery are separate facts. Related IDs and decision replacement links connect
records, while authored IDs remain stable across ordinary moves and title changes. Source paths and published URLs need
their own compatibility checks when content moves.

Templates can show sample record fields without becoming application intent. When copying one, authors replace its ID,
collection, and placeholder metadata according to the application's local policy.

## Why go42 supplies these defaults

A shared upstream guide explains the blueprint but cannot establish an application's promises, owners, or deployment
settings. Copying it wholesale creates competing explanations to maintain. Keeping application knowledge with the code
lets contributors update facts and procedures with the behavior they describe, while linking to reusable explanations.

The [original proposed decision][decision] records these alternatives. The [original draft requirement][requirement]
records the framework's intended coverage. Preserve those records as design provenance: their `proposed` and `draft`
statuses at the referenced revision do not establish acceptance for an adopted application.

### Framework goals

These goals summarize the draft requirement. Application acceptance and delivery evidence are recorded locally.

| Goal | Verification responsibility |
| --- | --- |
| Make knowledge discoverable | A complete [index][index] separates collections, orders records, and presents templates separately. |
| Distinguish intent, implementation, and history | Metadata checks enforce valid statuses and replacement links; maintainer agreement establishes acceptance. |
| Maintain knowledge with changes | Contributors review the owning documents alongside implementation and explain documentation impact. |
| Publish the authored sources | [Assembler checks and tests][tests] validate metadata, index coverage/order, and local file links; the site build checks rendered links and anchors. |
| Provide usable operating instructions | Application review establishes purpose, ownership, environment, prerequisites, effects on state, expected results, and recovery steps. |
| Keep application documentation independent | The [publishing workflow][publishing] uses local sources, policy, templates, and tooling without importing go42-docs. |
| Support feature work and diagnosis | Source, contract, configuration, test, and runbook links let readers trace a change or symptom and identify useful checks. |

A successful documentation build proves structural checks passed. Completeness, application behavior, and the scope of
verification evidence still need review and relevant runtime checks. Record unknowns and delivery gaps explicitly.

## Local policy and inherited defaults

Each application keeps its policy, conventions, and usable templates with its code. They define the metadata, statuses,
checks, and maintenance process actually in force there. Review those contracts when adopting or upgrading go42.

Start at the application's `docs/README.md`, then its profile, conventions, and documentation policy. Use the
[scaffold policy][policy] as a reference for the pinned revision; an adopted application's own policy takes precedence
for its contributors. Keep application-specific instructions and exceptions in their owning local documents.

## Updating documentation

Application contributors update their handbook and affected records with implementation changes. Preserve accepted
decision reasoning; record a reversal in a new decision and link the superseded record to its replacement. Distinguish
observed results, inspected source, and historical inference in the evidence.

Go42's author updates this guide when the documentation framework changes, with references to the relevant source
revision. Changes to shared mechanisms also need a review of their global explanations.

Tools assist that review. With [go42x v0.24.0][go42x], `docs_get` reads documents by authored ID and `docs_impact` finds
linked documentation within the selected project. Missing links still require judgment, and external links do not
provide automatic impact analysis across repositories. Keep durable knowledge in the authored sources used by people,
publishing, and retrieval.

[revision]: https://github.com/go42-dev/go42/tree/a7a46c664c08d5acfc8b0c4f398f4ccac42635be
[assembler]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/pages/assemble.mjs
[tests]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/pages/assemble.test.mjs
[index]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/docs/README.md
[policy]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/docs/handbook/documentation.md
[requirement]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/docs/requirements/001-documentation.md
[decision]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/docs/decisions/001-documentation-model.md
[publishing]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/.github/workflows/210-github-pages.yaml
[go42x]: https://github.com/go42-dev/go42x/tree/v0.24.0
