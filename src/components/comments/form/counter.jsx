import React from 'react';

import CSSModules from 'react-css-modules';
import style from './style.scss';

function Counter(props) {
  return (
  <div styleName='comment-counter'>
    Characters: {props.count}
  </div>);
}

export default CSSModules(Counter, style);
