import React from 'react';
import { render } from 'react-dom';

import Baobab from 'baobab';
import { root } from 'baobab-react/higher-order';
import { getDefaultState } from 'common/state';
import App from 'containers/App';

const defaultState = getDefaultState();
const tree = new Baobab(defaultState);

const RootedApp = root(tree, App);

const main = document.createElement('div');
main.id = 'react-view';
document.body.appendChild(main);
render(<RootedApp />, main);
