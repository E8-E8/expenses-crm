import SideBar from "../menu/SideBar";
import ExpensesStatistics from "./ExpensesStatistics";
import IncomesStatistics from "./IncomesStatistics";
import ProfitStatistics from "./ProfitStatistics";
import "../../css/statistics.css";
import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../menu/NavBar";
import SearchBar from "../menu/SearchBar";

function Statistics() {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!jwt) {
      navigate("/");
    }
  });

  return (
    <>
      <NavBar />
      <SearchBar />
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div id="main-data">
              <Row>
                <ProfitStatistics />
                <ExpensesStatistics />
                <IncomesStatistics />
              </Row>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Statistics;
