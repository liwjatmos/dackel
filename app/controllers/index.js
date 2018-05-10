import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'sort'],
  query: null,
  sort: null
});
