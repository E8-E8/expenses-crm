import SideBar from "../menu/SideBar";
import NavBar from "../menu/NavBar";
import CommonStatistics from "./CommonStatistics";
import "../../css/statistics.css";
import { Row } from "react-bootstrap";

function Statistics() {
  return (
    <>
      <NavBar />

      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div id="main-data">
              <Row>
                <CommonStatistics />
              </Row>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Statistics;
