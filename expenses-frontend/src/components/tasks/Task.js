import { Col } from "react-bootstrap";

function Task(props) {
  return (
    <Col sm={4}>
      <div className="text-center task border border-primary rounded m-1">
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <p style={{ color: "#ccc" }}>Created by: {props.userName}</p>
        <p>{props.date}</p>
      </div>
    </Col>
  );
}

export default Task;
