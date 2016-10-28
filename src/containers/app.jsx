/* globals ENV */

import React from 'react';
import { branch } from 'baobab-react/higher-order';
import PropTypes from 'baobab-react/prop-types';

import HelloWorld from 'components/hello-world';
import InputName from 'components/input-name';
import 'styles/main.scss';

import * as actions from 'actions';

const propTypes = {
  HelloWorld: React.PropTypes.string,
};

const contextTypes = {
  tree: PropTypes.baobab,
};

const branchToHelloWorld = branch({
  helloWorld: ['helloWorld'],
});

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  onChange(name) {
    this.props.dispatch(actions.setName, name);
  }

  render() {
    return (<div>
      <HelloWorld {...this.props.helloWorld} />
      <InputName {...this.props.helloWorld} onChange={this.onChange} />
    </div>);
  }
}

export default branchToHelloWorld(App);

if (ENV.isDebug) {
  App.propTypes = propTypes;
  App.contextTypes = contextTypes;
}
