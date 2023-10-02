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
            GenoCorp
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
            <li data-bs-dismiss="offcanvas">
              <Link className="nav-link text-white " to={"/"}>
                Beranda
              </Link>
            </li>
            <li data-bs-dismiss="offcanvas">
              <Link className="nav-link text-white" to="dashboard">
                Dashboard
              </Link>
            </li>
            <li data-bs-dismiss="offcanvas">
              <Link className="nav-link text-white" to="user">
                User
              </Link>
            </li>
            <li data-bs-dismiss="offcanvas">
              <Link className="nav-link text-white" to="roles">
                roles
              </Link>
            </li>
            <li data-bs-dismiss="offcanvas">
              <Link to={"pemasukan"} className="nav-link text-white">
                Pemasukan
              </Link>
            </li>
            <li data-bs-dismiss="offcanvas">
              <Link to={"pengeluaran"} className="nav-link text-white">
                Pengeluaran
              </Link>
            </li>
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
