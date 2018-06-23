import Ember from 'ember';
import { inject as service } from '@ember/service';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

const subjects = [
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
  subjects,
  selectedSubject: null,
  subject: null,
  query: null,
  sort: null,
  open: true,
  certified: true,
  pid: true,
  disciplinary: true,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('query', this.get('model').get('otherParams.query'));
    this.set('sort', this.get('model').get('otherParams.sort'));
    this.set('subject', this.get('model').get('otherParams.subject'));
    this.set('selectedSubject', subjects.findBy('id', this.get('subject')));
  },

  search() {
    let params = Object.assign(this.get('model').get('otherParams'), { subject: this.get('subject'), query: this.get('query'), open: this.get('open'), certified: this.get('certified'), pid: this.get('pid'), disciplinary: this.get('disciplinary'), sort: this.get('sort'), page: null, perPage: null });

    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    this.get('router').transitionTo('index', { queryParams: params });
  },

  actions: {
    doSubject(subject) {
      this.set('selectedSubject', subject);
      this.set('subject', subject.id);
      this.search();
    },
    doSearch(query) {
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
    doDisciplinary(disciplinary) {
      this.set('disciplinary', disciplinary);
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
