import {Component} from 'react';
import {getStore} from 'libs/micro-store';

export default class Container extends Component {
  constructor() {
    super();

    this.forceUpdate = this.forceUpdate.bind(this);
  }
  getState() {
    const store = getStore();
    return store.getState();
  }
  dispatch(action) {
    const store = getStore();
    store.dispatch(action);
  }
  componentDidMount() {
    const store = getStore();
    store.addChangeListener(this.forceUpdate);
  }
  componentWillUnmount() {
    const store = getStore();
    store.removeChangeListener(this.forceUpdate);
  }
}

Container.propTypes = {};
