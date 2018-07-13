import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',

  didInsertElement() {
    let subj = this.get('subject.text');

    this.set('category', subj.substr(0, subj.indexOf(" ")));
    this.set('text', subj.substr(subj.indexOf(" ") + 1));

    if (Ember.String.w("311 34 313 31301 31302 314 31401 315 31501 31502 316 31601 317 31701 31702 318 31801").includes(this.get('category'))) {
      this.set('isGeosciences', true); 
    } else {
      this.set('isGeosciences', false); 
    }
  }
});