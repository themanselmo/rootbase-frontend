import { Button, Input, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrgTasks } from "../features/authOrg/authOrgSlice";
import {
  getTaskComments,
  createTaskComment,
  resetComments,
} from "../features/comment/commentSlice";
import { createEmpTask, updateTask } from "../features/task/taskSlice";

const TaskDetail = ({ task, setFocusedTask }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const { employee } = useSelector((state) => state.authEmp);
  const { comments, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.comments
  );

  const { organization } = useSelector((state) => state.authOrg);
  const orgTasks = organization.tasks;

  useEffect(() => {
    dispatch(getTaskComments(task.id));

    return () => {
      dispatch(resetComments());
    };
  }, [dispatch, task.id]);

  const postComment = (comment) => {
    let newComment = {
      employee_id: employee.id,
      task_id: task.id,
      content: comment,
    };

    if (comment !== "") {
      dispatch(createTaskComment(newComment)).then(() => {
        console.log("hi");
        setInput("");
      });
    }
  };

  const startTask = () => {
    let newTask = { ...task };
    newTask.status = "in progress";
    dispatch(updateTask(newTask))
      .unwrap()
      .then((updatedTask) => {
        setFocusedTask(updatedTask);
        dispatch(
          updateOrgTasks(
            orgTasks.map((orgTask) =>
              orgTask.id === updatedTask.id ? updatedTask : orgTask
            )
          )
        );
      });
    dispatch(createEmpTask({ employee_id: employee.id, task_id: task.id }));
  };

  const finishTask = () => {
    let newTask = { ...task };
    newTask.status = "finished";
    dispatch(updateTask(newTask))
      .unwrap()
      .then((updatedTask) => {
        setFocusedTask(updatedTask);
        dispatch(
          updateOrgTasks(
            orgTasks.map((orgTask) =>
              orgTask.id === updatedTask.id ? updatedTask : orgTask
            )
          )
        );
      });
  };

  const handleChange = (e) => {
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
          {task.status === "incomplete" ? (
            <Button onClick={startTask}>Start Task</Button>
          ) : (
            <Button onClick={finishTask}>Finish Task</Button>
          )}
          <Input onChange={handleChange} value={input} />
          <Button onClick={() => postComment(input)}>Submit Comment</Button>
        </Stack>
      )}
      <div className="comment-section">
        {comments.map((comment) => (
          <div className="task-comment">
            {comment.employee.name}: {comment.content} | Posted at:{" "}
            {comment.created_at}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDetail;
