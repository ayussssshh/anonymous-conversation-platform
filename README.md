# Anonymous Conversation Platform

A real-time, anonymous, topic-oriented communication platform.

The core idea is simple:

> **People should be able to communicate around ideas and conversations without needing to establish a permanent identity.**

Participants enter the platform without traditional user accounts. They receive temporary identities, discover or create conversations, and communicate with other anonymous participants through those conversations.

The project is being developed as a serious full-stack engineering project, with emphasis on:

* Backend architecture
* Realtime communication
* Anonymous session management
* PostgreSQL data modeling
* API design
* Security and abuse considerations
* Testing
* Documentation
* Project and backlog management
* Maintainable code

## Current Technology Direction

### Frontend

* TypeScript
* React
* Vite

### Backend

* TypeScript
* Fastify

### Database

* PostgreSQL

The exact architecture and supporting technologies will be decided after the product model is sufficiently defined.

## Core Product Model

The application is **conversation-centric rather than identity-centric**.

```text
Temporary Participant
        │
        │ joins
        ▼
   Conversation
        │
        │ contains
        ▼
      Messages
```

Participants:

* do not create traditional accounts
* receive temporary identities
* can participate in multiple conversations
* are not represented by permanent social profiles

Conversations:

* are topic-oriented
* can be discovered by other participants
* can be created by participants
* contain messages
* have their own lifecycle

Messages belong to conversations rather than depending on the continued existence of their sender.

## Project Scope

The initial goal is **not** to build a massive social network or optimize for millions of users.

The goal is to build a reasonably robust system that demonstrates good software engineering and can handle meaningful real-world usage.

Large-scale concerns such as:

* multi-region infrastructure
* massive distributed systems
* sophisticated recommendation engines
* monetization
* large-scale growth

are intentionally outside the initial scope.

They may be considered as future extensions.

## Development Philosophy

The project will be developed in stages:

```text
Product Definition
        ↓
Requirements
        ↓
System Design
        ↓
Data Model
        ↓
API / Realtime Design
        ↓
Implementation
        ↓
Testing
        ↓
Deployment
        ↓
Iteration
```

Important product and technical decisions will be documented rather than being silently introduced through implementation.

The project will also maintain a structured backlog so that features, technical improvements, bugs, and future ideas remain separate from the current development scope.

## Documentation

The current product definition can be found in:

`docs/PRODUCT.md`

This document is intentionally a living document. Unresolved questions will be explicitly marked rather than being converted into accidental implementation decisions.

## Status

**Early design / pre-implementation**

The product model is currently being defined before the main implementation begins.
