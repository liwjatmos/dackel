/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: true
    },

    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },

    minifyJS:  {
      enabled: false
    },

    babel: {
      sourceMaps: 'inline'
    },

    'ember-bootstrap': {
      'bootstrapVersion': 3,
      'importBootstrapFont': false,
      'importBootstrapCSS': false
    },

    inlineContent: {
      'site-title' : {
        content: (process.env.SITE_TITLE || "DataCite Repository Selector")
      },
      'cdn-url' : {
        content: (process.env.CDN_URL || "https://assets.datacite.org")
      }
    }
  });

  app.import('vendor/bootstrap/js/dropdown.js');
  app.import('vendor/bootstrap/js/tooltip.js');

  return app.toTree();
};
