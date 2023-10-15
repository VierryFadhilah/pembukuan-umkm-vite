import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AddUser = () => {
  const navigate = useNavigate();

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
      Swal.showLoading();

      const token = localStorage.getItem("token");
      axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          email,
          name,
          password,
          roles_id: roles,
        },
      })
        .then((val) => {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: `Dokumen berhasil disimpan. ID: ${val.data.data.id}`,
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
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
          });
        });
    }
  };

  const optionRoles = listRoles.map((roles, i) => (
    <option key={i} value={roles.id}>
      {roles.name}
    </option>
  ));

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/roles`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setListRoles(response.data.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-3">
      <h2>Tambah User</h2>
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
            autoComplete="off"
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
            name="email"
            autoComplete="off"
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
