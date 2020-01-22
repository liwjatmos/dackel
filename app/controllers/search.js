import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query', 'subject', 'open', 'pid', 'certified','sort'],
  query: '',
  subject: '',
  open: '',
  pid: '',
  certified:'',
  sort: 'name'
});
