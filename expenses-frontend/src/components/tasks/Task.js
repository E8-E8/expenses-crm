import { Col, Form, Button } from "react-bootstrap";
import { useState } from "react";

function Task(props) {
  return (
    <Col sm={4}>
      <Form>
        <div
          className={
            props.completed
              ? "text-center task border border-primary rounded m-1 disabled-task"
              : "text-center task border border-primary rounded m-1 "
          }
        >
          <h3>{props.name}</h3>
          <p>{props.description}</p>
          <p>Created by: {props.userName}</p>
          <p>{props.date}</p>
          <Form.Check
            checked={props.completed}
            type="switch"
            className="mb-3"
            onChange={(e) => {
              props.completeTask(props.id, e.target.checked);
            }}
          />
        </div>
      </Form>
    </Col>
  );
}

export default Task;
