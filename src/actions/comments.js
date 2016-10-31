import * as requester from 'common/requester';

export function getComments(tree, data) {
  const cursor = tree.select('comments');
  cursor.set('isLoading', true);

  requester.getComments(data)
  .then(response => {
    tree.set('comments', response);
    return response;
  }).catch((error) => {
    cursor.set('error', error);
    return error;
  }).then(() => cursor.set('isLoading', false));
}

export function sendComment(tree, comment) {
  const cursor = tree.select(['comments', 'comment']);
  cursor.set('isLoading', true);

  requester.sendComment(comment)
  .then((response) => {
    tree.select('comments').push(response);
    cursor.set('text', '');
  }).catch((/* error */) => {
    // need set error response
  }).then(() => cursor.set('isLoading', false));
}

export function deleteComment(tree, idComment) {
  const cursor = tree.select(['comments', 'comments']);

  requester.deleteComment(idComment)
  .then((/* response */) => {
    const comment = cursor.get().find(({ id }) => id === idComment);
    cursor.unset(comment);
  }).catch((/* error */) => {
    // need set error response
  }).then(() => cursor.set('isLoading', false));
}

export function setText(tree, text) {
  tree.select('comments').set('text', text);
}
