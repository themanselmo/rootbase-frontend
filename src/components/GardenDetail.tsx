import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetTasks, getGardenTasks } from '../features/task/taskSlice';
const GardenDetail = ({ garden, setFocusedGarden }) => {
  const dispatch = useDispatch();

  const { tasks, isLoading, isSuccess, isError, message } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getGardenTasks(garden.id));

    return () => {
      dispatch(resetTasks());
    };
  }, [dispatch, garden.id]);

  return (
    <div className="garden-detail">
      <Button onClick={() => setFocusedGarden(null)}>Close</Button>
      <h1>{garden.name}</h1>
      <p>Tasks</p>
      {tasks &&
        tasks.map((task) => (
          <div className="task-card">
            <p>{task.name}</p>
            <p>Status: {task.status}</p>
            <p>Due: {task.due_date}</p>
          </div>
        ))}
    </div>
  );
};

export default GardenDetail;
