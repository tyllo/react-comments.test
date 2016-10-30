import React from 'react';

import CSSModules from 'react-css-modules';
import style from './style.scss';

function SendButton(props) {
  return (
  <button
    type='submit'
    styleName='form-button'
    disabled={props.isDisabled}>
    {props.text}
  </button>);
}

export default CSSModules(SendButton, style);
