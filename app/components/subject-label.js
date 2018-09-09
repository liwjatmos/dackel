import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  didInsertElement() {
    let text = this.get('tag.text');

    if (text.match(/^\d/)) {
      this.set('tag', text.substr(0, text.indexOf(" ")));
      this.set('text', text.substr(text.indexOf(" ") + 1));
    } else {
      this.set('tag', text);
      this.set('text', text);
    }
  }
});