import { useEffect, useState } from "react";
import api from "../../http/axios";

function CustomersTable({ limit, page, search }) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    api
      .get(`/customers?limit=${limit}&page=${page}&name=${search}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setCustomers(res.data.customers);
      });
  }, [page, search]);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Company</th>
            <th>Customer Phone Number</th>
            <th>Customer Email</th>
            <th>Customer Service Type</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer._id}
              onDoubleClick={() => {
                // setShowEditModal(!showEditModal);
                // setExpenseId(expense._id);
              }}
            >
              <td>{customer.name}</td>
              <td>{customer.company}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.email}</td>
              <td>{customer.serviceType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersTable;
