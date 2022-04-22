import { Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../http/axios";
import CommentSection from "./CommentsSection";
import InfoSection from "./InfoSection";

function EditProspectModal({
  toggleShowEditModal,
  show,
  refreshExpenses,
  prospectId,
}) {
  const [tab, setTab] = useState("info");

  //   function editExpense() {
  //     const prospectData = JSON.stringify({
  //       name: name,
  //       company: company,
  //       serviceType: serviceType,
  //       email: email,
  //       phoneNumber: phoneNumber,
  //     });
  //     api
  //       .patch(`/prospects/${prospectId}`, prospectData, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + localStorage.getItem("jwt"),
  //         },
  //       })
  //       .then((res) => {
  //         toggleShowEditModal();
  //         refreshExpenses();
  //       });
  //   }

  let activeTab;
  if (tab == "info") {
    activeTab = <InfoSection prospectId={prospectId} />;
  } else if (tab == "comments") {
    activeTab = <CommentSection />;
  }

  return (
    <>
      <Modal show={show} onHide={toggleShowEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Prospect</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={tab == "info" ? "nav-link active" : "nav-link"}
                onClick={() => setTab("info")}
              >
                Info
              </a>
            </li>
            <li className="nav-item">
              <a
                className={tab == "comments" ? "nav-link active" : "nav-link"}
                onClick={() => setTab("comments")}
              >
                Comments
              </a>
            </li>
          </ul>
          {activeTab}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShowEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => editExpense()}>
            Edit Expense
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProspectModal;
