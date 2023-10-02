import React, { useState, useEffect } from "react";
import { getDocs, collection, doc, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Swal from "sweetalert2";

const AddRoles = () => {
  const [dataAccessMenu, setdataAccessMenu] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "access_menu"));
        const dataAccessMenu = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          slug: doc.data().slug,
        }));
        setdataAccessMenu(dataAccessMenu);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (accessId) => {
    if (selectedAccess.includes(accessId)) {
      setSelectedAccess(selectedAccess.filter((id) => id !== accessId));
    } else {
      setSelectedAccess([...selectedAccess, accessId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");

    const formDataWithAccess = {
      name,
      description,
      access_id: selectedAccess,
    };

    try {
      const rolesRef = collection(db, "roles");
      const docRef = await addDoc(rolesRef, formDataWithAccess);
      console.log("Document written with ID: ", docRef.id);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Dokumen berhasil disimpan.",
        showCancelButton: true,
        confirmButtonText: "Ke Halaman Roles",
        cancelButtonText: "Masukkan Data Lagi",
      }).then((result) => {
        // Jika pengguna memilih "Ke Halaman Roles"
        if (result.isConfirmed) {
          // Redirect ke halaman "Roles"
          window.location.href = "/roles";
        } else {
          // Mengosongkan formulir dan reset state
          e.target.reset();
          setIsChecked(false);
        }
      });

      e.target.reset();
      setSelectedAccess([]);
    } catch (error) {
      console.error("Error writing document: ", error);
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
      <label className="form-check-label" htmlFor={access.name}>
        {access.slug}
      </label>
    </div>
  ));

  return (
    <div className="container mt-5">
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

        {items}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddRoles;
