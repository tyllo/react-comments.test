/* globals ENV */

import React from 'react';

import CommentItem from './item';

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
  deleteComment: React.PropTypes.func.isRequired,
};

class CommentList extends React.Component {
  renderList(comments = []) {
    return (
    <ul styleName='comment-list'>
      {comments.map(this.renderItem.bind(this))}
    </ul>);
  }

  renderItem(comment) {
    return <CommentItem
      {...comment}
      {...this.props.settings}
      deleteComment={this.props.deleteComment}
      key={comment.id} />;
  }

  renderEmpty() {
    return (
    <div styleName='commets-empty'>
      There are no comments yet
    </div>);
  }

  render() {
    const comments = this.props.comments;
    return comments.length ? this.renderList(comments) : this.renderEmpty();
  }
}

export default CSSModules(CommentList, style);

if (ENV.isDebug) {
  CommentList.stateTypes = stateTypes;
  CommentList.propTypes = propTypes;
}
