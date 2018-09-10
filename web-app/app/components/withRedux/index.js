import React, { Component } from 'react';
import { Provider } from 'react-redux';

import storeProvider from '../../utils/storeProvider';

export default Page => class withRedux extends Component {
  static async getInitialProps(context) {
    const { req } = context;
    const isServer = !!req;

    const initialState = {};

    if (isServer) {
      const protocol = req.connection.encrypted ? 'https://' : 'http://';
      initialState.request = {
        host: `${protocol}${req.headers.host}`,
        cookie: req.headers.cookie,
      };
    }

    const store = storeProvider(initialState, isServer);

    let props;

    if (typeof Page.getInitialProps === 'function') {
      props = await Page.getInitialProps({ ...context, store });
    }

    return { _initialState: store.getState(), _isServer: isServer, ...props };
  }

  render() {
    // Pseudo private props we need to pass between get initial props and render
    // eslint-disable-next-line react/prop-types
    const { _initialState, _isServer, ...props } = this.props;

    return (
      <Provider store={storeProvider(_initialState, _isServer)}>
        <Page {...props} />
      </Provider>
    );
  }
};
