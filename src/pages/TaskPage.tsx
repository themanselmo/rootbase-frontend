import SideNav from '../components/SideNav';
import Button from '@mui/material/Button';
import { ReactNode, useEffect, useState } from 'react';
import TaskDetail from '../components/TaskDetail';
import NewTaskForm from '../components/molecules/forms/NewTaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { getEmpTasks, resetTasks } from '../features/task/taskSlice';
import { createTask, createGardenTask } from '../features/task/taskSlice';
import { updateOrgTasks } from '../features/authOrg/authOrgSlice';
import task, { asyncTask } from '../interfaces/task';
import garden from '../interfaces/garden';
import { asyncEmployee } from '../interfaces/employee';
import { asyncOrganization } from '../interfaces/organization';
import reduxState from '../interfaces/reduxState';

const TaskPage = () => {
  const dispatch = useDispatch();
  const { organization }: asyncOrganization = useSelector((state: reduxState) => state.authOrg);
  const { employee }: asyncEmployee = useSelector((state: reduxState) => state.authEmp);
  const { tasks: empTasks }: asyncTask = useSelector((state: reduxState) => state.tasks);

  const orgTasks: task[] = organization ? organization.tasks : [];

  const [focusedTask, setFocusedTask] = useState<task>({
    id: null,
    name: '',
    status: '',
    due_date: ''
  });
  const [displayMyTasks, setDisplayMyTasks] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);

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

  const handleTaskView = (val: boolean): void => {
    setDisplayMyTasks(val);
    setCreating(false);
  };

  const viewMyTasks = (): void => {
    setCreating(false);
    handleTaskView(true);
  };

  const handleCreating = () => setCreating(!creating);

  const handleCreateTask = (newTask: task, selectedGarden: garden): void => {
    newTask.status = 'incomplete';
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    dispatch(createTask(newTask))
      .unwrap()
      .then((createdTask: task) => {
        if (selectedGarden) {
          handleCreateGardenTask(createdTask, selectedGarden);
        }
        dispatch(updateOrgTasks([...orgTasks, createdTask]));
        setCreating(false);
      });
  };

  const handleCreateGardenTask = (task: task, garden: garden): void => {
    let gardenTask = {
      garden_id: garden.id,
      task_id: task.id
    };

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    dispatch(createGardenTask(gardenTask));
  };

  const listTasks = (tasks: task[]): ReactNode =>
    tasks.map((task: task) => (
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
                gardens={organization?.gardens}
              />
            ) : displayMyTasks ? (
              <div id="tasks">
                <h1>My Tasks</h1>
                {listTasks(empTasks)}
              </div>
            ) : (
              <div id="tasks">
                <h1 className="page-header">Tasks</h1>
                {orgTasks && listTasks(orgTasks)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
