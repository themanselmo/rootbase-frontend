import SideNav from '../components/SideNav';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import TaskDetail from '../components/TaskDetail';
import NewTaskForm from '../components/NewTaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { getEmpTasks, resetTasks } from '../features/task/taskSlice';
import { createTask, createGardenTask } from '../features/task/taskSlice';
import { updateOrgTasks } from '../features/authOrg/authOrgSlice';

const TaskPage = () => {
  const dispatch = useDispatch();
  const { organization } = useSelector((state) => state.authOrg);
  const { employee } = useSelector((state) => state.authEmp);
  const { tasks: empTasks } = useSelector((state) => state.tasks);

  const orgTasks = organization.tasks;

  const [focusedTask, setFocusedTask] = useState(null);
  const [displayMyTasks, setDisplayMyTasks] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
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

  const handleTaskView = (val) => {
    setDisplayMyTasks(val);
    setCreating(false);
  };

  const viewMyTasks = () => {
    setCreating(false);
    handleTaskView(true);
  };

  const handleCreating = () => setCreating(!creating);

  const handleCreateTask = (newTask, selectedGarden) => {
    newTask.status = 'incomplete';
    dispatch(createTask(newTask))
      .unwrap()
      .then((createdTask) => {
        if (selectedGarden !== {}) {
          handleCreateGardenTask(createdTask, selectedGarden);
        }
        dispatch(updateOrgTasks([...orgTasks, createdTask]));
        setCreating(false);
      });
  };

  const handleCreateGardenTask = (task, garden) => {
    let gardenTask = {
      garden_id: garden.id,
      task_id: task.id
    };

    dispatch(createGardenTask(gardenTask));
  };

  const listTasks = (tasks) =>
    tasks.map((task) => (
      <div onClick={() => setFocusedTask(task)} className="task-card">
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
