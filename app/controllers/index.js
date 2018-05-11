import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'sort', 'subject'],
  query: '',
  sort: 'relevance',
  subject: '34'
});
