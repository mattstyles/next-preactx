
# Next and Preact X

There are a couple of original lines of code in here, almost all is repurposed from [the official next-preact package](https://github.com/zeit/next-plugins/tree/master/packages/next-preact) and Jason Millers [next-preact-demo](https://github.com/developit/nextjs-preact-demo/blob/master/next.config.js).

This plugin exists for 3 reasons:

* The official plugin is currently incompatible with the latest version of Preact (this has been fixed up, but is currently unreleased)
* Adds support for Preact devtools
* Adds a flag to allow an easier way to use Preact **only** in production.

If you aren’t interested in running React in dev and Preact in production then consider using npm aliases as it is by far the easiest solution (see [Jason Millers demo](https://github.com/developit/nextjs-preact-demo/blob/master/package.json).)

## Getting Started

```sh
npm i -D next-preactx
npm i -S preact
```

Add the plugin to your `next.config.js`:

```js
const withPreact = require('next-preactx')({
  enabled: process.env.NODE_ENV === 'production'
})

module.exports = withPreact({
  // Config options
})
```

To ensure that Preact also renders on the server you have to make sure you are setting up Preact aliases _before_ starting your service.

This can either be done by creating a custom server for next to use and requiring `next-preactx/alias` within that entry script (as shown in the [official plugin](https://github.com/zeit/next-plugins/tree/master/packages/next-preact)) or creating a custom javascript script to start the process:

```js
// start.js

require('next-preactx/alias')()
require('next/dist/bin/next')
```

## License

MIT
