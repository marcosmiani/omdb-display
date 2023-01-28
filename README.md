# omdb-display
Created with originally with CodeSandbox, moved to GitHub.

Built with:
- ViteJS (bundler)
- React.js (DOM renderer)
- Typescript (JS Flavour)
- Chakra UI (React UI component library)

The main idea was create a simple yet versatile set up to address the main requested features. It started with Material UI / Joy UI but it became quite evident that it generates a lot of more than required and it was either go full material or choose something diferent, so I ended using Chakra UI for its simplicity and modularity.

Layouts and parts were build with a flex ideology (but of course some areas are special)

Some improvements were left out (from the top of my head):
- Unit or (preferably) integration tests for search: the set up time it was not worth it.
- Revamp fonts and spacing to improve the UX feel.
- Cache on fetching: re-fetching data that probably didnt get updated is a bit wasteful, even if the pages are the info is relatively small.
- Variable and component naming: Media was the simpliest definition for _something that can be a movie or a TV show_ but given a bit more of time im sure that there is a better word for it.

## Base set up

Go to the `.env` file and set up an API token for example `6c3a3d45` (this one is not a valid token! but It should!)

### Install dependencies
`yarn install`

### Run it!
For local environment
`yarn dev`

### Build and use
For build and later deploy somewhere
`yarn build` and `yarn preview` (runs a server using the dist folder generated from the build)
