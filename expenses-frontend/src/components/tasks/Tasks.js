import { Row, Container, Button } from "react-bootstrap";
import "../../css/tasks.css";
import Task from "./Task";
import api from "../../http/axios";
import { useEffect, useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);

  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

  useEffect(() => {
    if (!jwt) {
      navigate("/");
    } else {
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
    }
  }, [reload]);

  function reloadPage() {
    setReload(!reload);
  }

  return (
    <div>
      <h1 className="text-center">Your tasks</h1>
      <Container>
        <Row>
          {tasks.map((task) => {
            let strDate = new Date(task.createdAt).toDateString();
            return (
              <Task
                key={task._id}
                name={task.name}
                description={task.description}
                userName={task.createdByName}
                date={strDate}
              />
            );
          })}
        </Row>
      </Container>
      <div className="text-center mt-5">
        <CreateTaskModal reloadPage={reloadPage} />
        <Button href="/expenses">Go back</Button>
      </div>
    </div>
  );
}

export default Tasks;
