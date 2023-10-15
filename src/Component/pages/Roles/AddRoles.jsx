import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddRoles = () => {
  const navigate = useNavigate();
  const [dataAccessMenu, setDataAccessMenu] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/access`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDataAccessMenu(response.data.data);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchData();
  }, [token]);

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/roles`,
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
        text: `Dokumen berhasil disimpan. ID: ${response.data.data.id}`,
        showCancelButton: true,
        confirmButtonText: ` Ke Halaman Roles `,
        cancelButtonText: "Masukkan Data Lagi",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/roles");
        } else {
          e.target.reset();
          setSelectedAccess([]);
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
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
      <h2>Tambah Roles</h2>
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

export default AddRoles;
