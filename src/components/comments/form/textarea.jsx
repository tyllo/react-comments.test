/* globals ENV */

import React from 'react';

import CSSModules from 'react-css-modules';
import style from './style.scss';

const propTypes = {
  text: React.PropTypes.string.isRequired,
  textLimit: React.PropTypes.number.isRequired,
  setText: React.PropTypes.func.isRequired,
  sendComment: React.PropTypes.func.isRequired,
};

const defaultProps = {
  textLimit: Number.MAX_VALUE,
};

class Textarea extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      this.props.sendComment(e);
    }
  }

  onChange(e) {
    const textarea = e.target;
    let text = textarea.value;

    if (text.length > this.props.textLimit) {
      // TODO: fix typo in center of text
      textarea.value = text = text.slice(0, this.props.textLimit - text.length);
    }

    this.autoResize(textarea);
    this.props.setText(text);
  }

  autoResize(textarea) {
    const offset = textarea.offsetHeight - textarea.clientHeight;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + offset + 'px';
  }

  render() {
    return (<textarea
      rows='3' name='comment'
      onChange={this.onChange}
      onKeyDown={this.onKeyDown}
      styleName='textarea-comment'
      value={this.props.text}
      placeholder='Placeholder text' />);
  }
}

export default CSSModules(Textarea, style);

Textarea.defaultProps = defaultProps;
if (ENV.isDebug) {
  Textarea.propTypes = propTypes;
}
