import { useEffect, useState } from "react";
import api from "../../http/axios";

function ProspectsTable({ limit, page, search, refresh }) {
  const [prospects, setProspects] = useState([]);

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
              key={prospect._id}
              onDoubleClick={() => {
                // setShowEditModal(!showEditModal);
                // setExpenseId(expense._id);
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
  );
}

export default ProspectsTable;
