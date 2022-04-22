import { useEffect, useState } from "react";
import api from "../../http/axios";
import EditProspectModal from "./EditProspectModal";

function ProspectsTable({ limit, page, search, refresh }) {
  const [prospects, setProspects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [prospectId, setProspectId] = useState("");

  function toggleShowEditModal() {
    setShowEditModal(!showEditModal);
  }

  useEffect(() => {
    api
      .get(`/prospects?limit=${limit}&page=${page}&name=${search}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setProspects(res.data.prospects);
      });
  }, [page, search, refresh]);

  return (
    <>
      <EditProspectModal
        toggleShowEditModal={toggleShowEditModal}
        refresh={refresh}
        show={showEditModal}
        prospectId={prospectId}
      />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Prospect Name</th>
              <th>Prospect Company</th>
              <th>Prospect Phone Number</th>
              <th>Prospect Email</th>
              <th>Prospect Service Type</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((prospect) => (
              <tr
                style={{
                  backgroundColor: prospect.status == "hot" ? "red" : null,
                }}
                key={prospect._id}
                onDoubleClick={() => {
                  setShowEditModal(!showEditModal);
                  setProspectId(prospect._id);
                }}
              >
                <td>{prospect.name}</td>
                <td>{prospect.company}</td>
                <td>{prospect.phoneNumber}</td>
                <td>{prospect.email}</td>
                <td>{prospect.serviceType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProspectsTable;
