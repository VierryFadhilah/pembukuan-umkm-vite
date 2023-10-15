import React, { useEffect, useState } from "react";
import Api from "../../../Api";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    roles_id: 0,
  });

  const [listRoles, setListRoles] = useState([]);
  const [rolesname, setRolesName] = useState("--Pilih--");

  const handleSubmit = async (e) => {
    Swal.showLoading();
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const roles_id = formData.get("roles");
    console.log("first", {
      name,
      email,
      roles_id,
    });

    axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/users/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        roles_id,
      },
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: `Dokumen berhasil diupdate`,
          showCancelButton: true,
          confirmButtonText: ` Ke Halaman User `,
          cancelButtonText: "tutup",
        }).then((result) => {
          // Jika pengguna memilih "Ke Halaman Roles"
          if (result.isConfirmed) {
            // Redirect ke halaman "Roles"
            navigate("/user");
          } else {
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });
  };

  const optionRoles = listRoles.map((roles, i) => (
    <option key={i} value={roles.id}>
      {roles.name}
    </option>
  ));

  const fetchData = async () => {
    Swal.showLoading();
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/roles`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseuser = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/users/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseroles = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/roles/${
        responseuser.data.data.roles_id
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setRolesName(responseroles.data.data.name);

    setUserData(responseuser.data.data);

    setListRoles(response.data.data.data);

    Swal.close();
  };

  useEffect(() => {
    fetchData();
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
            defaultValue={userData.name}
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
            defaultValue={userData.email}
            name="email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="roles" className="form-label">
            Roles:
          </label>
          <select name="roles" id="roles" className="form-control" required>
            <option value={userData.roles_id} hidden>
              {rolesname}
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
