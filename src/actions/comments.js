import * as requester from 'common/requester';

export function sendComment(tree, data) {
  const cursor = tree.select('comments');
  cursor.set('isLoading', true);

  requester.sendComment(data)
  .then((/* response */) => {
    // need save comment by id from response
    cursor.set('text', '');
  }).catch((/* error */) => {
    // need set error response
  }).then(() => cursor.set('isLoading', false));
}

export function setText(tree, text) {
  tree.select('comments').set('text', text);
}
