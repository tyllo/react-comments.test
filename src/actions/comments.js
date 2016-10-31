/* globals ENV */
/* eslint no-console: 0 */

import * as requester from 'common/requester';

const MODEL_NAME = 'comments';

export function getComments(tree, data) {
  const cursor = tree.select(MODEL_NAME);
  cursor.set('isLoading', true);

  requester.getComments(data)
  .then(response => {
    tree.set(MODEL_NAME, response);
    return response;
  }).catch((error) => {
    ENV.isDebug && console.log('getComments error:', error);
    cursor.set('error', error);
    return error;
  }).then(() => cursor.set('isLoading', false));
}

export function sendComment(tree, newComment, replyComment) {
  const cursor = tree.select(MODEL_NAME);
  cursor.set(['comment', 'isLoading'], true);

  requester.sendComment(newComment)
  .then((response) => {
    const comments = cursor.select(['comments']);
    comments.push(response);

    if (replyComment) {
      const index = comments.get().indexOf(replyComment);
      comments.merge([index], {
        childrenCount: replyComment.childrenCount + 1,
      });
    }

    return response;
  }).catch((error) => {
    ENV.isDebug && console.log('sendComment error:', error);
    cursor.set(['comment', 'error'], error);
  }).then(() => cursor.set(['comment', 'isLoading'], false));
}

export function deleteComment(tree, comment) {
  const cursor = tree.select(MODEL_NAME);
  cursor.set('isLoading', false);

  requester.deleteComment(comment)
  .then((/* response */) => {
    // TODO: delete recursively
    const commentsCursor = cursor.select('comments');
    const comments = commentsCursor.get().filter(item => {
      return item.parentId === comment.userId;
    }) || [];

    comments.concat(comment).forEach(item => {
      commentsCursor.unset(item);
    });
  }).catch((error) => {
    ENV.isDebug && console.log('deleteComment error:', error);
    cursor.set('error', error);
  }).then(() => cursor.set('isLoading', false));
}
