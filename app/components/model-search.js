import Ember from 'ember';
import { inject as service } from '@ember/service';
import ENV from 'dackel/config/environment';
import fetch from 'fetch';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import customNotFoundTemplate from '../templates/search-templates/not-found';

const tags = [
  { id: "311", name: "Astronomy and Astrophysics" },
  { id: "34", name: "Geosciences (including Geography)" },
  { id: "313", name: "Atmospheric Science and Oceanography" },
  { id: "31301", name: "Atmospheric Science" },
  { id: "31302", name: "Oceanography" },
  { id: "314", name: "Geology and Palaeontology" },
  { id: "315", name: "Geophysics and Geodesy" },
  { id: "31501", name: "Geophysics" },
  { id: "31502", name: "Geodesy, Photogrammetry, Remote Sensing, Geoinformatics, Cartography" },
  { id: "316", name: "Geochemistry, Mineralogy and Crystallography" },
  { id: "317", name: "Geography" },
  { id: "31701", name: "Physical Geography" },
  { id: "31702", name: "Human Geography" },
  { id: "318", name: "Water Research" }
];

export default Ember.Component.extend(RouteMixin, {
  router: service(),

  hasInput: Ember.computed.notEmpty('query'),
  helpText: null,
  tags,
  selectedTag: null,
  tag: null,
  query: null,
  sort: null,
  open: true,
  certified: false,
  pid: true,
  collapsed: false,
  term : null,
  customNotFoundTemplate: customNotFoundTemplate,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('query', this.get('model').get('otherParams.query'));
    this.set('sort', this.get('model').get('otherParams.sort'));
    this.set('tag', this.get('model').get('otherParams.tag'));
    this.set('selectedTag', tags.findBy('id', this.get('tag')));
  },

  suggest(query, syncResults, asyncResults) {
    let url = ENV.API_URL + '/repositories/suggest?query=' + query;
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
    let params = Object.assign(this.get('model').get('otherParams'), { query: this.get('query'), open: this.get('open'), certified: this.get('certified'), pid: this.get('pid'), sort: this.get('sort'), page: null, perPage: null });

    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    this.get('router').transitionTo('index', { queryParams: params });
  },

  actions: {
    doTag(tag) {
      this.set('selectedTag', tag);
      if (tag) {
        this.set('tag', tag.id);
      } else {
        this.set('tag', '');
      }
      this.search();
    },
    doSearch(query) {
      if (query) {
        this.set('sort', 'relevance');
      } else if (this.get('sort') === 'relevance') {
        this.set('sort', null);
      }

      this.set('query', query);
      this.search();
    },
    doOpen(open) {
      this.set('open', open);
      this.search();
    },
    doCertified(certified) {
      this.set('certified', certified);
      this.search();
    },
    doPid(pid) {
      this.set('pid', pid);
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
    },
    toggle() {
      this.set('collapsed', !this.get('collapsed'));
    }
  },

  didInsertElement() {
    this.set('modelName', 'Repository');
    this.set('formats', { name: 'Sort by Name', relevance: 'Sort by Relevance', '-created': 'Sort by Date Registered' });
  }
});
