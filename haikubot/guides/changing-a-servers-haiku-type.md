---
title: "Changing a Server's Haiku Type"
---

# Changing a Server's Haiku Type

You can change the way that Haikus are formatted in your server. This can be done with the `!haiku type` command. There are a number of options for haiku types for your server.

> To change the haiku type, the user sending the command must have the "Manage Server" permission.

## Normal

```command
!haiku type default
```

The way that haikus are formatted are formatted by default. This option has a gap between lines.

![Normal Haiku Format](/haikubot/img/haiku-type-normal.png)

## Small

```command
!haiku type small
```

A smaller format for haikus. This option has no gap between lines.

![Normal Haiku Format](/haikubot/img/haiku-type-small.png)

## Tiny

```command
!haiku type tiny
```

A super compact format for haikus, with a '\|' used to separate lines.

![Normal Haiku Format](/haikubot/img/haiku-type-tiny.png)

## React

```command
!haiku type react
```

Don't repost haikus at all, and instead just add a reaction to the message. This can work well with a [Haiku Log](./making-a-haiku-log) if you don't like HaikuBot interrupting your conversations.

## None

```command
!haiku type none
```

Don't acknowledge haikus in the channel they were sent from, and only post them to the Haiku Log.
