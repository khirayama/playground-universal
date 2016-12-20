import React, {PropTypes} from 'react';
import Container from 'libs/container';

import CountButton from 'components/count-button';

import {
  countUp,
  countDown,
} from 'action-creators/count-action-creators';

export default class DashboardPageContainer extends Container {
  constructor(props) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    this.props.changeLocation('/', {dispatch: this.dispatch});
  }
  render() {
    const state = this.getState();

    return (
      <section>
        <h1>Count Page</h1>
        <div onClick={this.handleClick}>to Home Page</div>
        <div>{state.total}</div>
        <CountButton onCountButtonClick={countUp(this.dispatch)}>Count up +1</CountButton>
        <CountButton onCountButtonClick={countDown(this.dispatch)}>Count down -1</CountButton>
      </section>
    );
  }
}

DashboardPageContainer.propTypes = {
  changeLocation: PropTypes.func.isRequired,
};
