import SideNav from '../components/SideNav';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import TaskDetail from '../components/TaskDetail';
import NewTaskForm from '../components/molecules/forms/NewTaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { getEmpTasks, resetTasks } from '../features/task/taskSlice';
import { createTask, createGardenTask } from '../features/task/taskSlice';
import { updateOrgTasks } from '../features/authOrg/authOrgSlice';

const TaskPage = () => {
  const dispatch = useDispatch();
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const { organization } = useSelector((state) => state.authOrg);
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const { employee } = useSelector((state) => state.authEmp);
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const { tasks: empTasks } = useSelector((state) => state.tasks);

  const orgTasks = organization.tasks;

  const [focusedTask, setFocusedTask] = useState(null);
  const [displayMyTasks, setDisplayMyTasks] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    dispatch(getEmpTasks());

    if (!employee) {
      setDisplayMyTasks(false);
      setCreating(false);
    }

    return () => {
      dispatch(resetTasks());
      setCreating(false);
      setDisplayMyTasks(false);
    };
  }, [employee, dispatch]);

  const handleTaskView = (val: any) => {
    setDisplayMyTasks(val);
    setCreating(false);
  };

  const viewMyTasks = () => {
    setCreating(false);
    handleTaskView(true);
  };

  const handleCreating = () => setCreating(!creating);

  const handleCreateTask = (newTask: any, selectedGarden: any) => {
    newTask.status = 'incomplete';
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    dispatch(createTask(newTask))
      .unwrap()
      .then((createdTask: any) => {
        if (selectedGarden !== {}) {
          handleCreateGardenTask(createdTask, selectedGarden);
        }
        dispatch(updateOrgTasks([...orgTasks, createdTask]));
        setCreating(false);
      });
  };

  const handleCreateGardenTask = (task: any, garden: any) => {
    let gardenTask = {
      garden_id: garden.id,
      task_id: task.id
    };

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    dispatch(createGardenTask(gardenTask));
  };

  const listTasks = (tasks: any) =>
    tasks.map((task: any) => (
      <div key={task.id} onClick={() => setFocusedTask(task)} className="task-card">
        <p>{task.name}</p>
        <p>Status: {task.status}</p>
        <p>Due: {task.due_date}</p>
      </div>
    ));

  return (
    <div id="task-page">
      <SideNav />
      <div id="task-page-content">
        {focusedTask ? (
          <div id="task-list-content">
            <TaskDetail task={focusedTask} setFocusedTask={setFocusedTask} />
          </div>
        ) : (
          <div id="task-list-content">
            <div id="task-buttons">
              <Button onClick={() => handleTaskView(false)}>All Tasks</Button>
              {employee && (
                <>
                  <Button onClick={viewMyTasks}>My Tasks</Button>
                  <Button onClick={handleCreating}>New Task</Button>
                </>
              )}
            </div>
            {creating ? (
              <NewTaskForm
                handleCreateTask={handleCreateTask}
                handleCreating={handleCreating}
                gardens={organization.gardens}
              />
            ) : displayMyTasks ? (
              <div id="tasks">
                <h1>My Tasks</h1>
                {listTasks(empTasks)}
              </div>
            ) : (
              <div id="tasks">
                <h1 className="page-header">Tasks</h1>
                {listTasks(orgTasks)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
