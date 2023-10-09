import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getDocs, collection, doc, addDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useParams } from "react-router-dom";

export const UpdateRoles = () => {
  const params = useParams();
  const [rolesData, setRolesData] = useState({
    name: "",
    description: "",
    access_id: [],
  });
  const [selectedAccess, setSelectedAccess] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "roles", params.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setRolesData(docSnap.data());
        setSelectedAccess(docSnap.data().access_id);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  const [dataAccessMenu, setdataAccessMenu] = useState([]);

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
  };

  const items = dataAccessMenu.map((access) => (
    <div key={access.id} className="mb-3 form-check">
      <input
        type="checkbox"
        className="form-check-input"
        name="access[]"
        defaultValue={access.id}
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
            defaultValue={rolesData.name}
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
            defaultValue={rolesData.description}
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
