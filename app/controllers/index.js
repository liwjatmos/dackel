import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'subject', 'open', 'pid', 'sort'],
  query: '',
  subject: '',
  open: '',
  pid: '',
  sort: 'name'
});
