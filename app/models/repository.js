import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  repositoryName: DS.attr('string'),
  additionalNames: DS.attr(),
  description: DS.attr('string'),
  repositoryUrl: DS.attr('string'),
  repositoryContacts: DS.attr(),
  subjects: DS.attr(),
  types: DS.attr(),
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