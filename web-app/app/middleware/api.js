import fetch from 'isomorphic-fetch';
import defaultsDeep from 'lodash/defaultsDeep';

// A middleware for making requests to the deliveroo api

// Have an action return an object like this:
//
// {
//   type: 'LOGIN',
//   endpoint: '/login', // This is the hook for this middleware.
//   options: {
//     ...fetchOptions,
//   },
// }

const defaultOptions = {
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
  },
  credentials: 'include',
};

const api = store => next => (action) => {
  if (!action.endpoint) return next(action);

  next({ type: `${action.type}_REQUEST` });

  const isServer = typeof window === 'undefined';
  const { host, cookie } = store.getState().request;

  if (!host && isServer) {
    throw new TypeError('Server-side fetch missing `request.host` in state');
  }

  const url = isServer ? `${host}${action.endpoint}` : action.endpoint;

  const options = defaultsDeep({}, action.options, defaultOptions);
  if (isServer) options.headers.cookie = cookie;

  if (options.headers['content-type'] === 'application/json' && options.body) {
    options.body = JSON.stringify(options.body);
  }

  return fetch(url, options)
    .then((response) => {
      const { status, headers } = response;

      if (
        response.headers.get('content-type')
        && response.headers.get('content-type').search('application/json') >= 0
      ) {
        return response
          .json()
          .then(payload => ({ status, headers, payload }))
          .catch(() => Promise.reject(
            new TypeError(
              'Fetch Error: Payload was described as json but was unable to be parsed as such',
            ),
          ));
      }

      return {
        status,
        headers,
        payload: undefined,
      };
    })
    .then(
      responseAction => new Promise((resolve, reject) => {
        const ok = responseAction.status && responseAction.status.toString().match(/^2/);
        const type = ok ? `${action.type}_SUCCESS` : `${action.type}_FAILURE`;
        const composedAction = {
          type,
          ...responseAction,
        };

        next(composedAction);

        resolve(composedAction);
      }),
    );
};

export default api;

export { defaultOptions };
