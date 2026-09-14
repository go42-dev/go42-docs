---
title: Default workflows
description: Develop, generate, verify, release, and operate a service built from go42.
---

# Default workflows

## Development and generation

The [go42 Makefile](https://github.com/go42-dev/go42/blob/master/Makefile) and
[go42 conventions](https://github.com/go42-dev/go42/blob/master/docs/handbook/conventions.md) define the blueprint defaults
described here. Run commands from the application repository root, using its checked-out Makefile, conventions, and handbook
for the effective local setup. This guide can be consulted online; its repository is not a prerequisite for these workflows.

| Command | Purpose |
| --- | --- |
| `make help` | List the documented targets |
| `make setup` | Install pinned tools and fetch Go dependencies |
| `make run` | Run the application using local configuration |
| `make generate` | Regenerate derived code and API outputs |
| `make lint` | Run the configured project linters |

Edit generator inputs and configuration before regenerating derived files. Review and commit tracked source and
generated changes together.

## Verification

Select checks based on the affected behavior and its failure paths. Record the commands, results, backends, and relevant
skips in the pull request.

| Target | Coverage |
| --- | --- |
| `make test-unit` | Unit tests and coverage |
| `make test-fuzz` | Fuzz targets |
| `make test-integration` | Integration behavior with configured dependencies |
| `make test-resilience` | Recovery and lifecycle behavior with external dependencies |
| `make test-load` | HTTP and gRPC load tests |
| `make docs-check` | Markdown linting, Vale, documentation tooling, metadata, links, types, and website build |

The integration, resilience, and load workflows need the backends and configuration used by their tests. Follow the
application's local setup instructions. The [CI workflow](https://github.com/go42-dev/go42/blob/master/.github/workflows/100-unified-workflow.yaml)
defines the automated checks and their dependencies.

## Releases

The default [release workflow](https://github.com/go42-dev/go42/blob/master/.github/workflows/300-release.yaml) is manually
dispatched from `master`. It accepts a `v`-prefixed semantic version without build metadata, such as `v1.2.3` or
`v1.2.3-rc.1`.

The workflow checks that the selected source commit is the current branch tip, has a successful Unified CI run, and has
no existing tag or release for the requested version. It builds the release image and then publishes the tag and GitHub
release with source, image, and CI references. If the branch advances before validation completes, select the new revision
and start another release run.

The publishing step uses a GitHub App configured by `RELEASE_APP_CLIENT_ID`, `RELEASE_APP_PRIVATE_KEY`, and
`RELEASE_APP_NAME`. The application repository owns those settings and any adaptations to the release workflow.

## Deployment and operation

Deployment has its own application-specific process. The blueprint includes a
[Helm chart](https://github.com/go42-dev/go42/tree/master/infra/helm/app) as a starting point. Record the application's
environments, image selection, configuration, rollout verification, rollback, recovery, and support responsibilities in
its embedded handbook.

Go42's author maintains the explanations of these mechanisms in this operational guide. Application contributors maintain
their effective operating instructions and decisions beside their code, including any inherited defaults they use.

## Further reading

For additional guidance on development, Go style, and reliability:

- [Google Engineering Practices](https://google.github.io/eng-practices/)
- [Google Go Style Guide](https://google.github.io/styleguide/go/decisions.html)
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/)

The application's local conventions specify the practices it adopts.
