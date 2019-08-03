import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(RouteMixin, {
  perPage: 50,
  collapsed: false,

  model(params) {
    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "totalPages" };

    return this.findPaged('re3data', params);
  },

  actions: {
    queryParamsDidChange() {
      this.refresh();
    }
  }
});