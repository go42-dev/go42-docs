---
id: documentation
title: Documentation model
description: Shared writing rules, documentation ownership, and the application documentation model supplied by go42.
---

# Documentation model

This guide explains the documentation framework supplied by go42. Its design belongs here; each application records its
own behavior, requirements, choices, and operating context alongside its code.

Embedded-model reference: [go42 revision a7a46c6][revision].

## Ownership and scope

Go42's author maintains this website and its reusable blueprint guidance. Application contributors maintain their own
documentation; their changes, checks, and publication do not require a go42-docs checkout.

| Subject | Home |
| --- | --- |
| Generic quickstart, blueprint adoption, and reusable workflows | go42-docs |
| Why go42 supplies a mechanism, capability, or default | go42-docs, with upstream evidence |
| Shared writing rules and documentation ownership | This guide; local policies apply the rules in each repository |
| Orchestration commands, template defaults, and generated-file behavior | go42x source and local documentation |
| Exact commands, configuration, and API definitions | The owning repository's Taskfile, source, and contracts |
| Application behavior, effective settings, and complete operating procedures | Application handbook |
| Required application outcomes and acceptance criteria | Application requirements |
| Significant application choices and reasons for retaining or replacing defaults | Application decisions |

Use the upstream version that applies to the adopted code. Local instructions must account for the application's actual
settings and environment, including after it diverges from the blueprint.

### Role of go42x

The agreed role of go42x is to orchestrate project and documentation setup, shared defaults, validation, and publishing.
Repository Taskfiles define executable workflows; mise manages tool versions. Authors maintain the public guidance in
go42-docs and the effective application procedures in the application's own repository.

Describe orchestration features according to the applicable implementation. The [go42x command definitions][go42x-commands]
at `786e637` expose agent configuration, knowledge-base access, diagnostics, and MCP services. The project setup and
documentation publishing workflows are planned work. Their future command names and platform coverage need implementation
and verification before appearing as runnable instructions.

## Shared writing rules

Policy edition: September 14, 2026. Record software applicability separately for each procedure.

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

### Terminology and examples

Use **go42** for the upstream blueprint, **go42x** for its orchestration tool, **application** for a project adopting the
blueprint, and **local handbook** for that application's effective instructions. Identify the **upstream revision** as
the imported go42 commit or release. Use exact CLI names, task names, flags, configuration keys, units, and API fields.

Give each page one main purpose. Explain unfamiliar project concepts beside the steps that need them. Use language-tagged
code fences and explain placeholder values before readers substitute them. Keep shell prompts and illustrative output
outside copyable command blocks. Label incomplete examples and the behavior their checks establish.

Use a common workflow across operating systems, with concise installation notes for unavoidable differences. Record the
platforms actually verified. Review keyboard navigation, heading order, tables, code readability, and informative visual
alternatives when changing rendered content. Markdown and prose linting support this review; runtime instructions also
need relevant execution evidence.

### Applying the rules locally

This guide is the editorial home of the shared rules. The go42 handbook and go42x documentation policy retain the same
core rules with their policy edition, so contributors can use them within each checkout. Applications own their local
policy after adoption and record the scope and reason for local exceptions.

Each repository also defines its own authoring contract. Public go42-docs guides use `id`, `title`, and `description` metadata;
the embedded application model below defines its IDs, collections, statuses, and index rules. CLI guidance must account
for command versions, inputs, exit status, output, and generated state.

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

When changing a shared writing rule, review its local counterparts in go42 and go42x. Coordinate the relevant policy
changes, update the edition where the rules are adopted, and record any retained local exception. Keep the policy
edition distinct from the code revision and execution evidence used to substantiate a procedure.

Tools assist that review. With [go42x v0.24.0][go42x], `docs_get` reads documents by authored ID and `docs_impact` finds
linked documentation within the selected project. Missing links still require judgment, and external links do not
provide automatic impact analysis across repositories. Keep durable knowledge in the authored sources used by people,
publishing, and retrieval.

## Maintaining this website

Use this workflow in the go42-docs checkout. The [Taskfile][site-taskfile] defines the commands used locally and in CI.
When changing commands, dependencies, or check coverage, update the Taskfile, its CI callers, and these instructions
together.

### Source files and authoring

Public guides live in `docs/`, blog sources in `blog/`, and the Astro website in `pages/`. Edit authored sources; the
production build generates `.build/dist/`. The [site configuration][site-config] defines the sidebar, and
`pages/src/pages/index.astro` supplies the homepage.

Update an existing page when it owns the reader's task. A new guide needs a lowercase, hyphenated filename and YAML `id`,
`title`, and `description`. Keep its authored ID unique within this repository and stable across renames. Website routes
come from source paths independently of the authored ID. Use `draft: true` to preview an unfinished page with `task dev`
while excluding it from production builds and search. Add public navigation links when the page is ready to publish.

Page placeholders may contain only front matter. When writing the body, include one visible H1 matching the title. The
publisher uses the metadata title and removes that initial H1 from the page body. Use relative Markdown links such as
`documentation.md#shared-writing-rules` between guides; the
publisher converts them to website routes. Link to repository sources on GitHub when the destination is outside `docs/`.

