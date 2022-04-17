import { useEffect, useState } from "react";
import SideBar from "../menu/SideBar";
import InfoBar from "../menu/InfoBar";
import IncomesControlBar from "./IncomesControlBar";
import EditIncomeModal from "./EditIncomeModal";
import "../../css/crm.css";
import "../../css/display.css";
import { useNavigate } from "react-router-dom";
import api from "../../http/axios";
import Pagination from "../menu/Pagination";
import { Row, Col } from "react-bootstrap";
import NavBar from "../menu/NavBar";

function Incomes() {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false); // used to show or hide the edit modal
  const [incomes, setIncomes] = useState([]); // incomes array
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const [refresh, setRefresh] = useState(false); // used in create modal to refresh whole page
  const [incomeId, setIncomeId] = useState(""); // is set when user double clicks on the td
  const [balance, setBalance] = useState(0);
  const [sortByDate, setSortByDate] = useState("-createdAt");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [incomesNumber, setIncomesNumber] = useState();
  const [itemsPerPage, setPerPage] = useState(10);

  useEffect(() => {
    api
      .get(
        `/incomes?sort=${sortByDate}&name=${search}&page=${pageNumber}&limit=${itemsPerPage}`,
        {
          headers: { Authorization: "Bearer " + jwt },
        }
      )
      .then((res) => {
        setIncomes(res.data.incomes);
        setBalance(res.data.currentBalance);
        setIncomesNumber(res.data.count);
      });
  }, [refresh, sortByDate, search, pageNumber, setShowEditModal]);

  function changePageNumber(pageNumber) {
    //used for the pagination
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

  function refreshIncomes() {
    // refreshes this component when an income is created or edited
    setRefresh(!refresh);
  }

  function toggleEditIncomesModal() {
    // hides and shows the edit modal
    setShowEditModal(!showEditModal);
  }

  return (
    <>
      <NavBar changeSearch={changeSearch} />

      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div id="main-data">
              <EditIncomeModal
                toggleEditIncomesModal={toggleEditIncomesModal}
                refreshIncomes={refreshIncomes}
                show={showEditModal}
                incomeId={incomeId}
              />
              <IncomesControlBar
                refreshIncomes={refreshIncomes}
                balance={balance}
                lessRecent={lessRecent}
                mostRecent={mostRecent}
              />
              <Row>
                <Col>
                  <InfoBar SectionName="Incomes" />
                </Col>
                <Col className="mt-3">
                  <Pagination
                    changePageNumber={changePageNumber}
                    itemsNumber={incomesNumber}
                    itemsPerPage={itemsPerPage}
                  />
                </Col>
              </Row>

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Income Name</th>
                      <th>Income Type</th>
                      <th>Income Sum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {incomes.map((income) => (
                      <tr
                        key={income._id}
                        onDoubleClick={() => {
                          setShowEditModal(!showEditModal);
                          setIncomeId(income._id);
                        }}
                      >
                        <td>{income.name}</td>
                        <td>{income.type}</td>
                        <td>{income.sum}</td>
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

export default Incomes;
