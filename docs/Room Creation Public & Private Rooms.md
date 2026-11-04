# Room Creation: Public & Private Rooms

*Rough draft based on the room discussion sketch. Not final, meant to be tightened up later.*

## Overview

When a user creates a room, they pick one of two types: **public** or **private**. Whoever creates the room is the **creator** and gets certain privileges over it. What those privileges look like depends on the room type.

## Flow

1. User hits **Create room**.
2. The creator is assigned certain privileges.
3. The room goes one of two ways:
   - **Public room**
   - **Private room**

## Public Room

A normal, open room.

- Anyone can join.
- Joining only needs user credentials (basic login, nothing extra).
- The creator can remove anyone from the room.

## Private Room

A restricted room, invite-style.

- The creator has the privilege of adding new members. Nobody joins on their own.
- The creator can remove any member they added.

## Quick Comparison

|  | Public Room | Private Room |
| --- | --- | --- |
| Who can join | Anyone | Only people the creator adds |
| What's needed to join | User credentials | Being added by the creator |
| Who adds members | Nobody, open join | Creator |
| Who can remove members | Creator (anyone) | Creator (any added member) |

## Open Questions

Things the sketch doesn't pin down yet:

- What exactly are the "certain privileges" the creator gets? (Rename, delete room, change type, transfer ownership?)
- Can a public room be switched to private later, or the other way around?
- Can the creator hand over the role, or what happens if the creator leaves or is removed?
- Do removed users get blocked from rejoining a public room, or can they just join again?
- Can members of a private room invite others, or is it strictly the creator?
