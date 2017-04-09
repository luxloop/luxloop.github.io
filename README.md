# Luxloop

Luxloop is an experience-design and production studio mediating the intersection of the physical and digital worlds.

![](http://luxloop.com/assets/img/luxScreenshot.png)

---

## Development

### Setup
* If you don't already have `node.js`, get it from this [link](https://nodejs.org/en/download/) or with homebrew: `brew install node`
* Install gulp: `npm install --g gulp-cli`
* Clone this repo, make sure you've checked out the **dev** branch, and from the root directory run `npm install` to download and install all the dev-dependencies. 
* Once that is finished, run `npm run build` to compile the static site.

### Working Locally
In separate terminal sessions: 
* `gulp watch` to listen for changes to the source files and build on save
* `npm run local` to serve the site on [localhost](http://localhost:8000) while testing

Make changes in `/source` - The `/docs` directory is the compiled static site. `/docs/assets/` will be saved and commited to this repo. Anything else in `/docs` can and will get overwritten by the build scripts. 

If you have push-access to this repo, run `npm run publish` to publish changes to the live site - this will [push](http://ivaylogetov.com/pushit) the contents of `/docs` into the **master** branch. Otherwise send a PR.

---

## To-Do
* [ ] Remove '.html' from all slugs and update localserver.py script
* [ ] Add template helpers for inline images and video
* [ ] Check and adjust image sizes in projects page
* [x] corner logo transitions (fade out)
* [ ] fade cover elements on load
* [ ] remake shadow buttons without `position:aboslute` text so that they scale better
    * [ ] style project title box with :before and :after instead of nested divs?
    * [ ] Also look at bottom-to-top writing-mode for button/block divs?
* [ ] menu click expand animation
* [ ] scale parallax on small windows
* [ ] Add [flexbug fixes](https://github.com/luisrudge/postcss-flexbugs-fixes)
* [ ] fade parallax images in to avoid jump on load
* [ ] tweak meta tag (remove `width` param?)
* [ ] update to newest Modernizr
* [ ] extend menu up to account for overscroll
* [ ] IE <9 fallbacks for animations
* [ ] Project Crawl
* [ ] `position:fixed` images in project crawl
