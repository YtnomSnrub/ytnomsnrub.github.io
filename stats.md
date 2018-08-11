# Stats

<div class="button-row">
    <div class="stat-count haiku-count">
        <p class="stat-counter haiku-counter loading" data-api="haikucount" data-loop-time="10000">.</p>
        <p>Haikus found</p>
    </div>
    <div class="stat-count server-count">
        <p class="stat-counter server-counter loading" data-api="server_count" data-dbl="true" data-loop-time="300000">.</p>
        <p>Servers</p>
    </div>
</div>

<div class="button-row">
    <div class="stat-count heart-count">
        <p class="stat-counter heart-counter loading" data-api="heartcount" data-loop-time="10000">.</p>
        <p>Hearts given</p>
    </div>
    <div class="stat-count broken-heart-count">
        <p class="stat-counter broken-heart-counter loading" data-api="brokenheartcount" data-loop-time="10000">.</p>
        <p>Broken hearts</p>
    </div>
</div>

## Weekly Stats

<table class="stat-table stat-table-large">
    <tbody>
        <tr>
            <td>Haikus this week</td>
            <td class="stat-counter loading" data-api="haikucountweek" data-loop-time="10000">.</td>
            <td>Haikus last week</td>
            <td class="stat-counter loading" data-api="haikucountlastweek" data-loop-time="300000">.</td>
        </tr>
        <tr>
            <td>Haikus per day</td>
            <td class="stat-counter loading stat-counter-haikus-day">.</td>
            <td>Haikus per hour</td>
            <td class="stat-counter loading stat-counter-haikus-hour">.</td>
        </tr>
        <!--<tr>
            <td>Haikus per minute</td>
            <td class="stat-counter loading stat-counter-haikus-minute">.</td>
            <td>Haikus per second</td>
            <td class="stat-counter loading stat-counter-haikus-second">.</td>
        </tr>-->
    </tbody>
</table>

<table class="stat-table stat-table-small">
    <tbody>
        <tr>
            <td>Haikus this week</td>
            <td class="stat-counter loading" data-api="haikucountweek" data-loop-time="10000">.</td>
        </tr>
        <tr>
            <td>Haikus last week</td>
            <td class="stat-counter loading" data-api="haikucountlastweek" data-loop-time="300000">.</td>
        </tr>
    </tbody>
</table>

<table class="stat-table stat-table-small">
    <tbody>
        <tr>
            <td>Haikus per day</td>
            <td class="stat-counter loading stat-counter-haikus-day">.</td>
        </tr>
        <tr>
            <td>Haikus per hour</td>
            <td class="stat-counter loading stat-counter-haikus-hour">.</td>
        </tr>
    </tbody>
</table>

<div class="button-row">
    <a class="button" href="/">
        Back to Homepage
    </a>
    <a class="button button-haiku" href="/haikubot">
        Back to HaikuBot
    </a>
</div>