/* globals ENV */

import React from 'react';

import CommentItem from './item';

import CSSModules from 'react-css-modules';
import style from './style.scss';

const stateTypes = {
};

const propTypes = {
  comments: React.PropTypes.array.isRequired,
  textExpendLimit: React.PropTypes.number.isRequired,
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
      textExpendLimit={this.props.textExpendLimit}
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
