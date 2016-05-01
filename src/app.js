import $ from 'jquery';
import 'foundation-sites';

export class App {
  constructor() {
    this.title = 'Mission Data Card Tool';
  }

  attached() {
    $(this.navigation).foundation();
  }

  configureRouter(config, router) {
    config.title = 'Mission Data Card';
    config.map([
      {route: '', name: 'list', moduleId: 'data-card/list', nav: true, title: 'List'},
      {route: 'create', name: 'create-card', moduleId: 'data-card/create-card', title: 'Create'},
      {route: 'card/:id', name: 'view-card', moduleId: 'data-card/view-card', title: 'Data Card'}
    ]);

    this.router = router;
  }

  search() {
    console.log(this.searchQuery);
  }
}
