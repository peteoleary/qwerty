console.log('webpack.config.js')
module.exports = {
    // ...
    plugins: [  
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
        // It is absolutely essential that NODE_ENV is set to production
        // during a production build.
        // Otherwise React will be compiled in the very slow development mode.
        new webpack.DefinePlugin(env.stringified)
     ]
  };