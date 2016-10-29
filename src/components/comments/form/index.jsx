/* globals ENV */

import React from 'react';

import Spinner from '../spinner';
import Counter from './counter';
import SendButton from './send-button';
import Textarea from './textarea';

import CSSModules from 'react-css-modules';
import style from './style.scss';

console.log(style);

const stateTypes = {
  text: React.PropTypes.string.isRequired,
};

const propTypes = {
  textLimit: React.PropTypes.number.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  sendComment: React.PropTypes.func.isRequired,
};

const defaultState = {
  text: '',
};

class CommentsForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = defaultState;
    this.setText = this.setText.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }

  sendComment(e) {
    e.preventDefault();
    this.props.sendComment({
      // monkey from baobab
      text: this.state.text,
    });
  }

  setText(text) {
    this.setState({ text });
  }

  render() {
    const text = this.state.text;
    const leftCount = this.props.textLimit - text.length;
    const isDisabled = !text.length || this.props.isLoading;
    const buttonText = this.props.isLoading ? 'SENDING...' : 'SEND';

    return (
    <form name='comments' action=''
      onSubmit={this.sendComment}
      styleName='comments-container'>

      <header styleName='textarea-header'>
        Leave Comment:
      </header>

      <main styleName='textarea-container'>
        <Textarea {...this.props} text={text}
          setText={this.setText}
          sendComment={this.sendComment} />
        {this.props.isLoading && <Spinner />}
      </main>

      <footer>
        <Counter count={leftCount} />
        <SendButton isDisabled={isDisabled} text={buttonText} />
      </footer>

    </form>);
  }
}

export default CSSModules(CommentsForm, style);

if (ENV.isDebug) {
  CommentsForm.stateTypes = stateTypes;
  CommentsForm.propTypes = propTypes;
}
