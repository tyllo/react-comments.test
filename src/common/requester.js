/* globals Promise */
/* eslint no-console: 0 */

export function sendComment(data) {
  return new Promise(res => {
    setTimeout(() => {
      console.log('>>> sendComment', data);
      res('id');
    }, 2000);
  });
}
