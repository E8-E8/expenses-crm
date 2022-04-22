import react, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartLine,
  faUser,
  faMoneyBillTransfer,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.setItem("jwt", "");
    navigate("/");
  }

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      style={{ zIndex: 0, marginTop: "10px" }}
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1">
              <a className="nav-link" href="/expenses">
                <i className="m-1">
                  <FontAwesomeIcon icon={faMoneyBillTransfer} />
                </i>
                expenses
              </a>
              <a className="link-secondary">
                <i className="fas fa-plus-circle"></i>
              </a>
            </h6>
          </li>
          <li className="nav-item">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1">
              <a className="nav-link" href="/incomes">
                <i className="m-1">
                  <FontAwesomeIcon icon={faMoneyBillTrendUp} />
                </i>
                incomes
              </a>
              <a className="link-secondary">
                <i className="fas fa-plus-circle"></i>
              </a>
            </h6>
          </li>
          <li className="nav-item">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1">
              <a className="nav-link" href="/prospects">
                <i className="m-1">
                  <FontAwesomeIcon icon={faUser} />
                </i>
                prospects
              </a>
              <a className="link-secondary">
                <i className="fas fa-plus-circle"></i>
              </a>
            </h6>
          </li>
          <li className="nav-item">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1">
              <a className="nav-link" href="/statistics">
                <i className="m-1">
                  <FontAwesomeIcon icon={faChartLine} />
                </i>
                statistics
              </a>
              <a className="link-secondary">
                <i className="fas fa-plus-circle"></i>
              </a>
            </h6>
          </li>
          <li className="nav-item" onClick={() => Logout()}>
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1">
              <a className="nav-link">
                <i className="m-1">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </i>
                logout
              </a>
            </h6>
          </li>
          <hr />
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
