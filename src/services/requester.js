import 'es6-promise';
import 'fetch-polyfill';
import Storage from 'services/storage';
import fetchBanks from './fetch-banks';

const URL = {
  LOGIN:  'ok.json',
  SIGNUP: 'ok.json',
  LOGOUT: 'ok.json',
  TRANSACTIONS: 'transactions.json',
};

export default {
  login,
  signup,
  logout,
  getBanks: fetchBanks,
  getTransactions,
};

export function login(payload) {
  const config = {
    method: 'GET',
  };

  return fetch(URL.LOGIN, config)
    .then(handlerResponse)
    .then(response => response.login)
    .then(response => {

      // try get user from Storage if auth
      var user = Storage.get('user') || {};

      if (user.username !== payload.username) {
        throw new Error('User not found');
      }

      if (user.password !== payload.password) {
        throw new Error('Bad credentials');
      }

      user.hash = '';
      return user;
    });
}

export function signup(payload) {
  const config = {
    method: 'GET',
  };

  return fetch(URL.SIGNUP, config)
    .then(handlerResponse)
    .then(response => response.signup)
    .then(response => {

    // try get user from Storage if auth
    var user = Storage.get('user', {});
    var { username, password } = payload;

    if (user && (user.username === username)) {
      throw new Error('User exist');
    }

    return user;
  });
}

export function logout(payload) {
  const config = {
    method: 'GET',
  };

  return fetch(URL.LOGOUT, config)
    .then(handlerResponse)
    .then(response => response.logout);
}

export function getTransactions(payload) {
  const config = {
    method: 'GET',
  };

  return fetch(URL.TRANSACTIONS, config)
    .then(handlerResponse)
    .then(response => response.transactions);
}

/*********************************************
                  helpers
*********************************************/

function handlerResponse(response) {
  if (!response.ok) {
    throw new Error(`Request error: ${ response.statusText }`);
  }
  return response.json();
}
