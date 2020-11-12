const path = require('path');
const resolve = file => path.resolve(__dirname, file)
const express = require('express');
const compression = require('compression')
const { createBundleRenderer } = require('vue-server-renderer');
// const vueServerRenderer = require('vue-server-renderer');

const template = require('fs').readFileSync(
  path.join(__dirname, './index.html'),
  'utf-8',
);

const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const server = express();
let renderer
if (process.env.NODE_ENV === 'development') {
  const setupDevServer = require('./config/setup-dev-server');

  setupDevServer(server,path.join(__dirname, 'index.html'), (bundle, options) => {

      renderer = createBundleRenderer(bundle, Object.assign(options, {
        // for component caching
        // cache: LRU({
        //     max: 1000,
        //     maxAge: 1000 * 60 * 15
        // }),
        // this is only needed when vue-server-renderer is npm-linked
        basedir: resolve('./dist'),
        // recommended for performance
        runInNewContext: false
    }))

      // renderer = createRenderer(serverBundle);
  });
} else {
  renderer = createBundleRenderer(serverBundle, {
    // this property means that the bundle code will run in the same global context with the server process
    runInNewContext: false,
    template,
    clientManifest,
    // inject: false,
  });
}

const serve = (path, cache) => express.static(resolve(path), {
  // maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  maxAge: 1000 * 60 * 60 * 24 * 30
})
// in production should be better to serve static with nginx
server.use(compression({ threshold: 0 }))
server.use('/dist', express.static(path.join(__dirname, './dist')))
server.use('/public', express.static(path.join(__dirname, './public')))
server.use('/robots.txt', express.static(path.join(__dirname, './public/robots.txt')))

server.get('*', (req, res) => {
  const context = { url: req.url };

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (+err.message === 404) {
        res.status(404).end('Page not found');
      } else {
        console.log(err);
        res.status(500).end('Internal Server Error');
      }
    }

    res.end(html);
  });
});

server.listen(process.env.PORT || 3000, () => {
});