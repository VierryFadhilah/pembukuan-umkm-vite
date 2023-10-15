import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateRoles = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [dataAccessMenu, setDataAccessMenu] = useState([]);
  const [dataRoles, setDataRoles] = useState();
  const [selectedAccess, setSelectedAccess] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    Swal.showLoading();
    try {
      const [accessResponse, rolesResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/access`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/roles/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setDataAccessMenu(accessResponse.data.data);
      setDataRoles(rolesResponse.data.data);
      setSelectedAccess(rolesResponse.data.data.access);
      Swal.close();
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, params.id]);

  const handleCheckboxChange = (accessId) => {
    if (selectedAccess.includes(accessId)) {
      setSelectedAccess(selectedAccess.filter((id) => id !== accessId));
    } else {
      setSelectedAccess([...selectedAccess, accessId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.showLoading();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");

    const formDataWithAccess = {
      name,
      description,
      access: selectedAccess,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/roles/${params.id}`,
        formDataWithAccess,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: `Dokumen berhasil diperbarui`,
        showCancelButton: true,
        confirmButtonText: ` Ke Halaman Roles `,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/roles");
        } else {
        }
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat menyimpan data!",
      });
    }
  };

  const items = dataAccessMenu.map((access) => (
    <div key={access.id} className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        name="access[]"
        value={access.id}
        checked={selectedAccess.includes(access.id)}
        onChange={() => handleCheckboxChange(access.id)}
      />
      <label className="form-check-label" htmlFor={access.slug}>
        {access.slug}
      </label>
    </div>
  ));

  return (
    <div className="container mt-3">
      <h2>Update Roles</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaRoles" className="form-label">
            Nama Roles:
          </label>
          <input
            type="text"
            className="form-control"
            id="namaRoles"
            name="name"
            required
            defaultValue={dataRoles ? dataRoles.name : ""}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deskripsiRoles" className="form-label">
            Deskripsi Roles:
          </label>
          <textarea
            className="form-control"
            id="deskripsiRoles"
            rows="3"
            name="description"
            required
            defaultValue={dataRoles ? dataRoles.description : ""}
          ></textarea>
        </div>
        <label className="form-label">Akses :</label>
        {items}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRoles;
