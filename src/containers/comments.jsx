/* globals ENV */

import React from 'react';

import { branch } from 'baobab-react/higher-order';
import PropTypes from 'baobab-react/prop-types';
import * as actions from 'actions';

import CommentsComponent from 'components/comments';

const propTypes = {
  comments: React.PropTypes.object.isRequired,
};

const contextTypes = {
  tree: PropTypes.baobab,
};

const branchTo = branch({
  comments: ['comments'],
});

class CommentsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.sendComment = this.sendComment.bind(this);
  }

  sendComment(data) {
    this.props.dispatch(actions.sendComment, data);
  }

  render() {
    return <CommentsComponent
      {...this.props.comments}
      sendComment={this.sendComment}/>;
  }
}

export default branchTo(CommentsContainer);

if (ENV.isDebug) {
  CommentsContainer.propTypes = propTypes;
  CommentsContainer.contextTypes = contextTypes;
}
