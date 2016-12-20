import React from 'react';
import ReactDOM from 'react-dom';

import i18n from 'libs/micro-i18n';
import Router from 'libs/micro-router';
import {createStore} from 'libs/micro-store';
import Connector from 'libs/connector';

import routes from 'config/routes';

import reducer from 'reducers';

window.addEventListener('DOMContentLoaded', () => {
  i18n.setLocale(window.state.lang);

  const router = new Router(routes);

  createStore(window.state, reducer);

  ReactDOM.render(
    <Connector
      router={router}
      path={location.pathname}
      />,
    document.querySelector('.application')
  );
});
