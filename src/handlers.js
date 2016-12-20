import React from 'react';
import ReactDOM from 'react-dom/server';

import i18n from 'libs/micro-i18n';
import Router from 'libs/micro-router';
import Store from 'libs/micro-store';
import Connector from 'libs/connector';

import routes from 'config/routes';

import passport from 'passport';

import {getUI} from 'helpers';

export function applicationHandler(req, res) {
  i18n.setLocale(req.getLocale());

  const router = new Router(routes);
  const store = new Store({
    lang: req.getLocale(),
    ui: getUI(req.useragent),
    authenticated: req.isAuthenticated(),
  });

  router.initialize(req.path).then(() => {
    const state = store.getState();
    const head = router.getHead(req.path);
    const content = ReactDOM.renderToString(
      <Connector
        router={router}
        path={req.path}
      />
    );

    res.send(`
      <!DOCTYPE html>
      <html lang="${state.lang}">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
          <title>${head.title}</title>

          <!-- standalone for android-->
          <link rel="manifest" href="manifest.json">
          <!-- standalone for ios-->
          <meta name="apple-mobile-web-app-capable" content="yes">

          <link rel="stylesheet" href="/index.css">
          <script src="/bundle.js" defer></script>
        </head>
        <body>
          <section class="application">${content}</section>
        </body>
        <script>var state = ${JSON.stringify(store.getState())}</script>
      </html>
    `);
  });
}

export function authHandler(req, res) {
  const provider = req.params.provider;

  let scope = null;

  switch (provider) {
    case 'instagram':
      scope = ['basic', 'public_content', 'follower_list', 'comments', 'relationships', 'likes'];
      break;
    default:
      break;
  }

  const authenticate = passport.authenticate(provider, {scope});

  authenticate(req, res);
}

export function authCallbackHandler(req, res) {
  const provider = req.params.provider;
  const authenticate = passport.authenticate(provider, {
    successRedirect: '/',
    failureRedirect: '/',
  });

  authenticate(req, res);
}

export function logoutHandler(req, res) {
  req.logout();
  res.redirect('/');
}
