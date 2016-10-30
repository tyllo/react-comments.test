/* globals ENV */

import React from 'react';

import CommentForm from './form';
import CommentList from './list';

import './style.scss';

const propTypes = {
  comments: React.PropTypes.array,
  settings: React.PropTypes.shape({
    textLimit: React.PropTypes.number.isRequired,
    textExpendLimit: React.PropTypes.number.isRequired,
  }),
  sendComment: React.PropTypes.func.isRequired,
};

export default class CommentsComponent extends React.Component {
  renderLoading() {
    return (
    <section className='comments'>
      <h3>Loading comments...</h3>
    </section>);
  }

  renderComments() {
    const textExpendLimit = this.props.settings.textExpendLimit;
    const textLimit = this.props.settings.textLimit;

    return (
    <section className='comments'>
      <CommentList
        comments={this.props.comments}
        textExpendLimit={textExpendLimit} />

      <CommentForm
        textLimit={textLimit}
        isLoading={this.props.comment.isLoading}
        sendComment={this.props.sendComment} />
    </section>);
  }

  render() {
    return this.props.isLoading ? this.renderLoading() : this.renderComments();
  }
}

if (ENV.isDebug) {
  CommentsComponent.propTypes = propTypes;
}
