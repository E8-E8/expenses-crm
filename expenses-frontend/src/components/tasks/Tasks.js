import { Row, Container, Button } from "react-bootstrap";
import "../../css/tasks.css";
import Task from "./Task";
import api from "../../http/axios";
import { useEffect, useState } from "react";
import CreateTaskModal from "./CreateTaskModal";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    api
      .get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setTasks(res.data.tasks);
      });

    api.put(
      "/tasks/seen",
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      }
    );
  }, [reload]);

  function reloadPage() {
    setReload(!reload);
  }

  function completeTask(taskId, completed) {
    api
      .patch(
        `/tasks/${taskId}`,
        { completed: completed },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((res) => {
        reloadPage();
      });
  }

  return (
    <div>
      <h1 className="text-center">Your tasks</h1>
      <div className="text-center m-5">
        <CreateTaskModal reloadPage={reloadPage} />
        <Button href="/expenses">Go back</Button>
      </div>
      <Container>
        <Row>
          {tasks.map((task) => {
            let strDate = new Date(task.createdAt).toDateString();
            return (
              <Task
                key={task._id}
                id={task._id}
                name={task.name}
                description={task.description}
                userName={task.createdByName}
                date={strDate}
                completed={task.completed}
                completeTask={completeTask}
              />
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Tasks;
