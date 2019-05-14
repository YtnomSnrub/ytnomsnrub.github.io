---
title: "Haiku Log"
---

# Making a Haiku Log

HaikuBot can be set up to log all Haikus to a single channel, called a Haiku Log. HaikuBot will post each haiku that it finds in the Haiku Log, in addition to the normal haiku that's sent after a message.

To set up a Haiku Log, first type `!haiku log`, and then type a `#` followed by the name of the channel to log haikus to. If the Haiku Log was set, you will receive a message in both the channel that you sent the message from, and the new Haiku Log channel.

For example: to set the Haiku Log channel to a channel named `my-haiku-log`, the command would be `!haiku log #my-haiku-log`.

> To set the Haiku Log, the user sending the command must have Discord's "Manage Channels" permission in the new Haiku Log channel.

## Removing a Haiku Log

To clear an existing Haiku Log, just type `!haiku log` (without any channel), and HaikuBot will stop logging haikus for your server.

## Only Sending Messages to the Haiku Log

If you want messages to show up in the Haiku Log, but not in other channels, you can change HaikuBot's permissions in those channels/categories so that it doesn't have the 'Send Messages' permission, but still has the 'Read Messages' permission.

> For information on how to change channel and category permissions, see [this guide](./restricting-haikubot). Just remember to leave the 'Read Messages' checkbox on if you still want messages in the Haiku Log.

## How does it Work?

Discord uses IDs for servers and channels. An ID is a unique number assigned to each server and channel when it is created. When you setup a Haiku Log, HaikuBot stores the ID of both your server and the Haiku Log channel. This means that no identifying information about your server is stored.