# Luxloop

Luxloop is an experience-design and production studio mediating the intersection of the physical and digital worlds.


## Development

### Setup
* If you don't already have `node.js`, get it from this [link](https://nodejs.org/en/download/) or with homebrew: `brew install node`
* Install gulp: `npm install --g gulp-cli`
* Clone this repo, and from the root directory run `npm install` to download and install all the dev-dependencies. 
* Once that is finished, run `npm run build` to compile the static site.

### Working Locally
In separate terminal sessions: 
* run `npm run local` to serve the site on [localhost](http://localhost:8000)
* run `gulp watch` to listen for changes to the source files and build on save

Make changes in `/source` - The `/docs` directory is the compiled static site. `/docs/assets/` will be saved and commited to this repo. Anything else in `/docs` can and will get overwritten by the build scripts. 

## To-Do
* [x] Create styles for Max Width
* [ ] Create styles for mobile
* [ ] Footer styles and new icons
* [ ] Project Crawl
* [ ] Fixed images in project crawl