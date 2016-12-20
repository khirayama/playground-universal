import React from 'react';

class HomePageContainer extends React.Component {
  render() {
    return (
      <section>
        <h1>Home</h1>
        <div onClick={() => {
          this.props.changeLocation('/dashboard');
        }}>Dashboard</div>
      </section>
    );
  }
}

class DashboardPageContainer extends React.Component {
  render() {
    return (
      <section>
        <h1>Dashboard</h1>
        <div onClick={() => {
          this.props.changeLocation('/');
        }}>Home</div>
      </section>
    );
  }
}

function initializeHomePage() {
  return new Promise((resolve) => {
    resolve();
  });
}

function initializeDashboradPage() {
  return new Promise((resolve) => {
    resolve();
  });
}

const routes = [{
  path: '/',
  initialize: initializeHomePage,
  component: HomePageContainer,
  head: {title: 'Home'},
}, {
  path: '/dashboard',
  initialize: initializeDashboradPage,
  component: DashboardPageContainer,
  head: {title: 'Dashboard'},
}];

export default routes;
