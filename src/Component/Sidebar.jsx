import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";

const Sidebar = ({ access_menu, setLogStatus }) => {
  const navigate = useNavigate();
  const signOutUser = () => {
    Swal.fire({
      title: "Sign Out?",
      text: " ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#557089",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sign Out",
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/");
        window.location.reload();
      }
    });
  };

  const [collapseStatus, setCollapseStatus] = useState({
    keuangan: false,
    pembukuan: false,
    akses: false,
  });

  const toggleCollapse = (key) => {
    setCollapseStatus((prevStatus) => ({
      ...prevStatus,
      [key]: !prevStatus[key],
    }));

    // Menutup collapse yang lain saat satu collapse dibuka
    Object.keys(collapseStatus).forEach((collapseKey) => {
      if (collapseKey !== key && collapseStatus[collapseKey]) {
        setCollapseStatus((prevStatus) => ({
          ...prevStatus,
          [collapseKey]: false,
        }));
      }
    });
  };

  return (
    <>
      <nav className="navbar  navbar-expand-lg bg-body-nav">
        <div className="container-fluid">
          <a
            className="navbar-brand px-3 py-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <i className="bi bi-list"></i>
          </a>

          <ul className="navbar-nav mx-auto text-center d-md-block d-none">
            <li className="nav-item">
              <div className="row align-items-center">
                <div className="col">Pembukuan-UMKM by</div>
                <div className="col">
                  <img className="pl-2" src={logo} alt="" />
                </div>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav mx-auto text-center d-md-none d-block">
            <li className="nav-item">Pembukuan-UMKM</li>
          </ul>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start offcanvas-style"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <img src={logo} alt="" />
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
            {access_menu.includes("dashboard") ? (
              <li className="side-menu" data-bs-dismiss="offcanvas">
                <Link className="nav-link text-white" to="/dashboard">
                  <i className="bi bi-bar-chart"></i> Dashboard
                </Link>
              </li>
            ) : (
              ""
            )}
            {access_menu.includes("keuangan") ? (
              <>
                <li className="nav-item side-menu">
                  <span
                    onClick={() => toggleCollapse("keuangan")}
                    className="nav-link text-white btn-hover"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseKeuangan"
                    aria-expanded="false"
                    aria-controls="collapseKeuangan"
                  >
                    <i className="bi bi-cash"></i> Keuangan
                  </span>
                </li>
                <div
                  className={`collapse ${
                    collapseStatus.keuangan ? "show" : ""
                  }`}
                  id="collapseKeuangan"
                >
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
                      <Link to="/pengeluaran" className="nav-link text-white">
                        <i className="bi bi-cash-coin"></i> Transaksi
                      </Link>
                    </li>
                    {/* <li className="side-menu" data-bs-dismiss="offcanvas">
                      <Link to="/kasbon" className="nav-link text-white">
                        <i className="bi bi-cash-coin"></i> Kasbon
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </>
            ) : (
              ""
            )}
            {access_menu.includes("pembukuan") ? (
              <>
                <li className="nav-item side-menu">
                  <span
                    onClick={() => toggleCollapse("pembukuan")}
                    className="nav-link text-white btn-hover"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePembukuan"
                    aria-expanded="false"
                    aria-controls="collapsePembukuan"
                  >
                    <i className="bi bi-book"></i> Pembukuan
                  </span>
                </li>
                <div
                  className={`collapse ${
                    collapseStatus.pembukuan ? "show" : ""
                  }`}
                  id="collapsePembukuan"
                >
                  <ul className="list-unstyled">
                    <li className="side-menu" data-bs-dismiss="offcanvas">
                      <Link
                        to="/pembukuan/harian"
                        className="nav-link text-white"
                      >
                        <i className="bi bi-calendar-day"></i> Harian
                      </Link>
                    </li>
                    <li className="side-menu" data-bs-dismiss="offcanvas">
                      <Link
                        to="/pembukuan/bulanan"
                        className="nav-link text-white"
                      >
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
              </>
            ) : (
              ""
            )}
            {access_menu.includes("akses") ? (
              <>
                <li className="nav-item side-menu">
                  <span
                    onClick={() => toggleCollapse("akses")}
                    className="nav-link text-white btn-hover"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseAkses"
                    aria-expanded="false"
                    aria-controls="collapseAkses"
                  >
                    <i className="bi bi-lock"></i> Akses
                  </span>
                </li>
                <div
                  className={`collapse ${collapseStatus.akses ? "show" : ""}`}
                  id="collapseAkses"
                >
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
                  </ul>
                </div>
              </>
            ) : (
              ""
            )}
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
                <a className="dropdown-item" href="#" onClick={signOutUser}>
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
