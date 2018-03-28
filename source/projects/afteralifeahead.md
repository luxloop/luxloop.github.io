---
name: After ALife Ahead
slug: afteralifeahead
headline: Real-Time Responsive Mobile Augmented Reality
previewImg: /assets/projects/afteralifeahead/phar1.png
aspectRatio: 3-4
priority: 2
coverVid:
  vid: /assets/projects/afteralifeahead/phar.mp4
  poster: /assets/projects/afteralifeahead/pharVidcover.png
roles:
  - Augmented Reality Design + Development
  - Custom iOS+Android Application
  - Content Server System
tech:
  - iOS & Android App
  - Custom Beacon Location Tracking 
  - Real-time AR Server
links:
  - address: https://www.artsy.net/article/artsy-editorial-pierre-huyghes-latest-project-biotech-lab-scene-sci-fi-film
    text: Artsy
  - address: http://www.artnews.com/2017/06/26/constant-displacement-pierre-huyghe-on-his-work-at-skulptur-projekte-munster-2017/
    text: Art News
  - address: http://theartnewspaper.com/reports/pierre-huyghe-creates-sci-fi-landscape-in-m-nster/
    text: The Art Newspaper
---

<p class="italic justLeft">
    Pierre Huyghe - After ALife Ahead - 2017<br>
    Ice rink concrete floor; Sand, clay, phreatic water; Bacteria, algea, bee, chimera peacock; Aquarium, black switchable glass, conus textile; Incubator, human cancer cells; Genetic algorithm; Augemented reality; Automated ceiling structure; Rain; Ammoniac; Logic game.
</p>

<p>
    Luxloop was approached to work with artist Pierre Huyghe on After ALife Ahead, the time-based bio-technical system he created for Skulptur Projkete Munster, an arts event that occurs every 10 years in Munster, Germany.
</p>

<p>
    Huyghe’s work often explores the complex interactions between interdependent lifeforms and systems, including living cell cultures, animals, unicellular organisms and technology. For After ALife Ahead, he was interested in adding Augmented Reality as a virtual living element to the system. Imagining virtual entities living and interacting within the space, Huyghe needed an app that would allow visitors to peek into the virtual realm at any given moment.
</p>

<img src="/assets/projects/afteralifeahead/phar360.png" class="caption captionDark captionRight captionOut" data-caption="The Ice Rink location before Huyghe's intervention">

<h1>Creating a Virtual Living System</h1>

<p>
  Any living system has a set of basic rules that interact to determine how organisms live, procreate and die. Luxloop worked with Huyghe to develop a living algorithm for the AR that responded to realtime on-site data from the rink such as the temperature, animal movement, and precipitation. The rule-set controlled the AR creatures’ movement, colonization, death rates, and birthrates, allowing the system to live autonomously and be influenced by conditions in the environment.
</p>

<img src="/assets/projects/afteralifeahead/phar4.png" class="caption captionLight captionRight captionIn" data-caption="Photo: Pierre Huyghe">

<h1>A Virtual World that Exists Without You</h1>

<p>
  We built a server-based system that allowed users’ devices to sync to this autonomous world so that even at capacity of 200+ viewers, all visitors would see the same augmented system and animations in real time, bringing to life the illusion that the AR app is a viewport into the augmented living world.
</p>

<h1>Markerless Tracking</h1>

<p>
    There were a number of factors both conceptually and logistically that made markerless tracking a requirement of the project. Conceptually it was very important to Huyghe to resit altering the space solely to facilitate the AR by adding distracting markers or additional trackable elements. Additionally, the natural materials used would erode and change over time, limiting our ability to use features of the space itself as a reliable tracking marker.
</p>

<p>
    Traditional Augmented Reality systems are designed to track a small area such as a tabletop or room, or use visual markers to position virtual content in real space. Huyghe was interested in the Augmented reality inhabiting the entire space above his monumental work (roughly  130ft x 200ft), which stretched the limits of the existing AR tracking algorithms available to date. We developed a custom algorithm for moving the viewers virtual point of view within the site using their mobile device’s internal sensors and bluetooth beacons, allowing viewers to look into the system no matter their location in the space.
</p>

<img src="/assets/projects/afteralifeahead/phar1.png" class="caption captionLight captionRight captionIn" data-caption="Photo: Ola Rindal">

<h1>Tech for Me, Tech for You: The Designing Future Artists’ Pallette</h1>

<p>    
    Pierre Huyghe has a history of working with new technologies, but this was his first time exploring Augmented Reality. Especially working at this monumental scale, working with any new medium called for rapid iteration, experimentation, and adjustment. Furthermore, designs may look correct when simulated on a desktop editor, but feel completely different when viewed in context.
</p>

<p>
    It was important for us to develop a workflow that would not hold back Huyghe’s process due to purely technical limitations, so we created a series of artist “palette” apps that allowed us to work with Huyghe to make tweaks to the system in real time. This helped tremendously with our ability to update iterations of the AR content for the exhibition, as well as to tweak our lighting and textures systems on site and create the feeling that the virtual elements were actually occupying the real space instead of digitally pasted on top of the viewers camera.
</p>

<img src="/assets/projects/afteralifeahead/pharOverview.gif" class="caption captionDark captionRight captionOut" data-caption="System Server View">

