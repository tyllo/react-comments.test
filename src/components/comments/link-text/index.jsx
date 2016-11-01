/* globals ENV */

import React from 'react';

const stateTypes = {
};

const propTypes = {
  text: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
};

const URL_REGEXP = /(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?/g;
const HTTP_REGEXP = /^https?:\/\//;
const PLASEHOLDER = `ANCHOR-LINK-${ new Date().getTime()}`;

export default class LinkText extends React.Component {
  parseText(text) {
    const links = Object.create(null);

    return text.replace(URL_REGEXP, (...args) => {
      const match = args[0];
      const key = args[args.length - 2];
      links[match] = this.renderTextLink(match, 'link-' + key);
      return PLASEHOLDER + match + PLASEHOLDER;
    }).split(PLASEHOLDER).map((item, key) => {
      return links[item] || this.renderText(item, 'text-' + key);
    }).filter(item => item) || text;
  }

  parseHref(link) {
    return HTTP_REGEXP.test(link) ? link : 'http://' + link;
  }

  renderText(text, key) {
    return text ? <span key={key}>{text}</span> : null;
  }

  renderTextLink(link, key) {
    return (
    <a key={key}
      href={this.parseHref(link)}
      className={this.props.className}>
      {link.toLowerCase()}
    </a>);
  }

  shouldComponentUpdate(newProps) {
    return newProps.text !== this.props.text;
  }

  render() {
    const text = this.parseText(this.props.text);
    return <span>{text}</span>;
  }
}

if (ENV.isDebug) {
  LinkText.stateTypes = stateTypes;
  LinkText.propTypes = propTypes;
}
