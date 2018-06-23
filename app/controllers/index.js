import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['subject', 'query', 'open', 'certified', 'pid', 'disciplinary', 'sort', ],
  subject: '34',
  query: '',
  open: 'true',
  certified: 'true',
  pid: 'true',
  disciplinary: 'true',
  sort: 'relevance'
});
