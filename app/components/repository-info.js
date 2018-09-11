import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['alert-repository'],

  collapsed: true,
  notCollapsed: Ember.computed.not('collapsed'),

  actions: {
    toggle() {
      this.set('collapsed', !this.get('collapsed'));
    }
  }
});
