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
};

class CommentList extends React.Component {
  findСhildren(comments = [], userId, index) {
    return comments.filter((comment, i) => {
      return i > index && comment.parentId === userId;
    });
  }

  renderList(comments) {
    return comments ? (
    <ul styleName='comment-list'>
      {comments.map(this.renderItem.bind(this))}
    </ul>) : null;
  }

  renderItem(comment, i, comments) {
    !comment.userId && console.log('comment', comment, i);

    const children = comment.childrenCount
      && this.findСhildren(comments, comment.userId, i);

    return (
    <CommentItem
      {...this.props.settings}
      key={comment.id}
      comment={comment}
      CommentForm={this.props.CommentForm}
      onReplyToComment={this.props.onReplyToComment}
      deleteComment={this.props.deleteComment}>

    {this.renderList(children)}

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
