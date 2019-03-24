import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import * as Sentry from '@sentry/browser';

Sentry.init({ 
  dsn: config.SENTRY_DSN,
  release: config.npm_package_name + ':' + config.npm_package_version,
  integrations: [new Sentry.Integrations.Ember()],
  beforeSend(event) {
    // Check if it is an exception, if so, show the report dialog
    if (event.exception) {
      Sentry.showReportDialog();
    }
    return event;
  }
});

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
