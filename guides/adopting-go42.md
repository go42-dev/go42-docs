---
title: Adopt go42
description: Establish your application's identity, development environment, and operating context.
---

# Adopt go42

Read this guide online while working in the application checkout. Adopting go42 does not require cloning or maintaining
go42-docs; its author maintains the guide independently.

## Establish the application's identity

Start from the [go42 repository](https://github.com/go42-dev/go42). Update the new application's `docs/handbook/project.md`:

1. Replace the scaffold's purpose with the application's purpose, intended users, owner, and boundaries.
2. Replace the `Origin` section with the source go42 repository and imported commit or release.

Review the local conventions, documentation policy, templates, and initial documentation drafts for applicability.
Record requirements for actual application capabilities and decisions for consequential local choices using the local
templates. Keep the context of inherited defaults visible and link to upstream explanations where useful. Acceptance of
the initial documentation requirement and decision must reflect the application's own review.

## Prepare the development environment

The [Makefile](https://github.com/go42-dev/go42/blob/master/Makefile) is the authority for default development commands.
Install Go at the version declared in `go.mod`, mise at a compatible version, and Docker for workflows that use containers.
Use the checked-out `etc/mise.toml` and lockfile for development-tool versions.

From the application repository root:

```sh
make help
make setup
```

`make setup` installs the configured development tools and downloads Go dependencies. Read `.env.example` and configure
the local environment for the backends being used. `make run` starts the application with the checkout's configuration.

Use `make generate` after changing generated-code inputs. Keep the source and tracked generated outputs together.
Run the checks relevant to the change, as described in the [default workflows](default-workflows.md).

## Review inherited infrastructure defaults

Review repository settings, CI workflows, registry destinations, release settings, and the Helm chart before using them
for a new application. Some workflows retain `master` and `go42` as branch and service-name defaults. Adapt these to the
application and document the resulting local process.

For the release workflow, configure its expected GitHub App and repository settings. For Pages, review the site title,
repository-specific address, publishing workflow, and intended audience. The
[site configuration](https://github.com/go42-dev/go42/blob/master/pages/docusaurus.config.ts) and
[publishing workflow](https://github.com/go42-dev/go42/blob/master/.github/workflows/210-github-pages.yaml) define the
defaults. Application credentials and environment values belong to the application's configuration and secret management.

## Write the local operating context

Use the embedded handbook to record the application's setup, architecture, configuration, verification, release,
environments, deployment, recovery, and support responsibilities. Include the effective local instructions, including
inherited defaults, and link to this guide for additional explanation. Identify the applicable version where needed.
Record coverage gaps until the application-specific guides are written.

Review the local conventions and documentation policy again during upstream upgrades. They are versioned defaults that
the application owns after adoption.
