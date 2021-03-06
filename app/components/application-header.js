import Ember from 'ember';
import ENV from 'dackel/config/environment';
import fetch from 'fetch';

export default Ember.Component.extend({
  default: false,
  type: null,
  title: null,
  home: '/',
  user: true,
  data: {},

  didInsertElement() {
    //this.set('type', );
    if (this.get('type') !== 'transparent') {
      this.set('title', Ember.String.htmlSafe(ENV.SITE_TITLE));
    }

    let url = ENV.CDN_URL + "/data/links.json";
    let self = this;
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      if (ENV.API_URL === "https://api.datacite.org") {
        data.header_links = data.production_links;
      } else {
        data.header_links = data.stage_links;
      }
      self.set('data', data);
    });
  }
});
