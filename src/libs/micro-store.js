/* global window */

import {EventEmitter} from 'events';

const EVENT_CHANGE = '__CHANGE_STORE';
const ACTION_DISPATCH = '__ACTION_DISPATCH';

export class MicroStore extends EventEmitter {
  constructor(state, reducer) {
    super();

    this.state = state || {};
    this._reducer = reducer || (state => {
      return state;
    });

    this.subscribe();
  }
  dispatch(action) {
    this.emit(ACTION_DISPATCH, action);
  }
  subscribe() {
    this.on(ACTION_DISPATCH, action => {
      this.state = this._reducer(this.state, action);
      if (typeof window === 'object') {
        console.log('%cAction:', 'color: #b71c1c; font-weight: bold;', action);
        console.log('%cState:', 'color: #0d47a1; font-weight: bold;', this.state);
      }
      this.dispatchChange();
    });
  }
  dispatchChange() {
    this.emit(EVENT_CHANGE);
  }
  addChangeListener(listener) {
    this.addListener(EVENT_CHANGE, listener);
  }
  removeChangeListener(listener) {
    this.removeListener(EVENT_CHANGE, listener);
  }
  getState() {
    return Object.assign({}, this.state);
  }
}

let store = null;

export function createStore(state, reducer) {
  if (store === null) {
    store = new MicroStore(state, reducer);
  }
}

export function getStore() {
  return store;
}

export function getState() {
  if (store !== null) {
    return store.getState();
  }
  return null;
}

export function dispatch(action) {
  return store.dispatch(action);
}
