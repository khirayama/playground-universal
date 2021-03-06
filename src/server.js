import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'cookie-session';
import passport from 'passport';
import useragent from 'express-useragent';

import i18n from 'libs/micro-i18n';

import apiRouter from 'config/routers/api-router';
import authRouter from 'config/routers/auth-router';
import uiRouter from 'config/routers/ui-router';

import 'config/passport';

const app = express();

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  keys: [process.env.SECRET_KEY],
  name: '_handle_session',
}));
app.use((req, res, next) => {
  // priority: query - setting - cookie - default
  const locale = req.query.lang || req.cookies._handle_locale || req.locale || i18n.defaultLocale;

  req.getLocale = () => locale;
  res.cookie('_handle_locale', locale);
  next();
});

// passport
app.use(passport.initialize());
app.use(passport.session());

// router
app.use(apiRouter);
app.use(authRouter);
app.use(uiRouter);

app.listen(3000, () => {
  console.log('listening on port 3000');
});
