import React, {Component} from 'react';

export default class Connector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathname: props.path
    };

    this.changeLocation = this._changeLocation.bind(this);
  }
  componentDidMount() {
    window.addEventListener('popstate', () => {
      const pathname = location.pathname;
      const head = this.props.router.getHead(pathname);
      this._updateHead(head);
      this.setState({pathname});
    });
  }
  _updateHead(head) {
    if (head.title) {
      document.title = head.title;
    }
  }
  _changeLocation(pathname, wait = true) {
    if (history) {
      const head = this.props.router.getHead(pathname);
      this._updateHead(head);
      history.pushState(null, null, pathname);
    }
    if (wait) {
      this.props.router.initialize(pathname).then(() => {
        this.setState({pathname});
      });
    } else {
      this.props.router.initialize(pathname);
        this.setState({pathname});
    }
  }
  render() {
    const pathname = this.state.pathname;
    const component = this.props.router.getComponent(pathname);

    if (this.props.router.getComponent(pathname)) {
      const element = React.createElement(component,
        {
          changeLocation: this.changeLocation,
        }
      );
      return <div>{element}</div>;
    }
    return null;
  }
}
