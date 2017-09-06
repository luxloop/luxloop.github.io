---
name: Pigments
headline: Interactive Online Music Video
slug: pigments
coverImg: /assets/projects/pigments/cover.jpg
roles:
  - Interaction Design
  - Full-Stack Development
tech:
  - Node.js
  - Canvas
  - WebAudio API
  - Websockets
links:
  - address: http://nerdist.com/las-elohim-shares-pigments-website-allows-users-to-control-her-heartbeat-premiere/
    alt: LA’s Elohim Shares “PIGMENTS” Website
    text: Nerdist
  - address: https://www.chromeexperiments.com/experiment/pigments
    text: Chrome Experiments
  - address: http://www.purplesneakers.com.au/2016/04/watch-elohims-pigments/
    text: Purple Sneakers
  - address: http://pigeonsandplanes.com/news/2016/04/check-out-elohims-interactive-new-video-for-pigments
    text: Pigeons and Planes
  - address: http://whitestone.io/project/pigments/
    text: Whitestone
---

<p>
    <a href="http://icantmakeuloveu.com/" class="linkAnim bolder" target="_blank">icantmakeuloveu.com</a>
</p>

<p>
  LA-based artist Elohim approached Luxloop to create something more personal than a traditional music video.
</p>

<p>
  Pigments is a multi-screen interactive experience that requires the viewer to help keep the video “alive.” Viewers use their mobile device to connect and control the experience within a desktop video browser, and are asked to provide the heartbeat of the song. If they successfully keep the video alive, the are rewarded with a multifaceted video that responds and changes based on their tactile input and creates a shareable, unique heartbeat graphic.
</p>

<p>
  If the viewer stops tapping, the song slowly breaks apart and fades away, until the video ultimately dies.
</p>

<div class="fitVid">
  <iframe src="http://player.vimeo.com/video/198270687?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="720" height="405" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

<div class="quote">
    The project is an ingenious cross-platform concept that riffs on our growing obsession with virtual intelligence.
    <span class="source">Nerdist</span>
</div>

<h1>Building Connections</h1>
<p>
    Using node.js and socket.io, we built a custom websocket routing server to maintain pairs between a user’s phone and computer and handle their interaction input. Client-side WebGL and JavaScript dynamically build the experience for each user, react to their input, and generate the shareable graphics. The Webaudio API applies dynamic effects on multiple synced audio tracks to create the “dying” effect if users stop tapping out the heartbeat.
</p>

<img src="/assets/projects/pigments/download-1.png">
<img src="/assets/projects/pigments/pigments.gif">
<img src="/assets/projects/pigments/download-4.png">

<div class="quote">
    Focusing on this sense of emotion, the premise for Elohim’s interactive video clip for ‘Pigments’ is allowing you to control her heartbeat. It’s perhaps a little creepy, but also very beautiful.
    <span class="source">Pigeons and Planes</span>
</div>

<div class="fitVid">
  <iframe src="http://player.vimeo.com/video/198270480?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="720" height="405" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>
