/* globals ENV */

import React from 'react';
import filterTime from 'common/filter-time';

import CSSModules from 'react-css-modules';
import style from './style.scss';

const propTypes = {
  comment: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    createdAt: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.string.isRequired,
    userPic: React.PropTypes.string,
    email: React.PropTypes.string,
  }),
  isAdmin: React.PropTypes.bool.isRequired,
  textExpendLimit: React.PropTypes.number.isRequired,
  deleteComment: React.PropTypes.func.isRequired,
  onReplyToComment: React.PropTypes.func.isRequired,
  children: React.PropTypes.element,
  CommentForm: React.PropTypes.element,
};

class CommentItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isExpanded: props.comment.text.length < props.textExpendLimit,
      isReply: false,
    };
    this.onMoreButton = this.onMoreButton.bind(this);
    this.onReplyToComment = this.onReplyToComment.bind(this);
    this.onDeleteComment = this.onDeleteComment.bind(this);
  }

  onMoreButton(e) {
    e.preventDefault();

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

  onReplyToComment(e) {
    e.preventDefault();

    const newState = Object.assign({}, this.state, {
      isReply: true,
    });

    this.setState(newState);
    this.props.onReplyToComment(this.props.comment);
  }

  onDeleteComment(e) {
    e.preventDefault();
    this.props.deleteComment(this.props.comment);
  }

  filterText(text) {
    if (!this.state.isExpanded) {
      return text.slice(0, this.props.textExpendLimit - text.length) + '...';
    }

    return text;
  }

  renderPic(email, userPic) {
    const href = `mailto:${email}`;
    const picStyle = userPic ? { backgroundImage: `url(${userPic})` } : null;

    return email ?
    <a styleName='comment-email-link' href={href}>
      <div styleName='comment-pic' style={picStyle} />
    </a> : <div styleName='comment-pic' style={picStyle} />;
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
    <div styleName='comment-text-more'
      onClick={this.onMoreButton}>
      READ MORE
    </div>);
  }

  renderReplyLink(id) {
    const href = '#reply-' + id;

    return (
    <a href={href}
      styleName='comment-link--reply'
      onClick={this.onReplyToComment}>
      Reply to comment
    </a>);
  }

  renderDeleteLink(id) {
    const href = '#delete-' + id;

    return (
    <a href={href}
      styleName='comment-link--delete'
      onClick={this.onDeleteComment}>
      Delete comment
    </a>);
  }

  render() {
    const comment = this.props.comment;
    const time = filterTime(comment.createdAt);
    const text = this.filterText(comment.text);
    const isNeedReply = this.state.isExpanded && !this.state.isReply;
    const isNeedDelete = this.state.isExpanded && this.props.isAdmin;
    const id = 'comment-' + comment.id;

    return (
    <li styleName='comment-item' id={id}>

      <header styleName='comment-header'>
        {this.renderPic(comment.email, comment.userPic)}
        <div styleName='comment-name'>
          {comment.displayName}
        </div>
        <time styleName='comment-time'>{time} ago</time>
      </header>

      {this.renderComment(text)}

      <footer styleName='comment-footer'>
        {isNeedDelete && this.renderDeleteLink(id)}
        {isNeedReply && this.renderReplyLink(id)}
        {this.state.isReply && this.props.CommentForm}
      </footer>

      <div styleName='comment-children'>{this.props.children}</div>
    </li>);
  }
}

export default CSSModules(CommentItem, style);

if (ENV.isDebug) {
  CommentItem.propTypes = propTypes;
}
