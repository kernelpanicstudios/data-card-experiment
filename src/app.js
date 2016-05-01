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
      {route: 'card/:id', name: 'data-card', moduleId: 'data-card/data-card', title: 'Data Card'}
    ]);

    this.router = router;
  }

  search() {
    console.log(this.searchQuery);
  }
}
