/* globals ENV */

import React from 'react';

import CommentForm from './form';
import CommentList from './list';

import './style.scss';

const stateTypes = {
  replyComment: React.PropTypes.object,
};

const propTypes = {
  userId: React.PropTypes.number,
  comment: React.PropTypes.object,
  comments: React.PropTypes.array,
  settings: React.PropTypes.shape({
    textLimit: React.PropTypes.number.isRequired,
    textExpendLimit: React.PropTypes.number.isRequired,
    isAdmin: React.PropTypes.bool.isRequired,
    maxLevel: React.PropTypes.number.isRequired,
  }),
  sendComment: React.PropTypes.func.isRequired,
  deleteComment: React.PropTypes.func.isRequired,
};

const EMPTY_OBJ = Object.freeze({});

export default class CommentsComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      replyComment: null,
    };
    this.onSendComment = this.onSendComment.bind(this);
    this.onReplyToComment = this.onReplyToComment.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.comment.isLoading) {
      this.setState({
        replyComment: null,
      });
    }
  }

  getLevel(replyComment = EMPTY_OBJ, maxLevel = Number.MAX_SAFE_INTEGER) {
    const { level } = replyComment;

    if (level !== undefined) {
      return level + 1 < maxLevel ? level + 1 : maxLevel - 1;
    }

    return 0;
  }

  onSendComment(comment) {
    const replyComment = this.state.replyComment || EMPTY_OBJ;
    const maxLevel = this.props.settings.maxLevel;
    const newComment = Object.assign({}, comment, {
      userId: this.props.userId,
      parentId: replyComment.id,
      level: this.getLevel(replyComment, maxLevel),
    });
    this.props.sendComment(newComment, this.state.replyComment);
  }

  onReplyToComment(comment) {
    this.setState({
      replyComment: comment,
    });
  }

  renderLoading() {
    return (
    <section className='comments'>
      <h3>Loading comments...</h3>
    </section>);
  }

  renderCommentForm(params = {}) {
    return <CommentForm
      {...params}
      comment={this.props.comment}
      settings={this.props.settings}
      sendComment={this.onSendComment} />;
  }

  renderComments() {
    const replyComment = this.state.replyComment;
    const commentForm = this.renderCommentForm(replyComment);

    return (
    <section className='comments'>
      <CommentList
        comments={this.props.comments}
        settings={this.props.settings}
        replyComment={replyComment || EMPTY_OBJ}
        CommentForm={replyComment && commentForm}
        onReplyToComment={this.onReplyToComment}
        deleteComment={this.props.deleteComment} />

      {!replyComment && commentForm}

    </section>);
  }

  render() {
    return this.props.isLoading
      ? this.renderLoading()
      : this.renderComments();
  }
}

if (ENV.isDebug) {
  CommentsComponent.stateTypes = stateTypes;
  CommentsComponent.propTypes = propTypes;
}
