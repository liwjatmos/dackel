import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  repositoryName: DS.attr('string'),
  additionalNames: DS.attr(),
  description: DS.attr('string'),
  repositoryUrl: DS.attr('string'),
  repositoryContacts: DS.attr(),
  subjects: DS.attr(),
  keywords: DS.attr(),
  certificates: DS.attr(),
  dataAccesses: DS.attr(),
  dataUploads: DS.attr(),
  pidSystems: DS.attr(),
  providerTypes: DS.attr(),
  types: DS.attr(),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  created: DS.attr('date'),
  updated: DS.attr('date'),

  badgeUrl: Ember.computed('id', function() {
    return 'https://www.re3data.org/public/badges/s/light/' + this.get('id') + '.svg'
  }),
  additionalName: Ember.computed('additionalNames', function() {
    if (this.get('additionalNames')) {
      return this.get('additionalNames').get("firstObject");
    } else {
      return null;
    }
  })
});