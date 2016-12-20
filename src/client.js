import React from 'react';
import ReactDOM from 'react-dom';

import i18n from 'libs/micro-i18n';
import Router from 'libs/micro-router';
import Store from 'libs/micro-store';
import Connector from 'libs/connector';

import routes from 'config/routes';

window.addEventListener('DOMContentLoaded', () => {
  i18n.setLocale(window.state.lang);

  const router = new Router(routes);
  const store = new Store(window.state);

  ReactDOM.render(
    <Connector
      router={router}
      path={location.pathname}
    />,
    document.querySelector('.application')
  );
});
