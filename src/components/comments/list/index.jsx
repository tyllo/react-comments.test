/* globals ENV */

import React from 'react';

import CommentItem from '../item';

import CSSModules from 'react-css-modules';
import style from './style.scss';

const stateTypes = {
};

const propTypes = {
  settings: React.PropTypes.shape({
    textExpendLimit: React.PropTypes.number.isRequired,
    isAdmin: React.PropTypes.bool.isRequired,
  }),
  comments: React.PropTypes.array.isRequired,
  onReplyToComment: React.PropTypes.func.isRequired,
  deleteComment: React.PropTypes.func.isRequired,
  CommentForm: React.PropTypes.element,
  replyComment: React.PropTypes.object.isRequired,
};

const EMPTY_ARR = Object.freeze([]);

class CommentList extends React.Component {
  findСhildren(comments = EMPTY_ARR, id) {
    return comments.filter((comment) => {
      return comment.parentId === id;
    });
  }

  renderList(originComments, comments = [], level = 0, id = null) {
    const commentItems = originComments.map((comment) => {
      const isHaveChildren = id !== null
        ? comment.parentId === id : comment.level === level;

      return isHaveChildren
        ? this.renderItem(originComments, comments, comment)
        : null;
    });

    return comments ? (
    <ul styleName='comment-list'>
      {commentItems}
    </ul>) : null;
  }

  renderItem(originComments, comments, comment) {
    const children = comment.childrenCount
      && this.findСhildren(originComments, comment.id) || null;

    const renderedChildren = children
      && this.renderList(originComments, children, comment.level + 1, comment.id);

    const isReply = this.props.replyComment
      && this.props.replyComment.id === comment.id;

    return (
    <CommentItem
      {...this.props.settings}
      key={comment.id}
      comment={comment}
      isReply={isReply}
      CommentForm={this.props.CommentForm}
      onReplyToComment={this.props.onReplyToComment}
      deleteComment={this.props.deleteComment}>

    {renderedChildren}

    </CommentItem>);
  }

  renderEmpty() {
    return (
    <div styleName='commet-list--empty'>
      There are no comments yet
    </div>);
  }

  render() {
    const comments = this.props.comments;
    return comments.length
      ? this.renderList(comments)
      : this.renderEmpty();
  }
}

export default CSSModules(CommentList, style);

if (ENV.isDebug) {
  CommentList.stateTypes = stateTypes;
  CommentList.propTypes = propTypes;
}
