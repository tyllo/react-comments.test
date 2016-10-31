/* globals ENV */

import React from 'react';

import CommentForm from './form';
import CommentList from './list';

import './style.scss';

const stateTypes = {
  editableComment: React.PropTypes.object,
};

const propTypes = {
  userId: React.PropTypes.number,
  comment: React.PropTypes.object,
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
  constructor(props, context) {
    super(props, context);
    this.state = {
      editableComment: null,
    };
    this.onSendComment = this.onSendComment.bind(this);
    this.onReplyToComment = this.onReplyToComment.bind(this);
  }

  onSendComment(comment) {
    const editableComment = this.state.editableComment;
    const newComment = Object.assign({}, comment, {
      userId: this.props.userId,
      parentId: editableComment.userId,
      level: editableComment.level + 1,
    });
    this.props.sendComment(newComment);
  }

  onReplyToComment(comment) {
    this.setState({
      editableComment: comment,
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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.comment.isLoading) {
      this.setState({
        editableComment: null,
      });
    }
  }

  renderComments() {
    const editableComment = this.state.editableComment;
    const commentForm = this.renderCommentForm(editableComment);

    return (
    <section className='comments'>
      <CommentList
        comments={this.props.comments}
        settings={this.props.settings}
        CommentForm={editableComment && commentForm}
        onReplyToComment={this.onReplyToComment}
        deleteComment={this.props.deleteComment} />

      {!editableComment && commentForm}

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
