import Ember from 'ember';

export default Ember.Component.extend({
  collapsed: true,
  notCollapsed: Ember.computed.not('collapsed'),

  actions: {
    toggle() {
      this.set('collapsed', !this.get('collapsed'));
    }
  }
});
