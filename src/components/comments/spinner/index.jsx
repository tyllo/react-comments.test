import React from 'react';

import CSSModules from 'react-css-modules';
import style from './style.scss';

class Spinner extends React.Component {
  componentDidMount() {
    const loader = this.refs.loader;
    loader.style['line-height'] = loader.offsetHeight + 'px';
  }

  render() {
    return (
    <div ref='loader' styleName='loader'>
      <div styleName='spinner' />
    </div>
    );
  }
}

export default CSSModules(Spinner, style);
