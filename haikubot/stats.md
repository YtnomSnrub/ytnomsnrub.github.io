---
wide: true
---

# Stats

{% include stats/haikubot-stats.html extra_stats=true %}

<table class="stat-table">
    <tbody>
        <tr>
            <td>
                <div class="stat-table-container">
                    <span>Messages parsed</span>
                    <span class="stat-counter loading" data-api="messagecount" data-loop-time="4000">.</span>
                </div>
            </td>
        </tr>
    </tbody>
</table>

<table class="stat-table">
    <tbody>
        <tr>
            <td>
                <div class="stat-table-container">
                    <span>Haiku to message ratio</span>
                    <span class="stat-counter loading stat-counter-messages-haiku">.</span>
                </div>
            </td>
        </tr>
    </tbody>
</table>

<table class="stat-table">
    <tbody>
        <tr>
            <td>
                <div class="stat-table-container">
                    <span>Haikus this week</span>
                    <span class="stat-counter loading" data-api="haikucountweek" data-loop-time="10000">.</span>
                </div>
            </td>
            <td>
                <div class="stat-table-container">
                    <span>Haikus last week</span>
                    <span class="stat-counter loading" data-api="haikucountlastweek" data-loop-time="300000">.</span>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="stat-table-container">
                    <span>Haikus per day</span>
                    <span class="stat-counter loading stat-counter-haikus-day">.</span>
                </div>
            </td>
            <td>
                <div class="stat-table-container">
                    <span>Haikus per hour</span>
                    <span class="stat-counter loading stat-counter-haikus-hour">.</span>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="stat-table-container">
                    <span>Haikus per minute</span>
                    <span class="stat-counter loading stat-counter-haikus-minute">.</span>
                </div>
            </td>
            <td>
                <div class="stat-table-container">
                    <span>Servers this week</span>
                    <span class="stat-counter loading" data-api="servercountweek" data-change="true" data-loop-time="300000">.</span>
                </div>
            </td>
        </tr>
    </tbody>
</table>

<table class="stat-table">
    <tbody>
        <tr>
            <td>
                <div class="stat-table-container">
                    <span>Messages this week</span>
                    <span class="stat-counter loading" data-api="messagecountweek" data-loop-time="4000">.</span>
                </div>
            </td>
            <td>
                <div class="stat-table-container">
                    <span>Messages last week</span>
                    <span class="stat-counter loading" data-api="messagecountlastweek" data-loop-time="300000">.</span>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="stat-table-container">
                    <span>Messages per day</span>
                    <span class="stat-counter loading stat-counter-messages-day">.</span>
                </div>
            </td>
            <td>
                <div class="stat-table-container">
                    <span>Messages per hour</span>
                    <span class="stat-counter loading stat-counter-messages-hour">.</span>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div class="stat-table-container">
                    <span>Messages per minute</span>
                    <span class="stat-counter loading stat-counter-messages-minute">.</span>
                </div>
            </td>
            <td>
                <div class="stat-table-container">
                    <span>Messages per second</span>
                    <span class="stat-counter loading stat-counter-messages-second">.</span>
                </div>
            </td>
        </tr>
    </tbody>
</table>

<table class="stat-table">
    <tbody>
        <tr>
            <td>
                <div class="stat-table-container">
                    <span>Servers with a Haiku Log</span>
                    <span class="stat-counter loading" data-api="haikulogcount" data-loop-time="30000">.</span>
                </div>
            </td>
        </tr>
    </tbody>
</table>

## Daily Stats

<canvas class="stat-graph stat-graph-day" data-color="#ffcc4d" data-column="haikuCount" data-column-time="dayStartTime" data-label="Haikus" width="1200" height="600"></canvas>
<canvas class="stat-graph stat-graph-day" data-color="#2e2f34" data-column="serverCount" data-column-time="dayStartTime" data-label="Servers" width="1200" height="600"></canvas>
<canvas class="stat-graph stat-graph-day" data-color="#ff774d" data-column="uniqueUserCount" data-column-time="dayStartTime" data-label="Unique Users" width="1200" height="600"></canvas>

## Hourly Stats

<p>All hourly stats are measured and displayed in UTC.</p>
<p class="time time-utc">...</p>

<canvas class="stat-graph stat-graph-hour" data-color="#ffcc4d" data-column="haikuCount" data-column-time="hourStartTime" data-label="Haikus" width="1200" height="600"></canvas>
<canvas class="stat-graph stat-graph-hour" data-color="#4da0ff" data-column="messagesCount" data-column-time="hourStartTime" data-label="Messages" width="1200" height="600"></canvas>

## Live Stats

<canvas class="stat-graph stat-graph-live" data-color="#ffcc4d" data-endpoint="haikuCount" data-label="Haikus" data-loop-time="10000" data-tensionless="true" width="1200" height="600"></canvas>
<canvas class="stat-graph stat-graph-live" data-color="#4da0ff" data-endpoint="messageCount" data-label="Messages" data-loop-time="10000" width="1200" height="600"></canvas>
