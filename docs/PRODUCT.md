# Anonymous Conversation Platform

## Product Definition — v0.1

**Status:** Draft
**Version:** 0.1
**Purpose:** Establish the product's identity, core philosophy, fundamental entities, and boundaries before implementation.

---

## 1. Product Summary

This project is an anonymous, topic-oriented conversation platform.

People can enter the platform without creating a traditional account or establishing a permanent identity. They can discover conversations, join conversations that interest them, or create their own conversations.

The primary object of the platform is **the conversation**, not the user.

Participants are temporary identities that exist for the purpose of participating in conversations.

The initial communication medium is text.

The project is primarily intended to demonstrate a well-engineered, maintainable, and reasonably robust full-stack application rather than to solve large-scale social-network growth or infrastructure problems.

---

## 2. Core Philosophy

### 2.1 Conversation over identity

The platform should encourage people to communicate based on:

* ideas
* interests
* questions
* opinions
* topics

rather than their real-world identity.

A participant should not need:

* a real name
* an email address
* a profile
* a permanent username
* a follower network
* a friend list

to participate in a conversation.

---

### 2.2 Temporary identity

A participant receives an identity for their active participation in the system.

This identity is temporary rather than a permanent account.

The platform should not maintain a permanent social identity for a participant merely because they previously visited the site.

The exact lifecycle of a participant identity remains to be formally defined.

---

### 2.3 No traditional user accounts

The initial product will not implement traditional user accounts.

There will be no requirement for:

* registration
* login
* password
* email verification
* permanent user profile

The absence of accounts is a deliberate product decision, not merely a missing feature.

---

### 2.4 The platform mediates communication

Participants communicate through the platform.

Conceptually:

Participant A → Server → Participant B

Participants should not be given direct access to another participant's network identity or connection details through the application.

The system should avoid exposing unnecessary information that could allow participants to directly identify or contact one another.

This does not mean the platform can guarantee that participants can never identify one another. Participants may voluntarily reveal information through their messages or behavior.

---

## 3. Fundamental Entities

The initial product consists primarily of three conceptual entities:

```text
Participant
     │
     │ participates in
     ▼
Conversation
     │
     │ contains
     ▼
Message
```

These relationships are more important than any particular database implementation.

---

## 4. Participant

A participant represents a person currently participating in the platform.

A participant is not equivalent to a permanent user account.

### A participant may:

* enter the platform
* receive a temporary identity
* join multiple conversations
* send messages
* receive messages
* leave conversations
* leave the platform entirely

### A participant does not initially have:

* permanent account identity
* profile
* email
* password
* friends
* followers
* permanent social history

### Internal identity

The system will require some internal mechanism for distinguishing active participants.

This identity may be completely meaningless to humans.

Example:

```text
Internal participant identity:
7f8c...a92e
```

The human-facing representation may instead be something like:

```text
Anonymous Fox
```

The exact generation and naming system is intentionally deferred.

---

## 5. Participant Identity and Network Identity

The product must distinguish between:

**Application identity**

and

**Network identity**.

The platform should not conceptually define:

> IP address = user

An IP address may be useful as one technical signal, but it is not a reliable representation of a human participant.

Multiple people may share an IP address, while one person may appear through different IP addresses.

Therefore:

> Every active participant should receive a distinct temporary application identity.

The exact mechanism used to create, maintain, reconnect, and expire that identity will be decided during technical design.

---

## 6. Participant Lifecycle

The current intended lifecycle is:

```text
Enter platform
      ↓
Temporary participant created
      ↓
Join one or more conversations
      ↓
Participate
      ↓
Leave conversations
      ↓
Session ends
      ↓
Temporary identity eventually expires
```

The system should not assume that a participant who returns later is necessarily the same participant.

### Decisions still required

The following must be formally decided later:

* What exactly constitutes a session?
* What happens when a browser tab closes?
* What happens when a connection temporarily drops?
* Can a participant reconnect and retain their identity?
* How long can a disconnected participant remain recoverable?
* Can multiple tabs represent the same participant?
* Can one participant have multiple simultaneous connections?
* What happens when a device changes network?
* When exactly is a participant considered permanently gone?

These are important because they affect both the product semantics and technical architecture.

---

# 7. Conversation / Chat Room

A conversation is the primary social object of the platform.

A conversation provides a shared context in which multiple anonymous participants can communicate.

A conversation may contain:

* a subject/title
* a description
* tags
* participants
* messages
* lifecycle state

The exact fields are not yet finalized.

---

## 8. Conversation Creation

The current intended model is:

> Any participant may create a conversation.

Creating a conversation does not create a permanent relationship between the creator and the conversation.

The creator is simply the participant who initiated it.

Whether the creator receives special privileges is undecided.

Possible future permissions include:

* closing a conversation
* modifying conversation metadata
* removing participants
* moderating messages

These must be explicitly decided before implementation.

---

## 9. Conversation Membership

A participant may participate in multiple conversations simultaneously.

For example:

```text
Anonymous Fox
    │
    ├── Artificial Intelligence
    ├── Linux
    └── Philosophy
```

Participation in one conversation should not require the participant to leave another.

A participant's identity may or may not remain consistent across conversations. This is currently undecided and requires further discussion.

---

# 10. Messages

Messages are fundamentally associated with the conversation in which they were created.

A message is not deleted merely because its sender leaves the platform.

Example:

```text
Conversation
│
├── Message A — Anonymous Fox
├── Message B — Anonymous Owl
├── Message C — Anonymous Fox
└── Message D — Anonymous Tiger
```

