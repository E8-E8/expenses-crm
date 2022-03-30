import react, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faDollar,
  faMoneyBillTransfer,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.setItem("jwt", "");
    navigate("/login");
  }

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar sidebar-height collapse"
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
              <a className="nav-link" href="/statistics">
                <i className="m-1">
                  <FontAwesomeIcon icon={faDollar} />
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
                  <FontAwesomeIcon icon={faChartLine} />
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
