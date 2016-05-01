export class App {
  configureRouter(config, router) {
    config.title = 'Mission Data Card';
    config.map([
      {route: '', name: 'list', moduleId: 'data-card/list', nav: true, title: 'List'},
      {route: 'card/:id', name: 'data-card', moduleId: 'data-card/data-card', title: 'Data Card'}
    ]);

    this.router = router;
  }
}
