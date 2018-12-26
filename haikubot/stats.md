# Stats

<div class="button-row">
    <div class="stat-count haiku-count">
        <p class="stat-counter haiku-counter loading" data-api="haikucount" data-loop-time="10000">.</p>
        <p>Haikus found</p>
    </div>
    <div class="stat-count server-count">
        <p class="stat-counter server-counter loading" data-api="servercount" data-loop-time="300000">.</p>
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

<table class="stat-table stat-table-single">
    <tbody>
        <tr>
            <td>Messages parsed</td>
            <td class="stat-counter loading" data-api="messagecount" data-loop-time="4000">.</td>
        </tr>
    </tbody>
</table>

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
        <tr>
            <td>Haikus per minute</td>
            <td class="stat-counter loading stat-counter-haikus-minute">.</td>
            <td>Servers this week</td>
            <td class="stat-counter loading" data-api="servercountweek" data-change="true"  data-loop-time="300000">.</td>
        </tr>
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
        <tr>
            <td>Servers this week</td>
            <td class="stat-counter loading" data-api="servercountweek" data-change="true" data-loop-time="300000">.</td>
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
        <tr>
            <td>Haikus per minute</td>
            <td class="stat-counter loading stat-counter-haikus-minute">.</td>
        </tr>
    </tbody>
</table>

<table class="stat-table stat-table-single">
    <tbody>
        <tr>
            <td>Servers with a Haiku Log</td>
            <td class="stat-counter loading" data-api="haikulogcount" data-loop-time="30000">.</td>
        </tr>
    </tbody>
</table>

## Daily Stats

<p>All stats are measured and displayed in UTC.</p>
<p class="time time-utc">...</p>

<canvas id="HaikuChart" class="stat-graph" width="1200" height="600"></canvas>
<canvas id="ServerChart" class="stat-graph" width="1200" height="600"></canvas>

## Hourly Stats

<canvas id="HaikuHourChart" class="stat-graph" width="1200" height="600"></canvas>
<canvas id="MessageHourChart" class="stat-graph" width="1200" height="600"></canvas>
