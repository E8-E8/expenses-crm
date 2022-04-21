import { useEffect, useState } from "react";
import api from "../../http/axios";
import Pagination from "../menu/Pagination";
import { Row, Col } from "react-bootstrap";
import NavBar from "../menu/NavBar";
import CustomersTable from "./CustomersTable";
import SideBar from "../menu/SideBar";
import InfoBar from "../menu/InfoBar";

function Customers(props) {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [customersNumber, setCustomersNumber] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [customersPerPage, setCustomersPerPage] = useState(25);

  function changeSearch(newSearch) {
    setSearch(newSearch);
  }
  function changePageNumber(pageNumber) {
    setPageNumber(pageNumber);
  }
  function changeSearch(newSearch) {
    setSearch(newSearch);
  }

  useEffect(() => {
    api
      .get("/customers", {
        headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setCustomers(res.data);
        setCustomersNumber(res.data.count);
      });
  }, []);

  return (
    <>
      <NavBar changeSearch={changeSearch} />

      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div id="main-data">
              {/* <EditExpenseModal
                toggleEditExpensesModal={toggleEditExpensesModal}
                refreshExpenses={refreshExpenses}
                show={showEditModal}
                expenseId={expenseId}
              />
              <ExpensesControlBar
                refreshExpenses={refreshExpenses}
                balance={balance}
                lessRecent={lessRecent}
                mostRecent={mostRecent}
              /> */}
              <Row>
                <Col>
                  <InfoBar SectionName="Cusomers" />
                </Col>
                <Col className="mt-3">
                  <Pagination
                    changePageNumber={changePageNumber}
                    itemsNumber={customersNumber}
                    itemsPerPage={customersPerPage}
                  />
                </Col>
              </Row>
              <CustomersTable
                limit={customersPerPage}
                page={pageNumber}
                search={search}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Customers;
