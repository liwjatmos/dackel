import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['subject', 'query', 'open', 'certified', 'pid', 'sort', ],
  subject: '34',
  query: '',
  open: 'true',
  certified: 'true',
  pid: 'true',
  sort: 'relevance'
});
