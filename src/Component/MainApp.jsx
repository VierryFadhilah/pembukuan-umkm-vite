import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./pages/Dashboard";
import Roles from "./pages/Roles/Index";
import AddRoles from "./pages/Roles/AddRoles";
import { UpdateRoles } from "./pages/Roles/UpdateRoles";
import User from "./pages/User/Index";
import { AddUser } from "./pages/User/AddUser";
import { EmptyPage } from "./pages/EmptyPage";
import { UpdateUser } from "./pages/User/UpdateUser";
import Pemasukan from "./pages/Pemasukan/Index";
import AddPemasukan from "./pages/Pemasukan/AddPemasukan";
import Pengeluaran from "./pages/Pengeluaran/Index";
import AddPengeluaran from "./pages/Pengeluaran/AddPengeluaran";
import Harian from "./pages/Harian/Index";
import Detail from "./pages/Harian/Detail";
import Bulanan from "./pages/Bulanan/Index";
import Sidebar from "./Sidebar";

const MainApp = () => {
  const access_menu = [];
  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const roles_id = user.roles_id;

  if (roles_id === 1) {
    access_menu.push("akses", "dashboard", "keuangan", "pembukuan");
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar access_menu={access_menu} />

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* keuangan */}

              <Route path="/pemasukan" element={<Pemasukan />} />
              <Route path="/pemasukan/tambah" element={<AddPemasukan />} />
              <Route path="/pengeluaran" element={<Pengeluaran />} />
              <Route path="/pengeluaran/tambah" element={<AddPengeluaran />} />
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
};

export default MainApp;
