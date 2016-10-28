/* globals ENV */

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './style.scss';

const propTypes = {
  name: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
};

const defaultProps = {
  name: '',
};

const placeholder = 'Set your name';
const isActive = 'is-active';

class InputName extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const className = this.props.name.length && isActive;

    return <input
      type='text'
      styleName='input-name'
      className={className}
      onChange={this.onChange}
      defaultValue={this.props.name}
      placeholder={placeholder}
    />;
  }
}

export default CSSModules(InputName, styles);

if (ENV.isDebug) {
  InputName.propTypes = propTypes;
  InputName.defaultProps = defaultProps;
}