If Anonymous Fox leaves:

```text
Conversation
│
├── Message A — Anonymous Fox    ← remains
├── Message B — Anonymous Owl
├── Message C — Anonymous Fox    ← remains
└── Message D — Anonymous Tiger
```

The current rule is:

> **A message remains available for as long as its conversation remains available, unless a separate moderation or deletion rule removes it.**

The lifetime of a conversation has not yet been defined.

---

# 11. Conversation Discovery

The homepage should primarily help participants discover conversations rather than people.

The initial conceptual homepage may contain three major paths:

### Live conversations

Show conversations that are currently active.

Possible signals:

* current participant count
* recent activity
* recent messages
* activity velocity

### Explore / Search

Allow participants to find conversations based on:

* topic
* subject
* description
* tags

### Create

Allow the current participant to start a new conversation.

The exact ranking algorithm is intentionally deferred.

The initial version should not depend on sophisticated recommendation or machine-learning systems.

---

# 12. Social Model

The platform is conversation-centric.

The intended social structure is:

```text
People
  ↓
temporary anonymous participants
  ↓
discover conversations
  ↓
join conversations
  ↓
communicate
  ↓
leave
```

The platform does not initially contain:

```text
Friends
Followers
Profiles
Likes
Permanent social graphs
Direct messages
```

These are outside the initial product model unless deliberately introduced later.

---

# 13. Anonymity Model

The product's anonymity goal is:

> Participants should not need to establish a permanent identity with the platform or with other participants.

The platform should minimize persistent identity information.

However, the product must not incorrectly claim that the server or underlying infrastructure is mathematically incapable of observing network information.

The distinction is:

```text
No permanent application identity
             ≠
No technically observable network information
```

A stronger server-anonymity model may be considered later.

---

# 14. Initial Technical Scope

The first implementation will use:

### Frontend

* TypeScript
* React
* Vite

### Backend

* TypeScript
* Fastify

### Database

* PostgreSQL

### Communication

* HTTP for conventional application operations
* Realtime communication mechanism to be formally selected during architecture design

The exact infrastructure, deployment strategy, scaling model, and hosting configuration are intentionally deferred.

---

# 15. Project Engineering Goal

This project is primarily a serious engineering and learning project.

The objective is to demonstrate the ability to design and build a reasonably complete software system with:

* clear requirements
* maintainable architecture
* good backend design
* PostgreSQL data modeling
* realtime communication
* validation
* error handling
* security considerations
* testing
* documentation
* version control
* issue/backlog management
* deployment
* reasonable production readiness

The project should be capable of handling reasonable real-world usage.

It is **not currently optimized for**:

* millions of users
* global infrastructure
* multi-region deployment
* massive distributed systems
* viral growth
* monetization
* sophisticated recommendation systems

These may be future extensions rather than V1 requirements.

---

# 16. Explicit Non-Goals for V1

The following are not currently part of the initial product:

* Permanent user accounts
* User profiles
* Friend system
* Followers
* Direct messaging
* Voice communication
* Video communication
* File sharing
* Complex recommendation engine
* Large-scale distributed infrastructure
* Monetization
* Social-growth optimization

These may be reconsidered later, but should not influence the initial architecture unnecessarily.

---

# 17. Important Open Decisions

The following questions must be resolved before the corresponding implementation begins.

## Participant

1. What exactly defines a participant session?
2. How is a temporary participant identity generated?
3. Can a participant reconnect?
4. How long does a disconnected identity remain valid?
5. Can multiple browser tabs share one identity?
6. Can one participant have multiple simultaneous connections?
7. Does a participant have the same anonymous name in every conversation?
8. What information, if any, is retained after a session ends?

## Conversations

9. What exactly makes a conversation active?
10. When is a conversation considered inactive?
11. When does a conversation expire?
12. Does an empty conversation remain available?
13. Can conversations be reopened?
14. Can any participant delete/close a conversation?
15. Does the creator have special privileges?
16. Can participants be removed or muted?
17. Can a participant join every conversation?

## Messages

18. Are messages permanently retained for the lifetime of a conversation?
19. Can messages be edited?
20. Can participants delete their own messages?
21. Can moderators delete messages?
22. What happens to messages when a conversation expires?
23. What ordering guarantee do messages have?

## Discovery

24. What exactly appears on the homepage?
25. How are active conversations ranked?
26. How does search work?
27. How are tags defined?
28. Can a newly created conversation be immediately discoverable?
29. What happens to conversations with no participants?

## Moderation / Abuse

30. How can abusive participants be handled without permanent identities?
31. What can be rate-limited?
32. Who can moderate a conversation?
33. What happens when someone repeatedly reconnects to evade restrictions?
34. What information can the system temporarily retain for abuse prevention?

These questions should be answered deliberately rather than implicitly through implementation.

---

# 18. Current Product Definition

At the current stage, the product can be summarized as:

> **A conversation-centric anonymous communication platform where people can temporarily participate in topic-based conversations without creating permanent identities.**

The fundamental model is:

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

The participant is temporary.

The conversation provides the social context.

Messages belong to the conversation rather than the lifetime of the participant.

The platform's job is to make it easy for anonymous participants to discover, join, create, and participate in conversations while minimizing unnecessary persistent identity.

---

## Document Status

This document is intentionally incomplete.

An unresolved decision is preferable to an undocumented assumption.

Before implementation begins, the open decisions should be reviewed and either:

1. resolved in this document,
2. moved into a technical/design decision document, or
3. explicitly deferred to a later version.

Changes to fundamental product principles should be documented rather than silently changing the implementation.
