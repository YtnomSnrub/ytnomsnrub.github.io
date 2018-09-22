---
title: "Restriciting HaikuBot"
---

# Restricting HaikuBot

Sometimes, there are channels where you don't want HaikuBot. Luckily, Discord allows you to restrict where users (and bots) can and can't speak.

- First, right-click the channel you want HaikuBot to ignore, and select 'Edit Channel'.

![Edit Channel](/haikubot/img/edit_channel.png)

- Under the Roles/Members section of the 'Permissions' panel, add a new role for HaikuBot.

![HaikuBot Channel Role](/haikubot/img/haiku_channel.png)

- Remove the 'Read Messages' and 'Send Messages' permissions for HaikuBot for this channel.

![Channel Role Settings](/haikubot/img/channel_settings.png)

That's it! HaikuBot should now ignore any messages in this channel. Make sure that HaikuBot and any of its roles don't have the 'Administrator' permission, as this overrides any channel-specific permissions. Bleep bloop!