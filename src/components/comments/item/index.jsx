/* globals ENV */

import React from 'react';
import filterTime from 'common/filter-time';

import LinkText from '../link-text';

import CSSModules from 'react-css-modules';
import style from './style.scss';

const stateTypes = {
  isExpanded: React.PropTypes.bool.isRequired,
};

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
  isReplyForm: React.PropTypes.bool.isRequired,
  isNeedReplyLink: React.PropTypes.bool.isRequired,
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
    const comment = this.props.isReplyForm
      ? null : this.props.comment;
    this.props.onReplyToComment(comment);

    const node = this.refs.commentChildrenForm;
    node.style.maxHeight = comment ? '0px' : '1000px';

    // TODO: unset timeouts wen destroy
    setTimeout(() => {
      node.style.maxHeight = comment ? '1000px' : '0px';
    }, 10);

    setTimeout(() => {
      node.style.maxHeight = 'auto';
    }, 10);
  }

  onDeleteComment(e) {
    e.preventDefault();
    this.props.deleteComment(this.props.comment);
  }

  filterText(text, limit) {
    if (!this.state.isExpanded) {
      return text.slice(0, limit - text.length) + '...';
    }

    return text;
  }

  renderPic(email, userPic) {
    const href = `mailto:${email}`;
    const picStyle = userPic ? { backgroundImage: `url(${userPic})` } : null;

    return email ?
    <a styleName='comment-link--email' href={href}>
      <div styleName='comment-pic' style={picStyle} />
    </a> : <div styleName='comment-pic' style={picStyle} />;
  }

  renderComment(text) {
    return (
    <main styleName='comment-main'>
      <p ref='text' styleName='comment-text'>
        <LinkText styleName='comment-link--text' text={text} />
      </p>
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
    const text = this.props.isReplyForm
      ? 'Cancel reply' : 'Reply to comment';

    return (
    <a href={href}
      styleName='comment-link--reply'
      onClick={this.onReplyToComment}>
      {text}
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

  renderFooter(id) {
    return (
    <footer styleName='comment-footer'>
      {this.props.isAdmin && this.renderDeleteLink(id)}
      {this.props.isNeedReplyLink && this.renderReplyLink(id)}
    </footer>);
  }

  render() {
    const comment = this.props.comment;
    const time = filterTime(comment.createdAt);
    const text = this.filterText(comment.text, this.props.textExpendLimit);
    const isNeedReplyForm = this.state.isExpanded && this.props.isReplyForm;
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

      {this.state.isExpanded && this.renderFooter(id)}

      <div styleName='comment-children'>
        <div ref='commentChildrenForm' styleName='comment-children--form'>
          {isNeedReplyForm && this.props.CommentForm}
        </div>
        {this.props.children}
      </div>
    </li>);
  }
}

export default CSSModules(CommentItem, style);

if (ENV.isDebug) {
  CommentItem.stateTypes = stateTypes;
  CommentItem.propTypes = propTypes;
}
