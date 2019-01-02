import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';

class Spinner extends React.Component {
  componentDidMount() {
    const { store } = this.context;

    // NOTE: react-redux v6.0.0 introduced a breaking change that breaks the use of React context's legacy API:
    // See: https://github.com/reduxjs/react-redux/releases/tag/v6.0.0:
    // Passing store as a prop to a connected component is no longer supported.
    if (!store) {
      this.disposeStoreSubscription = () => {};
      return;
    }

    const { config } = this.props;
    this.previousPendingTasks = store.getState().pendingTasks;
    NProgress.configure(config);
    this.disposeStoreSubscription = store.subscribe(() => {
      const diff = store.getState().pendingTasks - this.previousPendingTasks;
      if (diff > 0) {
        NProgress.start();
      }
      if (diff < 0) {
        NProgress.inc();
      }
      if (store.getState().pendingTasks === 0) {
        NProgress.done();
      }
      this.previousPendingTasks = store.getState().pendingTasks;
    });
  }

  componentWillUnmount() {
    this.disposeStoreSubscription();
  }

  render() {
    return false;
  }
}

Spinner.contextTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

Spinner.propTypes = {
  config: PropTypes.object
};

Spinner.defaultProps = {
  config: {}
};

export default Spinner;
