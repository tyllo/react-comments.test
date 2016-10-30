/* globals ENV */

import React from 'react';
import filterTime from 'common/filter-time';

import CommentForm from '../form';

import CSSModules from 'react-css-modules';
import style from './style.scss';

const propTypes = {
  id: React.PropTypes.number.isRequired,
  createdAt: React.PropTypes.number.isRequired,
  text: React.PropTypes.string.isRequired,
  displayName: React.PropTypes.string.isRequired,
  userPic: React.PropTypes.string,
  email: React.PropTypes.string,
  textExpendLimit: React.PropTypes.number.isRequired,
};

class CommentList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isExpanded: props.text.length < props.textExpendLimit,
      isReply: false,
    };
    this.onClick = this.onClick.bind(this);
    this.replyComment = this.replyComment.bind(this);
  }

  onClick() {
    const newState = Object.assign({}, this.state, {
      isExpanded: true,
    });
    const node = this.refs.text;
    node.style.maxHeight = node.offsetHeight + 'px';

    this.setState(newState, () => {
      setTimeout(() => {
        node.style.maxHeight = '1000px';
      }, 100);
    });
  }

  replyComment() {
    const newState = Object.assign({}, this.state, {
      isReply: true,
    });

    this.setState(newState);
  }

  filterText(text) {
    if (!this.state.isExpanded) {
      return text.slice(0, this.props.textExpendLimit - text.length) + '...';
    }

    return text;
  }

  renderPic(email) {
    const href = `mailto:${email}`;
    const userPic = { backgroundImage: `url(${this.props.userPic})` };

    return email ? (
    <a styleName='comment-email-link' href={href}>
      <div styleName='comment-pic' style={userPic} />
    </a>) : <div styleName='comment-pic' style={userPic} />;
  }

  renderComment(text) {
    return (
    <main styleName='comment-main'>
      <p ref='text' styleName='comment-text'>{text}</p>
      {!this.state.isExpanded && this.renderMoreButton()}
    </main>);
  }

  renderMoreButton() {
    return (
    <div
      styleName='comment-text-more'
      onClick={this.onClick}>
      READ MORE
    </div>);
  }

  renderReplyLink(id) {
    const href = '#reply-' + id;
    return (
    <a href={href}
      styleName='comment-reply-link'
      onClick={this.replyComment}>
      Reply to comment
    </a>);
  }

  render() {
    const time = filterTime(this.props.createdAt);
    const text = this.filterText(this.props.text);
    const isNeedReply = this.state.isExpanded && !this.state.isReply;
    const id = 'comment-' + this.props.id;

    return (
    <li styleName='comment-item' id={id}>

      <header styleName='comment-header'>
        {this.renderPic(this.props.email)}
        <div styleName='comment-name'>
          {this.props.displayName}
        </div>
        <time styleName='comment-time'>{time} ago</time>
      </header>

      {this.renderComment(text)}

      <footer styleName='comment-footer'>
        {isNeedReply && this.renderReplyLink(id)}
        {this.state.isReply && <CommentForm />}
      </footer>
    </li>);
  }
}

export default CSSModules(CommentList, style);

if (ENV.isDebug) {
  CommentList.propTypes = propTypes;
}
