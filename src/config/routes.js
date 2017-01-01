import {dispatch} from '@khirayama/circuit';

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
  options: {
    data: {dispatch},
  },
}, {
  path: '/count',
  initialize: initializeCountPage,
  component: CountPageContainer,
  head: {title: 'Count'},
  options: {
    data: {dispatch},
  },
}];

export default routes;
