/* globals ENV */

import React from 'react';

const propTypes = {
  name: React.PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'TestName',
};

export default class HelloWorld extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

if (ENV.isDebug) {
  HelloWorld.propTypes = propTypes;
  HelloWorld.defaultProps = defaultProps;
}
