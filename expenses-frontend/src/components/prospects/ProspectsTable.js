import { useEffect, useState } from "react";
import api from "../../http/axios";
import EditProspectModal from "./EditProspectModal";

function ProspectsTable({ limit, page, search, refreshProspects }) {
  const [prospects, setProspects] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [prospectId, setProspectId] = useState("");

  function toggleShowEditModal() {
    setShowEditModal(!showEditModal);
  }

  useEffect(() => {
    api
      .get(`/prospects?limit=${limit}&page=${page}&brand=${search}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setProspects(res.data.prospects);
      });
  }, [page, search, refreshProspects]);

  return (
    <>
      <EditProspectModal
        toggleShowEditModal={toggleShowEditModal}
        refreshProspects={refreshProspects}
        show={showEditModal}
        prospectId={prospectId}
      />
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Prospect Fullname</th>
              <th>Prospect Email</th>
              <th>Prospect Country</th>
              <th>Prospect Brand</th>
              <th>Prospect Position</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((prospect) => (
              <tr
                key={prospect._id}
                onDoubleClick={() => {
                  setShowEditModal(!showEditModal);
                  setProspectId(prospect._id);
                }}
              >
                <td>{prospect.fullname}</td>
                <td>{prospect.email}</td>
                <td>{prospect.country}</td>
                <td>{prospect.brand}</td>
                <td>{prospect.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProspectsTable;
