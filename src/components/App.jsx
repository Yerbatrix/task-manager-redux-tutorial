import { Layout } from 'components/Layout/Layout';
import { AppBar } from 'components/AppBar/AppBar';
import { TaskForm } from 'components/TaskForm/TaskForm';
import { TaskList } from 'components/TaskList/TaskList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '.././redux/operations';
import { useEffect } from 'react';
import { getError, getIsLoading, getTasks } from '.././redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const items = useSelector(getTasks);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Layout>
      <AppBar />
      {isLoading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      <TaskForm />
      <TaskList />
      <p>{items.length > 0 && JSON.stringify(items, null, 2)}</p>
    </Layout>
  );
};
