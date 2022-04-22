import { useEffect, useState } from "react";
import api from "../../http/axios";
import Pagination from "../menu/Pagination";
import { Row, Col } from "react-bootstrap";
import NavBar from "../menu/NavBar";
import ProspectsTable from "./ProspectsTable";
import SideBar from "../menu/SideBar";
import InfoBar from "../menu/InfoBar";
import ProspectsControlBar from "./ProspectsControlBar";

function Prospects(props) {
  const [search, setSearch] = useState("");
  const [customersNumber, setCustomersNumber] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [prospectsPerPage, setCustomersPerPage] = useState(25);
  const [refresh, setRefresh] = useState(false);

  function changeSearch(newSearch) {
    setSearch(newSearch);
  }
  function changePageNumber(pageNumber) {
    setPageNumber(pageNumber);
  }
  function changeSearch(newSearch) {
    setSearch(newSearch);
  }
  function refreshProspects() {
    setRefresh(!refresh);
  }

  useEffect(() => {
    api
      .get("/prospects", {
        headers: { authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
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
              <ProspectsControlBar refreshProspects={refreshProspects} />
              <Row>
                <Col>
                  <InfoBar SectionName="Prospects" />
                </Col>
                <Col className="mt-3">
                  <Pagination
                    changePageNumber={changePageNumber}
                    itemsNumber={customersNumber}
                    itemsPerPage={prospectsPerPage}
                  />
                </Col>
              </Row>
              <ProspectsTable
                refresh={refresh}
                limit={prospectsPerPage}
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

export default Prospects;
