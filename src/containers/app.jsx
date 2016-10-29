import React from 'react';

import CommentsContainer from 'containers/comments';
import 'styles/main.scss';

export default class App extends React.Component {
  render() {
    return (
    <main>
      <CommentsContainer />
    </main>);
  }
}
