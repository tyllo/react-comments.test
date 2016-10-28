export function setName(tree, name) {
  const cursor = tree.select('helloWorld');
  cursor.set('isLoading', true);

  setTimeout(setNameAsync, 1000, cursor, name);
}

function setNameAsync(cursor, name) {
  cursor.set('name', name);
  cursor.set('isLoading', false);
}
