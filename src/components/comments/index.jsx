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
    isAdmin: React.PropTypes.bool.isRequired,
  }),
  sendComment: React.PropTypes.func.isRequired,
  deleteComment: React.PropTypes.func.isRequired,
};

export default class CommentsComponent extends React.Component {
  renderLoading() {
    return (
    <section className='comments'>
      <h3>Loading comments...</h3>
    </section>);
  }

  renderComments() {
    return (
    <section className='comments'>
      <CommentList
        comments={this.props.comments}
        settings={this.props.settings}
        deleteComment={this.props.deleteComment} />

      <CommentForm
        comment={this.props.comment}
        settings={this.props.settings}
        sendComment={this.props.sendComment} />
    </section>);
  }

  render() {
    return this.props.isLoading
      ? this.renderLoading()
      : this.renderComments();
  }
}

if (ENV.isDebug) {
  CommentsComponent.propTypes = propTypes;
}
