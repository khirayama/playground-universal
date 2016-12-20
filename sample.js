// Single source of truth 1つのソースを真とする
// State is read-only stateは読み取り専用
// Mutations are written as pure functions 変更は副作用のない関数で行われる

// action creatorからは1アクションしか発行しない
// action内に複数のリソースを展開するのはあり
// containerはstoreの購読を行う、もしくはactionを渡すもの
// read-onlyであれば、どこからでもstateの参照は可能
// storeにdispatchを生やす。dispatch-actionはstoreへの変更しかしないから
// routerを受け取るのはConnector
// storeを受け取るのはContainer

// routes
const routes = [{
  path: '/',
  initialize: initializeHomePage,
  component: <HomePageContainer />,
  head: {title: 'Home'},
}, {
  path: '/dashboard',
  initialize: initializeDashboradPage,
  component: <DashboardPageContainer />,
  head: {title: 'Dashboard'},
}, {
}];

// actions
function initializeHomePage({params, data}) {
  const dispatch = data.store.dispatch;

  return new Promise((resolve) => {
    Resource.fetch().then(() => {
      dispatch({type: 'INITIALIZE_HOME_PAGE'});
      resolve();
    });
  });
}

function initializeDashboradPage({params, data}) {
  return new Promise((resolve) => {
    Resource.fetch().then(() => {
      dispatch({type: 'INITIALIZE_DASHBOARD_PAGE'});
      resolve();
    });
  });
}

// server
app.get('/*', (req, res) => {
  const router = new Router(routes);
  const store = new Store({
    authenticated: true,
    lang: 'en',
  });

  router.initialize(req.path, {store}).then(() => {
    const head = renderToString(state.meta);
    const content = renderToString(
      <Connector router={router} path={state.pathname}/>
    );

    res.send(layout(
      head,
      content,
    ));
  });
});

// client
window.addEventListener('DOMContentLoaded', () => {
  const router = new Router(routes);
  const store = new Store(window.state);

  render(
    <Connector router={router} path={state.pathname}/>,
    document.querySelector('.application')
  );
});

// component
class HomePage extends Container {
  render() {
    const state = this.props.store.getState();

    return <div><h1>Home</h1></div>;
  }
}

class DashboardPage extends Container {
  render() {
    const state = this.props.store.getState();

    return <div><h1>Dashboard</h1></div>;
  }
}

// libs
class Connector extends Component {
  constructor() {
    this.state = {
      pathname: ''
    };

    this.changeLocation = this._changeLocation.bind(this);
  }
  _changeLocation(pathname, wait = true) {
    if (wait) {
      this.props.router.initialize(pathname).then(() => {
        this.setState(pathname);
      });
    } else {
      this.props.router.initialize(pathname);
      this.setState(pathname);
    }
  }
  render() {
    const component = this.props.router.getComponent(this.props.path);
    return component;
  }
}
