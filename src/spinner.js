import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';

class Spinner extends React.Component {
  componentDidUpdate(prevProps) {
    const diff = this.props.pendingTasks - prevProps.pendingTasks;
      if (diff > 0) {
        NProgress.start();
      }
      if (diff < 0) {
        NProgress.inc();
      }
      if (this.props.pendingTasks === 0) {
        NProgress.done();
      }
  }

  componentDidMount() {
    const { config } = this.props;
    NProgress.configure(config);
  }

  render() {
    return null;
  }
}

Spinner.propTypes = {
  config: PropTypes.object,
  pendingTasks: PropTypes.number
};

Spinner.defaultProps = {
  config: {}
};

const mapStateToProps = (state) => ({
  pendingTasks: state.pendingTasks
});

export default connect(mapStateToProps)(Spinner);
