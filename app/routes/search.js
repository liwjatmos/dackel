import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  perPage: 50,
  collapsed: false,
  
  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    return this.findPaged('repository', params);
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});