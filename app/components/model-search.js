import Ember from 'ember';
import { inject as service } from '@ember/service';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Component.extend(RouteMixin, {
  router: service(),

  hasInput: Ember.computed.notEmpty('query'),
  helpText: null,
  query: null,
  sort: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('query', this.get('model').get('otherParams.query'));
    this.set('sort', this.get('model').get('otherParams.sort'));
  },

  search() {
    let params = Object.assign(this.get('model').get('otherParams'), { query: this.get('query'), sort: this.get('sort'), page: null, perPage: null });

    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    this.get('router').transitionTo('index', { queryParams: params });
  },

  actions: {
    doSearch(query) {
      this.set('query', query);
      this.search();
    },
    clear() {
      this.set('query', '');
      this.search();
    },
    selectMetadata(metadata) {
      this.showMetadata(metadata);
    },
    sort(sort) {
      this.set('sort', sort);
      this.search();
    }
  },

  didInsertElement() {
    this.set('modelName', 'Repository');
    this.set('formats', { relevance: 'Sort by Relevance', name: 'Sort by Name', '-created': 'Sort by Date Registered' });
  }
});
