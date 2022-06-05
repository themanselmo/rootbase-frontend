import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetTasks, getGardenTasks } from '../features/task/taskSlice';
const GardenDetail = ({ garden, setFocusedGarden }: any) => {
  const dispatch = useDispatch();

  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
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
        tasks.map((task: any) => (
          <div key={task.id} className="task-card">
            <p>{task.name}</p>
            <p>Status: {task.status}</p>
            <p>Due: {task.due_date}</p>
          </div>
        ))}
    </div>
  );
};

export default GardenDetail;
