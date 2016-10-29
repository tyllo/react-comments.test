/* globals ENV */

import React from 'react';

import CSSModules from 'react-css-modules';
import style from './style.scss';

const stateTypes = {
};

const propTypes = {
};

// const defaultState = {
// };

class CommentList extends React.Component {
  render() {
    return (
    <ul styleName='comment-list'>
    </ul>);
  }
}

export default CSSModules(CommentList, style);

if (ENV.isDebug) {
  CommentList.stateTypes = stateTypes;
  CommentList.propTypes = propTypes;
}
