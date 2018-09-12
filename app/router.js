import Ember from 'ember';
import config from './config/environment';
import GoogleAnalyticsRoute from 'ember-tracker/mixins/google-analytics-route';

const Router = Ember.Router.extend(GoogleAnalyticsRoute, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route("search");
  this.route("about");
  this.route("faq");

  //set up all of your known routes, and then...
  this.route("404", { path: "*path"});
});

export default Router;
