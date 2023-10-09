import React, { useEffect, useState } from "react";
import Api from "../../../Api";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    Api.getData("user", params.id).then((val) => {
      setUserData(val);
    });
  }, []);

  const [listRoles, setListRoles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const retypepassword = formData.get("retypepassword");
    const roles = formData.get("roles");

    if (password !== retypepassword) {
      Swal.fire({
        icon: "error",
        text: "Password dan retype password tidak sama",
      });
    } else {
      Api.insertData("user", {
        email,
        name,
        password,
        roles_id: roles,
        search: name.toLowerCase(),
      }).then((val) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: `Dokumen berhasil disimpan. ID: ${val}`,
          showCancelButton: true,
          confirmButtonText: ` Ke Halaman User `,
          cancelButtonText: "Masukkan Data Lagi",
        }).then((result) => {
          // Jika pengguna memilih "Ke Halaman Roles"
          if (result.isConfirmed) {
            // Redirect ke halaman "Roles"
            navigate("/user");
          } else {
            // Mengosongkan formulir dan reset state
            e.target.reset();
          }
        });
      });
    }
  };

  const optionRoles = listRoles.map((roles, i) => (
    <option key={i} value={roles.id}>
      {roles.data.name}
    </option>
  ));

  useEffect(() => {
    Api.currentUser();
    Api.getDataList("roles").then((val) => {
      setListRoles(val);
    });
  }, []);

  return (
    <div className="container mt-3">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaUser" className="form-label">
            Nama User:
          </label>
          <input
            type="text"
            className="form-control"
            id="namaUser"
            name="name"
            value={userData.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">
            E-mail :
          </label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            value={userData.email}
            name="email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">
            Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            name="password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userRetypepassword" className="form-label">
            Re-type Password :
          </label>
          <input
            type="password"
            className="form-control"
            id="userRetypepassword"
            name="retypepassword"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="roles" className="form-label">
            Roles:
          </label>
          <select name="roles" id="roles" className="form-control" required>
            <option value="" hidden>
              -- Pilih --
            </option>
            {optionRoles}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </form>
    </div>
  );
};
