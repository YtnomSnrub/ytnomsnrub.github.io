---
wide: true
---

# Stats

{% include stats/haikubot-stats.html extra_stats=true %}

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

<table class="stat-table stat-table-large">
    <tbody>
        <tr>
            <td>Messages this week</td>
            <td class="stat-counter loading" data-api="messagecountweek" data-loop-time="4000">.</td>
            <td>Messages last week</td>
            <td class="stat-counter loading" data-api="messagecountlastweek" data-loop-time="300000">.</td>
        </tr>
        <tr>
            <td>Messages per day</td>
            <td class="stat-counter loading stat-counter-messages-day">.</td>
            <td>Messages per hour</td>
            <td class="stat-counter loading stat-counter-messages-hour">.</td>
        </tr>
        <tr>
            <td>Messages per minute</td>
            <td class="stat-counter loading stat-counter-messages-minute">.</td>
            <td>Messages per second</td>
            <td class="stat-counter loading stat-counter-messages-second">.</td>
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

## Live Stats

<canvas class="stat-graph stat-graph-live" data-color="#ffcc4d" data-endpoint="haikuCount" data-label="Haikus" data-tensionless="true" width="1200" height="600"></canvas>
<canvas class="stat-graph stat-graph-live" data-color="#4da0ff" data-endpoint="messageCount" data-label="Messages" width="1200" height="600"></canvas>

## Daily Stats

<canvas class="stat-graph stat-graph-day" data-color="#ffcc4d" data-column="haikuCount" data-column-time="dayStartTime" data-label="Haikus" width="1200" height="600"></canvas>
<canvas class="stat-graph stat-graph-day" data-color="#2e2f34" data-column="serverCount" data-column-time="dayStartTime" data-label="Servers" width="1200" height="600"></canvas>
<canvas class="stat-graph stat-graph-day" data-color="#ff774d" data-column="uniqueUserCount" data-column-time="dayStartTime" data-label="Unique Users" width="1200" height="600"></canvas>

## Hourly Stats

<p>All hourly stats are measured and displayed in UTC.</p>
<p class="time time-utc">...</p>

<canvas class="stat-graph stat-graph-hour" data-color="#ffcc4d" data-column="haikuCount" data-column-time="hourStartTime" data-label="Haikus" width="1200" height="600"></canvas>
<canvas class="stat-graph stat-graph-hour" data-color="#4da0ff" data-column="messagesCount" data-column-time="hourStartTime" data-label="Messages" width="1200" height="600"></canvas>
