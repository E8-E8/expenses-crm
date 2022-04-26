import { Modal, Button, Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../http/axios";

function CommentSection({ toggleShowEditModal, prospectId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    api
      .get(`/comments/${prospectId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((res) => {
        setComments(res.data.comments);
      });
  }, [refresh]);

  function createComment() {
    const commentData = {
      text: text,
      parentId: prospectId,
    };
    api
      .post("/comments", commentData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      })
      .then((res) => {
        setText("");
        setRefresh(!refresh);
      });
  }

  const checkIfEnterIsClicked = (e) => {
    if (e.key === "Enter") {
      createComment();
    }
  };

  return (
    <>
      <Modal.Body>
        <Accordion>
          {comments.map((comment, i) => (
            <Accordion.Item eventKey={i} key={comment._id} className="m-0">
              <Accordion.Header className="m-0">
                {comment.createdByName} -{" "}
                {new Date(comment.createdAt).toDateString()}
              </Accordion.Header>
              <Accordion.Body>
                <p>{comment.text}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <textarea
          onKeyPress={checkIfEnterIsClicked}
          value={text}
          rows={5}
          className="form-control mt-3"
          placeholder="Write a comment here..."
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleShowEditModal}>
          Close
        </Button>
        <Button variant="success" onClick={() => createComment()}>
          Create a comment
        </Button>
      </Modal.Footer>
    </>
  );
}

export default CommentSection;
