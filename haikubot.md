# HaikuBot

<div class="button-row">
    <div class="haiku-count">
        <p class="haiku-counter loading">.</p>
        <p>Haikus found</p>
    </div>
    <div class="server-count">
        <p class="server-counter loading">.</p>
        <p>Servers</p>
    </div>
</div>

HaikuBot is a friend-shaped Discord bot that detects accidental (or intentional) messages in your Discord server that can be turned into a 5-7-5 haiku, and then shows the message in haiku format. It uses a combination algorithms and a syllable dictionary to try to be accurate (although it still sometimes makes mistakes).

<img class="discord-bot-widget" src="https://discordbots.org/api/widget/372175794895585280.svg?usernamecolor=FAFAFA&topcolor=222222&middlecolor=2e2f34&datacolor=643f00&labelcolor=643f00&highlightcolor=FFCC4D" />

HaikuBot has a few fun tricks and secrets, but mostly stays out of the way unless you interact with it or it detects a haiku. If you have any questions, problems, and suggestions for the bot, or you just want to say hi, come join the [Official HaikuBot Discord Server](https://discord.gg/Cm5v93M).

<div class="button-row">
    <a class="button button-discord" href="https://discordbots.org/bot/372175794895585280">
        View on Discord Bot List
    </a>
    <a class="button" href="https://discordapp.com/oauth2/authorize?client_id=372175794895585280&scope=bot&permissions=19520">
        Invite to Server
    </a>
</div>

## Restricting HaikuBot

Sometimes, there are channels where you don't want HaikuBot. Luckily, Discord allows you to restrict where users (and bots) can and can't speak.

- First, right-click the channel you want HaikuBot to ignore, and select 'Edit Channel'.

![Edit Channel](./assets/img/edit_channel.png)

- Under the Roles/Members section of the 'Permissions' panel, add a new role for HaikuBot.

![HaikuBot Channel Role](./assets/img/haiku_channel.png)

- Remove the 'Read Messages' and 'Send Messages' permissions for HaikuBot for this channel.

![Channel Role Settings](./assets/img/channel_settings.png)

That's it! HaikuBot should now ignore any messages in this channel. Make sure that HaikuBot and any of its roles don't have the 'Administrator' permission, as this overrides any channel-specific permissions. Bleep bloop!

<div class="button-row">
    <a class="button button-haiku" href="https://discord.gg/Cm5v93M">
        Join Official Server
    </a>
    <a class="button" href="/">
        Back to Homepage
    </a>
</div>