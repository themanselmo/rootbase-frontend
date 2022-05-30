import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const GardenDetail = ({ garden, setFocusedGarden }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`/gardens/${garden.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks);
      });
  }, []);

  const listTasks = (tasks) =>
    tasks.map((task) => (
      <div className="task-card">
        <p>{task.name}</p>
        <p>Status: {task.status}</p>
        <p>Due: {task.due_date}</p>
      </div>
    ));

  return (
    <div className="garden-detail">
      <Button onClick={() => setFocusedGarden(null)}>Close</Button>
      <h1>{garden.name}</h1>
      <p>Tasks</p>
      {listTasks(tasks)}
    </div>
  );
};

export default GardenDetail;
