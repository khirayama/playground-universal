import HomePageContainer from 'containers/home-page-container';
import CountPageContainer from 'containers/count-page-container';

import {
  initializeHomePage,
  initializeCountPage,
} from 'action-creators/page-initialize-action-creators';

const routes = [{
  path: '/',
  initialize: initializeHomePage,
  component: HomePageContainer,
  head: {title: 'Home'},
}, {
  path: '/count',
  initialize: initializeCountPage,
  component: CountPageContainer,
  head: {title: 'Count'},
}];

export default routes;
