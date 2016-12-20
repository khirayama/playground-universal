import React, {PropTypes} from 'react';
import Container from 'libs/container';

export default class HomePageContainer extends Container {
  constructor(props) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    this.props.changeLocation('/count', {dispatch: this.dispatch});
  }
  render() {
    return (
      <section>
        <h1>Home Page</h1>
        <div onClick={this.handleClick}>to Count Page</div>
      </section>
    );
  }
}

HomePageContainer.propTypes = {
  changeLocation: PropTypes.func.isRequired,
};
