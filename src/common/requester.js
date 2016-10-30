/* globals Promise */
/* eslint no-console: 0 */

// TODO: async load polyfills
import 'es6-promise';
import 'fetch-polyfill';

import { CreateComments } from './comments';

const URL = {
  USER_PIC: `https://randomuser.me/api/?results=${CreateComments.count}`,
};

export function sendComment(comment) {
  return new Promise(res => {
    setTimeout(() => {
      comment.id = new Date().getTime();
      res(comment);
    }, 2000);
  });
}

export function getComments(/* data */) {
  return fetch(URL.USER_PIC/* , config */)
    .then(response => response.json())
    .then(CreateComments);
}
