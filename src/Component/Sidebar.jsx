import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <nav className="navbar  navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <i className="bi bi-list"></i>
          </a>
          <ul className="navbar-nav mx-auto text-center ">
            <li className="nav-item">
              <a className="nav-link ">UMKM</a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start  text-bg-dark"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            UMKM
          </h5>
          <button
            type="button"
            className="btn-close bg-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body ">
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="side-menu" data-bs-dismiss="offcanvas">
              <Link className="nav-link text-white " to={"/"}>
                <i className="bi bi-house"></i> Beranda
              </Link>
            </li>

            <li className="side-menu" data-bs-dismiss="offcanvas">
              <Link className="nav-link text-white" to="/dashboard">
                <i className="bi bi-bar-chart"></i> Dashboard
              </Link>
            </li>

            <li className="nav-item side-menu">
              <span
                className="nav-link text-white btn-hover"
                data-bs-toggle="collapse"
                data-bs-target="#collapseKeuangan"
                aria-expanded="false"
                aria-controls="collapseKeuangan"
              >
                <i className="bi bi-cash"></i> Keuangan
              </span>
            </li>
            <div className="collapse" id="collapseKeuangan">
              <ul className="list-unstyled">
                <li className="side-menu" data-bs-dismiss="offcanvas">
                  <Link to="/pemasukan" className="nav-link text-white">
                    <i className="bi bi-arrow-up-circle"></i> Pemasukan
                  </Link>
                </li>
                <li className="side-menu" data-bs-dismiss="offcanvas">
                  <Link to="/pengeluaran" className="nav-link text-white">
                    <i className="bi bi-arrow-down-circle"></i> Pengeluaran
                  </Link>
                </li>
                <li className="side-menu" data-bs-dismiss="offcanvas">
                  <Link to="/kasbon" className="nav-link text-white">
                    <i className="bi bi-cash-coin"></i> Kasbon
                  </Link>
                </li>
              </ul>
            </div>

            <li className="nav-item side-menu">
              <span
                className="nav-link text-white btn-hover"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePembukuan"
                aria-expanded="false"
                aria-controls="collapsePembukuan"
              >
                <i className="bi bi-book"></i> Pembukuan
              </span>
            </li>
            <div className="collapse" id="collapsePembukuan">
              <ul className="list-unstyled">
                <li className="side-menu" data-bs-dismiss="offcanvas">
                  <Link to="/harian" className="nav-link text-white">
                    <i className="bi bi-calendar-day"></i> Harian
                  </Link>
                </li>
                <li className="side-menu" data-bs-dismiss="offcanvas">
                  <Link to="/bulanan" className="nav-link text-white">
                    <i className="bi bi-calendar-month"></i> Bulanan
                  </Link>
                </li>
                <li className="side-menu" data-bs-dismiss="offcanvas">
                  <Link to="/tahunan" className="nav-link text-white">
                    <i className="bi bi-calendar"></i> Tahunan
                  </Link>
                </li>
              </ul>
            </div>

            <li className="nav-item side-menu">
              <span
                className="nav-link text-white btn-hover"
                data-bs-toggle="collapse"
                data-bs-target="#collapseAkses"
                aria-expanded="false"
                aria-controls="collapseAkses"
              >
                <i className="bi bi-lock"></i> Akses
              </span>
            </li>
            <div className="collapse" id="collapseAkses">
              <ul className="list-unstyled">
                <li className="side-menu" data-bs-dismiss="offcanvas">
                  <Link to="/user" className="nav-link text-white">
                    <i className="bi bi-people"></i> User
                  </Link>
                </li>
                <li className="side-menu" data-bs-dismiss="offcanvas">
                  <Link to="/roles" className="nav-link text-white">
                    <i className="bi bi-person-badge"></i> Roles
                  </Link>
                </li>
                <li className="side-menu" data-bs-dismiss="offcanvas">
                  <Link to="/toko" className="nav-link text-white">
                    <i className="bi bi-shop"></i> Toko
                  </Link>
                </li>
              </ul>
            </div>
          </ul>

          <hr />
          <div className="dropdown">
            <a
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>Setting</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
              <li>
                <a className="dropdown-item" href="#">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
