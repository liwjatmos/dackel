import Ember from 'ember';
import { inject as service } from '@ember/service';
import LoadingSliderMixin from '../mixins/loading-slider';

export default Ember.Route.extend(LoadingSliderMixin, {
  intl: service(),

  beforeModel() {
    // if you lazily load translations, here is also where you would load them via `intl.addTranslations`
    this.get('intl').setLocale(['en-us']);
  }
});