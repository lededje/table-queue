import * as React from 'react';
import { Provider } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import type { $Request } from 'express';

import storeProvider from '../../utils/storeProvider';

type Context = {
  req: $Request,
};

const withRedux = (WrappedComponent: React.ComponentType<*>) => class extends React.Component<{}> {
  static async getInitialProps(context: Context) {
    const { req } = context;
    const isServer: boolean = !isUndefined(req);

    const initialState = {};

    if (isServer) {
      const protocol: string = req.connection.encrypted ? 'https://' : 'http://';
      initialState.request = {
        host: `${protocol}${req.headers.host}`,
        cookie: req.headers.cookie,
      };
    }

    const store = storeProvider(initialState, isServer);

    let props;

    if (typeof WrappedComponent.getInitialProps === 'function') {
      props = await WrappedComponent.getInitialProps({ ...context, store });
    }

    return { _initialState: store.getState(), _isServer: isServer, ...props };
  }

  render() {
    // Pseudo private props we need to pass between get initial props and render
    // eslint-disable-next-line react/prop-types
    const { _initialState, _isServer, ...props } = this.props;

    return (
      <Provider store={storeProvider(_initialState, _isServer)}>
        <WrappedComponent {...props} />
      </Provider>
    );
  }
};

export default withRedux;
