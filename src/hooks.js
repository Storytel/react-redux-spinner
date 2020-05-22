import { useEffect, useRef } from 'react';

export const pendingTasksSelector = (state) => state.pendingTasks;
export const usePreviousPendingTasks = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
