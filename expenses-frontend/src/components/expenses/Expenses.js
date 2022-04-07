import { useEffect, useState, useLayoutEffect } from "react";
import SideBar from "../menu/SideBar";
import SearchBar from "../menu/SearchBar";
import InfoBar from "../menu/InfoBar";
import EditExpenseModal from "./EditExpenseModal";
import ExpensesControlBar from "./ExpensesControlBar";
import "../../css/crm.css";
import "../../css/display.css";
import { useNavigate } from "react-router-dom";
import api from "../../http/axios";
import Pagination from "../menu/Pagination";
import { Row, Col } from "react-bootstrap";
import NavBar from "../menu/NavBar";

function Expenses() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [refresh, setRefresh] = useState(false);
  const [expenseId, setExpenseId] = useState("");
  const [balance, setBalance] = useState(0);
  const [sortByDate, setSortByDate] = useState("-createdAt");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [expensesNumber, setExpensesNumber] = useState();
  const [itemsPerPage, setPerPage] = useState(10);

  useEffect(() => {
    api
      .get(
        `/expenses?sort=${sortByDate}&name=${search}&limit=${itemsPerPage}&page=${pageNumber}`,
        {
          headers: { Authorization: "Bearer " + jwt },
        }
      )
      .then((res) => {
        setExpenses(res.data.expenses);
        setBalance(res.data.currentBalance);
        setExpensesNumber(res.data.count);
      });
  }, [refresh, sortByDate, search, pageNumber]);

  function changePageNumber(pageNumber) {
    setPageNumber(pageNumber);
  }
  function changeSearch(newSearch) {
    setSearch(newSearch);
  }

  function mostRecent() {
    setSortByDate("-createdAt");
  }

  function lessRecent() {
    setSortByDate("createdAt");
  }

  function refreshExpenses() {
    setRefresh(!refresh);
  }

  function toggleEditExpensesModal() {
    setShowEditModal(!showEditModal);
  }

  return (
    <>
      <NavBar />
      <SearchBar changeSearch={changeSearch} />

      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div id="main-data">
              <EditExpenseModal
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
              />
              <Row>
                <Col>
                  <InfoBar SectionName="Expenses" />
                </Col>
                <Col className="mt-3">
                  <Pagination
                    changePageNumber={changePageNumber}
                    itemsNumber={expensesNumber}
                    itemsPerPage={itemsPerPage}
                  />
                </Col>
              </Row>

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Expense Name</th>
                      <th>Expense Type</th>
                      <th>Expense Sum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr
                        key={expense._id}
                        onDoubleClick={() => {
                          setShowEditModal(!showEditModal);
                          setExpenseId(expense._id);
                        }}
                      >
                        <td>{expense.name}</td>
                        <td>{expense.type}</td>
                        <td>{expense.sum}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Expenses;
