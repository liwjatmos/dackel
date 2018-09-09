import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['tag', 'query', 'open', 'certified', 'pid', 'sort', ],
  tag: '34',
  query: '',
  open: 'true',
  certified: 'false',
  pid: 'true',
  sort: 'name'
});
