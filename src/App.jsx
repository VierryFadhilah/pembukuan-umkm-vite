import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebaseConfig";
import LoginPage from "./Component/LoginPage";
import Sidebar from "./Component/Sidebar";
import Home from "./Component/Home";
import Dashboard from "./Component/pages/Dashboard";
import Roles from "./Component/pages/Roles/Index";
import AddRoles from "./Component/pages/Roles/AddRoles";
import { UpdateRoles } from "./Component/pages/Roles/UpdateRoles";
import User from "./Component/pages/User/Index";
import { AddUser } from "./Component/pages/User/AddUser";
import { EmptyPage } from "./Component/pages/EmptyPage";
import { UpdateUser } from "./Component/pages/User/UpdateUser";
import Pemasukan from "./Component/pages/Pemasukan/Index";
import AddPemasukan from "./Component/pages/Pemasukan/AddPemasukan";
import Pengeluaran from "./Component/pages/Pengeluaran/Index";
import AddPengeluaran from "./Component/pages/Pengeluaran/AddPengeluaran";
import Harian from "./Component/pages/Harian/Index";
import Detail from "./Component/pages/Harian/Detail";
import Bulanan from "./Component/pages/Bulanan/Index";

function App() {
  const [logStatus, setLogStatus] = useState({
    status: false,
    roles: "",
    access_menu: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari localStorage saat komponen dimuat
    const storedUser = localStorage.getItem("logStatus");

    // Memeriksa apakah data ada di localStorage
    if (storedUser) {
      setLogStatus(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        setLogStatus({
          status: true,
          roles: "owner",
        });
      } else {
        // Mengambil data dari localStorage saat komponen dimuat
        const storedUser = localStorage.getItem("logStatus");

        // Memeriksa apakah data ada di localStorage
        if (storedUser) {
          setLogStatus(JSON.parse(storedUser));
        } else {
          setLogStatus({
            status: false,
            roles: "",
          });
        }
      }
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  let items;
  console.log("first", logStatus);
  if (logStatus.status && logStatus.roles === "owner") {
    items = (
      <>
        <div className="container-fluid">
          <div className="row">
            <Sidebar
              access_menu={["akses", "dashboard", "keuangan", "pembukuan"]}
            />

            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* keuangan */}

                <Route path="/pemasukan" element={<Pemasukan />} />
                <Route path="/pemasukan/tambah" element={<AddPemasukan />} />
                <Route path="/pengeluaran" element={<Pengeluaran />} />
                <Route
                  path="/pengeluaran/tambah"
                  element={<AddPengeluaran />}
                />
                {/* <Route path="/kasbon" element={<Kasbon />} />
                <Route path="/kasbon/tambah" element={<AddKasbon />} /> */}

                {/* pembukuan */}

                <Route path="/pembukuan/harian" element={<Harian />} />
                <Route
                  path="/pembukuan/harian/view/:id"
                  loader={({ params }) => {
                    params.id;
                  }}
                  element={<Detail />}
                />
                <Route path="/pembukuan/bulanan" element={<Bulanan />} />
                <Route
                  path="/pembukuan/bulanan/view/:id"
                  loader={({ params }) => {
                    params.id;
                  }}
                  element={<Detail />}
                />

                {/* akses */}

                <Route path="/roles" element={<Roles />} />
                <Route path="/user" element={<User />} />
                <Route path="/user/tambah" element={<AddUser />} />
                <Route
                  path="/user/edit/:id"
                  loader={({ params }) => {
                    params.id;
                  }}
                  element={<UpdateUser />}
                />
                <Route path="/roles/tambah" element={<AddRoles />} />
                <Route
                  path="/roles/edit/:id"
                  loader={({ params }) => {
                    params.id;
                  }}
                  element={<UpdateRoles />}
                />
                <Route path="/:else" element={<EmptyPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </>
    );
  } else if (logStatus.status && logStatus.access_menu) {
    items = (
      <>
        <div className="container-fluid">
          <div className="row">
            <Sidebar
              access_menu={logStatus.access_menu}
              setLogStatus={setLogStatus}
            />

            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />

                {logStatus.access_menu.includes("dashboard") ? (
                  <>
                    <Route path="/dashboard" element={<Dashboard />} />
                  </>
                ) : (
                  ""
                )}

                {logStatus.access_menu.includes("akses") ? (
                  <>
                    <Route path="/user" element={<User />} />
                    <Route path="/user/tambah" element={<AddUser />} />
                    <Route
                      path="/user/edit/:id"
                      loader={({ params }) => {
                        params.id;
                      }}
                      element={<UpdateUser />}
                    />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/roles/tambah" element={<AddRoles />} />
                    <Route
                      path="/roles/edit/:id"
                      loader={({ params }) => {
                        params.id;
                      }}
                      element={<UpdateRoles />}
                    />
                  </>
                ) : (
                  ""
                )}

                <Route path="/:else" element={<EmptyPage />} />
                <Route path="/:else/:else" element={<EmptyPage />} />
                <Route path="/:else/:else/:else" element={<EmptyPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    items = <LoginPage setLogStatus={setLogStatus} />;
  }

  if (loading) {
    return (
      <>
        <div className="">Loading ....</div>
      </>
    );
  }

  return (
    <>
      <div className="App">{items}</div>
    </>
  );
}

export default App;