Add useful entry links and a sidebar entry when creating a guide. A source such as `docs/quickstart.md` would publish at
`/docs/quickstart/`; `docs/index.md` publishes at `/docs/`. Check inbound links and preserve important URLs and heading
anchors when renaming, moving, or removing content. Store static assets in `pages/public/` and use their published paths.

### Setup, preview, and checks

Install mise and Task and make both available on `PATH`. The [tool configuration][site-tools] specifies the minimum mise
version and pins the project tools; `etc/mise.lock` retains their resolved versions. From the go42-docs repository root:

```sh
task setup
```

Setup installs the pinned tools, downloads the configured Vale styles, and installs the locked website dependencies.
Tools and caches live in `.tools/`, styles in `etc/.vale/styles/`, and website dependencies in `pages/node_modules/`.
An initial setup needs network access. Repeat setup after changing the relevant configuration or lockfile.

Use these commands from the same directory:

| Command | Purpose |
| --- | --- |
| `task dev` | Preview edits with the development server; open the printed local URL. |
| `task build` | Build the production website and validate internal links and anchors. |
| `task check` | Run tooling tests, Astro checks, the production build, and internal link checks. |
| `task test` | Run the link checker's regression tests when changing documentation tooling. |
| `task preview` | Build and serve the production output for a rendered review. |
| `task lint` | Check Markdown formatting with Markdownlint and prose with Vale. |

Stop a preview server with Ctrl+C. A successful check exits with status zero. Fix failures in their owning source files
and rerun the affected check; run `task lint` and `task check` before completing the change. Previewing the development
server alone does not run the production checks.

The [CI workflow][site-ci] runs `task setup` and `task lint` in a separate lint job. The build job waits for lint to pass,
then runs `task setup` and `task check` before uploading the website. These checks include tooling tests, Astro checks,
and the production build. The build validates internal navigation links and HTML anchors against the generated output.
Deployment follows successful checks on `master` through the workflow's publication triggers. Review changes through
the same Task entrypoints used by CI.

### Reviewing changes and recording evidence

Start with the affected reader task and inspect the related sources:

| Changed source | Guidance to review |
| --- | --- |
| go42x commands, Taskfiles, tool versions, or setup | Public setup and workflow examples, homepage examples, and local development instructions. |
| go42 configuration, contracts, handlers, or authentication | Public prerequisites and request examples, plus the owning local configuration or API handbook. |
| Documentation policies, templates, or publishing | The three documentation policies, authored metadata and links, and relevant Task and CI checks. |

Coordinate related changes across repositories and describe behavior for the software version the guide actually uses.
When commands, prerequisites, defaults, or expected results change, execute the affected procedure using its declared
starting state. A wording edit needs a proportionate review and documentation checks. Inspect changed pages in the
production preview for heading order, readable examples, useful links, keyboard navigation, and relevant screen sizes.
The automated link check makes no network requests; review essential external source and installation links separately.

Keep a concise applicability statement with each executable guide. Record detailed evidence with the implementation
change or review, and link it from the owning guide when readers need the baseline details:

| Evidence | Record |
| --- | --- |
| Procedure and baseline | Page and steps, documentation revision, applicable go42 and go42x revisions, and relevant local modifications. |
| Environment | OS and architecture, tool and backend versions, prerequisites, and initial state. |
| Execution | Date, commands or review method, expected and observed results, recovery, cleanup, and evidence location. |
| Coverage | What was inspected, executed, or observed with a reader; failures and untested environments or branches. |

Update the applicability statement after rerunning an affected procedure. Keep earlier evidence tied to its original
baseline. A site build verifies publication checks; application procedures need their own execution results. The planned
go42x setup and evaluation quickstart still require implementation and rehearsal before they can have verified results.

When reporting a documentation failure, include the page, failing step, software revisions, environment, expected result,
and actual result. Remove credentials from retained output. Keep durable corrections in the owning document and detailed
logs with the change that verifies them.

[revision]: https://github.com/go42-dev/go42/tree/a7a46c664c08d5acfc8b0c4f398f4ccac42635be
[assembler]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/pages/assemble.mjs
[tests]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/pages/assemble.test.mjs
[index]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/docs/README.md
[policy]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/docs/handbook/documentation.md
[requirement]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/docs/requirements/001-documentation.md
[decision]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/docs/decisions/001-documentation-model.md
[publishing]: https://github.com/go42-dev/go42/blob/a7a46c664c08d5acfc8b0c4f398f4ccac42635be/.github/workflows/210-github-pages.yaml
[go42x]: https://github.com/go42-dev/go42x/tree/v0.24.0
[go42x-commands]: https://github.com/go42-dev/go42x/blob/786e63796f210640f9c37bb55f4a978831fe94c5/internal/cmd/cmd.go
[site-taskfile]: https://github.com/go42-dev/go42-docs/blob/master/Taskfile.yaml
[site-config]: https://github.com/go42-dev/go42-docs/blob/master/pages/astro.config.mjs
[site-tools]: https://github.com/go42-dev/go42-docs/blob/master/etc/mise.toml
[site-ci]: https://github.com/go42-dev/go42-docs/blob/master/.github/workflows/pages.yaml
