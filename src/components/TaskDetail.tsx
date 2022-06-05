import { Button, Input, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrgTasks } from '../features/authOrg/authOrgSlice';
import {
  getTaskComments,
  createTaskComment,
  resetComments
} from '../features/comment/commentSlice';
import { createEmpTask, updateTask } from '../features/task/taskSlice';

const TaskDetail = ({ task, setFocusedTask }: any) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState('');

  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const { employee } = useSelector((state) => state.authEmp);
  const { comments } = useSelector(
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    (state) => state.comments
  );

  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const { organization } = useSelector((state) => state.authOrg);
  const orgTasks = organization.tasks;

  useEffect(() => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    dispatch(getTaskComments(task.id));

    return () => {
      dispatch(resetComments());
    };
  }, [dispatch, task.id]);

  const postComment = (comment: any) => {
    let newComment = {
      employee_id: employee.id,
      task_id: task.id,
      content: comment
    };

    if (comment !== '') {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
      dispatch(createTaskComment(newComment)).then(() => {
        console.log('hi');
        setInput('');
      });
    }
  };

  const startTask = () => {
    let newTask = { ...task };
    newTask.status = 'in progress';
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    dispatch(updateTask(newTask))
      .unwrap()
      .then((updatedTask: any) => {
        setFocusedTask(updatedTask);
        dispatch(
          updateOrgTasks(
            orgTasks.map((orgTask: any) => (orgTask.id === updatedTask.id ? updatedTask : orgTask))
          )
        );
      });
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    dispatch(createEmpTask({ employee_id: employee.id, task_id: task.id }));
  };

  const finishTask = () => {
    let newTask = { ...task };
    newTask.status = 'finished';
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    dispatch(updateTask(newTask))
      .unwrap()
      .then((updatedTask: any) => {
        setFocusedTask(updatedTask);
        dispatch(
          updateOrgTasks(
            orgTasks.map((orgTask: any) => (orgTask.id === updatedTask.id ? updatedTask : orgTask))
          )
        );
      });
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <div className="task-detail">
      <Button onClick={() => setFocusedTask(null)}>Close</Button>
      <h1>{task.name}</h1>
      <p>{task.status}</p>
      <p>{task.due_date}</p>
      {employee && (
        <Stack>
          {task.status === 'incomplete' ? (
            <Button onClick={startTask}>Start Task</Button>
          ) : (
            <Button onClick={finishTask}>Finish Task</Button>
          )}
          <Input onChange={handleChange} value={input} />
          <Button onClick={() => postComment(input)}>Submit Comment</Button>
        </Stack>
      )}
      <div className="comment-section">
        {comments.map((comment: any) => (
          <div key={comment.id} className="task-comment">
            {comment.employee.name}: {comment.content} | Posted at: {comment.created_at}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDetail;
