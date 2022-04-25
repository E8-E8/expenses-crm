import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../../http/axios";
import CommentSection from "./CommentsSection";
import InfoSection from "./InfoSection";

function EditProspectModal({
  toggleShowEditModal,
  show,
  refreshProspects,
  prospectId,
}) {
  const [tab, setTab] = useState("info");

  let activeTab;
  if (tab === "info") {
    activeTab = (
      <InfoSection
        refreshProspects={refreshProspects}
        prospectId={prospectId}
        show={show}
        toggleShowEditModal={toggleShowEditModal}
      />
    );
  } else if (tab === "comments") {
    activeTab = (
      <CommentSection
        prospectId={prospectId}
        show={show}
        toggleShowEditModal={toggleShowEditModal}
      />
    );
  }

  return (
    <>
      <Modal size="lg" show={show} onHide={toggleShowEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Prospect</Modal.Title>
        </Modal.Header>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={tab === "info" ? "nav-link active" : "nav-link"}
              onClick={() => setTab("info")}
            >
              Info
            </button>
          </li>
          <li className="nav-item">
            <button
              className={tab === "comments" ? "nav-link active" : "nav-link"}
              onClick={() => setTab("comments")}
            >
              Comments
            </button>
          </li>
        </ul>
        {activeTab}
      </Modal>
    </>
  );
}

export default EditProspectModal;
