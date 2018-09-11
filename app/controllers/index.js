import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'subject', 'open', 'pid', 'sort', 'page', 'perPage'],
  query: '',
  subject: null,
  open: 'false',
  pid: 'false',
  sort: 'name'
});
