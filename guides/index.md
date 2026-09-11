---
title: The Go42 guide
description: A starting point for adopting, developing, and operating your next Go service.
---

Go42 is a Go service blueprint that brings application code, development workflows, and project documentation together.
Use these guides to understand the starting point and make it your own.

## Start here

1. [Adopt go42](adopting-go42.md): establish the application's identity and prepare the development environment.
2. [Learn the default workflows](default-workflows.md): develop, verify, release, and operate the application.
3. [Understand the documentation boundaries](documentation.md): keep Go42 guidance and application knowledge in their
   respective homes.

## A foundation you can change

The blueprint includes HTTP and gRPC interfaces, database-backed authentication, background workers, and development
and deployment tooling. The [go42 repository](https://github.com/go42-dev/go42) contains the implementation.

The code and configuration in your checkout determine the effective behavior. Review inherited defaults and record
your application's own requirements, decisions, and operating context in its embedded `docs/` directory.

## About this guide

These initial guides cover adoption, the default workflows, and documentation ownership. Detailed explanations of
individual subsystems will be added as they are documented and verified against the blueprint.

For project ideas and development notes, visit the [blog](https://go42.dev/blog/).
