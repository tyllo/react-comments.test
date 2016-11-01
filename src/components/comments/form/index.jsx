/* globals ENV */

import React from 'react';

import Spinner from '../spinner';
import Counter from './counter';
import SendButton from './send-button';
import Textarea from './textarea';

import CSSModules from 'react-css-modules';
import style from './style.scss';

const stateTypes = {
  text: React.PropTypes.string.isRequired,
};

const propTypes = {
  comment: React.PropTypes.shape({
    isLoading: React.PropTypes.bool.isRequired,
  }),
  settings: React.PropTypes.shape({
    textLimit: React.PropTypes.number.isRequired,
  }),
  sendComment: React.PropTypes.func.isRequired,
};

const defaultState = {
  text: '',
};

class CommentForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = defaultState;
    this.setText = this.setText.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.comment.isLoading === false
      && this.props.comment.isLoading === true) {
      this.setState({ text: '' });
    }
  }

  sendComment(e) {
    e.preventDefault();
    this.props.sendComment({
      text: this.state.text,
    });
  }

  setText(text) {
    this.setState({ text });
  }

  render() {
    const text = this.state.text;
    const leftCount = this.props.settings.textLimit - text.length;
    const isDisabled = !text.length || this.props.comment.isLoading;
    const buttonText = this.props.comment.isLoading ? 'SENDING...' : 'SEND';

    return (
    <form name='comments' action=''
      onSubmit={this.sendComment}
      styleName='form-container'>

      <header styleName='textarea-header'>
        Leave Comment:
      </header>

      <main styleName='textarea-container'>
        <Textarea {...this.props} text={text}
          setText={this.setText}
          sendComment={this.sendComment} />
        {this.props.comment.isLoading && <Spinner />}
      </main>

      <footer>
        {this.props.settings.textLimit && <Counter count={leftCount} />}
        <SendButton isDisabled={isDisabled} text={buttonText} />
      </footer>

    </form>);
  }
}

export default CSSModules(CommentForm, style);

if (ENV.isDebug) {
  CommentForm.stateTypes = stateTypes;
  CommentForm.propTypes = propTypes;
}
