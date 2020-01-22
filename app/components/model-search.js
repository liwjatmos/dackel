import Ember from 'ember';
import { inject as service } from '@ember/service';
import ENV from 'dackel/config/environment';
import fetch from 'fetch';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import customNotFoundTemplate from '../templates/search-templates/not-found';

export default Ember.Component.extend(RouteMixin, {
  router: service(),
  store: service(),

  hasInput: Ember.computed.notEmpty('query'),
  helpText: null,
  filter: 'all',
  query: '',
  sort: null,
  subject: '',
  open: '',
  pid: '',
  certified: '',
  disabled: true,
  notDisabled: Ember.computed.not('disabled'),
  term : null,
  customNotFoundTemplate: customNotFoundTemplate,
  collapsed: true,
  results: false,
  notCollapsed: Ember.computed.not('collapsed'),

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('query', this.get('model').get('otherParams.query'));
    this.set('sort', this.get('model').get('otherParams.sort'));
    if(this.get('model').get('isFulfilled') == true){
      this.toggleProperty('isLoaded');
    }
  },

  suggest(query, syncResults, asyncResults) {
    let url = ENV.API_URL + '/re3data/suggest?query=' + query;
    fetch(url).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          asyncResults(data);
        });
      } else {
        Ember.Logger.assert(false, response)
      }
    }).catch(function(error) {
      Ember.Logger.assert(false, error)
    });
  },

  search() {
    this.get('store').unloadAll('re3data');
    let params = Object.assign(this.get('model').get('otherParams'), { query: this.get('query'), subject: this.get('subject'), open: this.get('open'), pid: this.get('pid'), certified: this.get('certified'), sort: this.get('sort') });
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "totalPages" };

    this.get('router').transitionTo('search', { queryParams: params });
  },

  actions: {
    doSearch(query) {
      if (query) {
        this.set('sort', 'relevance');
      } else if (this.get('sort') === 'relevance') {
        this.set('sort', null);
      }

      this.set('query', query);
      this.set('isLoaded', false);
      this.search();
    },
    doTerm(term) {
      this.set('sort', 'relevance');
      this.set('query', term);
      this.search();
    },
    toggle() {
      this.set('collapsed', !this.get('collapsed'));
    },
    change() {
      if (!this.get('disabled')) {
        this.set('subject', '34');
        this.set('open', true);
        this.set('pid', true);
        this.set('certified', true);
      }
      this.set('disabled', !this.get('disabled')); 
    },
    doSubject() {
      this.set('subject', '34');
      this.search();
    },
    doOpen(open) {
      this.set('open', open);
      this.search();
    },
    doPid(pid) {
      this.set('pid', pid);
      this.search();
    },
    doCertified(certified) {
      this.set('certified', certified);
      this.search();
    },
    clear() {
      this.set('query', '');
      this.search();
    },
    selectFilter(filter) {
      this.set('filter', filter);
      if (filter === 'agu-fair') {
        this.set('subject', '34');
        this.set('open', 'true');
        this.set('pid', 'true');
        this.set('certified', '');
      }
      else if (filter === 'fairs-fair') {
        this.set('subject', '');
        this.set('open', 'true');
        this.set('pid', 'true');
        this.set('certified', 'true');
      } 
      else {
        this.set('subject', '');
        this.set('open', '');
        this.set('pid', '');
        this.set('certified', '');
        this.set('collapsed', true);
      }
      this.search();
    },
    sort(sort) {
      this.set('sort', sort);
      this.search();
    }
  },

  didInsertElement() {
    this.set('modelName', 'Re3data');
    this.set('formats', { name: 'Sort by Name', relevance: 'Sort by Relevance', '-created': 'Sort by Date Registered' });
  }
});
