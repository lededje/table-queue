import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import thunk from 'redux-thunk';
import asyncAwait from 'redux-async-await';
import { composeWithDevTools } from 'redux-devtools-extension';
import defaultsDeep from 'lodash/defaultsDeep';

import reducers from '../reducers';
import api from '../middleware/api';

export default function configureStore(initialState: {}, isServer: boolean) {
  if (!isServer && typeof window !== 'undefined' && window.store) {
    return window.store;
  }

  const mergedState = defaultsDeep({}, initialState, reducers());
  const composedMiddleware = composeWithDevTools(applyMiddleware(asyncAwait, api, thunk));
  const store = createStore(reducers, mergedState, composedMiddleware);

  if (typeof window !== 'undefined') {
    // $FlowFixMe
    if (module.hot) {
      // $FlowFixMe
      module.hot.accept('../reducers', () => {
        // eslint-disable-next-line
        const nextReducer = require('../reducers');
        store.replaceReducer(nextReducer);
      });
    }
    window.store = store;
  }

  return store;
}
