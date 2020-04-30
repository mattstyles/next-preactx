
const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/

/**
 * There are a couple of original lines here, everything else is from these:
 * https://github.com/zeit/next-plugins/tree/master/packages/next-preact
 * https://github.com/developit/nextjs-preact-demo/blob/master/next.config.js
 */

/**
 * `enabled` flag allows supporting react in dev, preact in prod.
 * if enabled and in dev mode, then preact will load debug/devtools.
 */

/**
 * options.dev could be used to ascertain a dev build, but lets leave the
 * enablement up to the consumer rather than restricting to prod builds only.
 */
const withPreactX = ({
  enabled = true
} = {}) => (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (config, options) {
      if (enabled) {
        // Chunk split config
        const splitChunks = config.optimization && config.optimization.splitChunks
        if (splitChunks) {
          const cacheGroups = splitChunks.cacheGroups
          if (cacheGroups.framework) {
            cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
              test: preactModules
            })
            cacheGroups.commons.name = 'framework'
          } else {
            cacheGroups.preact = {
              name: 'commons',
              chunks: 'all',
              test: preactModules
            }
          }
        }

        // Preact aliases
        config.resolve.alias = Object.assign({}, config.resolve.alias, {
          react: 'preact/compat',
          'react-dom': 'preact/compat'
        })

        // Server externals
        if (options.isServer) {
          config.externals = ['react', 'react-dom', ...config.externals]
        }

        // Preact devtools, clamp these to dev build only, despite the
        // enabled flag.
        if (options.dev && !options.isServer) {
          const entry = config.entry
          config.entry = () => entry().then(entries => {
            entries['main.js'] = ['preact/debug'].concat(entries['main.js'] || [])
            return entries
          })
        }
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}

module.exports = withPreactX
