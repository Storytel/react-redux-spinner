import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { pendingTasksSelector, usePreviousPendingTasks } from './hooks';

const Spinner = ({ config }) => {
  const pendingTasks = useSelector(pendingTasksSelector);
  const prevPendingTasks = usePreviousPendingTasks(pendingTasks);
  const diff = pendingTasks - prevPendingTasks;

  useEffect(() => {
    if (diff > 0) {
      NProgress.start();
    }
    if (diff < 0) {
      NProgress.inc();
    }
    if (pendingTasks === 0) {
      NProgress.done();
    }
  }, [pendingTasks]);

  useEffect(() => {
    NProgress.configure(config);
  }, []);

  return null;
};

Spinner.propTypes = {
  config: PropTypes.object,
  pendingTasks: PropTypes.number
};

Spinner.defaultProps = {
  config: {}
};

export default Spinner;

