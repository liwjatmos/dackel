import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['help-block'],

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('repositoryUrl', this.get('model').get('repositoryUrl'));
    
    let contact = this.get('model').get('repositoryContacts')[0];
    this.set('contact', contact);
  }
});
