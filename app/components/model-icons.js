import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['pull-right'],
  certified: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('open', this.get('model').get('dataAccesses').findBy('type', 'open'));
    this.set('doi', this.get('model').get('pidSystems').findBy('text', 'DOI'));
    this.set('urn', this.get('model').get('pidSystems').findBy('text', 'URN'));
    this.set('ark', this.get('model').get('pidSystems').findBy('text', 'ARK'));
    this.set('hdl', this.get('model').get('pidSystems').findBy('text', 'hdl'));
    this.set('certified', this.get('model').get('certificates').length > 0);
  }
});
