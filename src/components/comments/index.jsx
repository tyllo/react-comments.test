import React from 'react';

import CommentsForm from './form';
import CommentList from './list';

import CSSModules from 'react-css-modules';
import style from './style.scss';

class CommentsComponent extends React.Component {
  render() {
    return (
    <div styleName='comments'>
      <CommentsForm {...this.props} />
      <CommentList {...this.props} />
    </div>);
  }
}

export default CSSModules(CommentsComponent, style);
