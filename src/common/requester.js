/* globals Promise */
/* eslint no-console: 0 */

// TODO: async load polyfills
import 'es6-promise';
import 'fetch-polyfill';

import { createComments, generateComment, count } from './comments';

const URL = {
  USER_PIC: `https://randomuser.me/api/?results=${ count }`,
};

export function getComments(/* data */) {
  return fetch(URL.USER_PIC/* , config */)
    .then(response => response.json())
    .then(createComments);
}

export function sendComment(data) {
  return new Promise(res => {
    setTimeout(() => {
      res(generateComment(data));
    }, 2000);
  });
}

export function deleteComment(idComment) {
  return new Promise(res => {
    setTimeout(() => {
      res(idComment);
    }, 500);
  });
}
