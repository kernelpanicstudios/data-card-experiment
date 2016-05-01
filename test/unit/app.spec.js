import './setup';
import {App} from '../../src/app';

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut;
  var mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Mission Data Card');
  });

  it('should have a list route', () => {
    expect(sut.router.routes).toContain({route: '', name: 'list', moduleId: 'data-card/list', nav: true, title: 'List'});
  });

  it('should have a card route', () => {
    expect(sut.router.routes).toContain({route: 'card/:id', name: 'data-card', moduleId: 'data-card/data-card', title: 'Data Card'});
  });
});
