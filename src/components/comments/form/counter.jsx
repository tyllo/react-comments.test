import React from 'react';

import CSSModules from 'react-css-modules';
import style from './style.scss';

function Counter(props) {
  return (
  <div styleName='form-counter'>
    Characters: {props.count}
  </div>);
}

export default CSSModules(Counter, style);
