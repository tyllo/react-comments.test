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
    cursor.set('error', error);
    return error;
  }).then(() => cursor.set('isLoading', false));
}

export function sendComment(tree, data) {
  const cursor = tree.select(MODEL_NAME);
  cursor.set(['comment', 'isLoading'], true);

  requester.sendComment(data)
  .then((response) => {
    return cursor.push(['comments'], response);
  }).catch((error) => {
    cursor.set(['comment', 'error'], error);
  }).then(() => cursor.set(['comment', 'isLoading'], false));
}

export function deleteComment(tree, id) {
  const cursor = tree.select([MODEL_NAME, 'comments']);

  requester.deleteComment(id)
  .then((/* response */) => {
    const comment = cursor.get().find((el) => el.id === id);
    cursor.unset(comment);
  }).catch((error) => {
    cursor.set('error', error);
  }).then(() => cursor.set('isLoading', false));
}
