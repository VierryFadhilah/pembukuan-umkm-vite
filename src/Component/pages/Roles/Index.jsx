import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import Swal from "sweetalert2";

export default function Roles() {
  const [dataRoles, setDataRoles] = useState([]);

  const loadDataRoles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "roles"));
      const rolesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
      }));
      setDataRoles(rolesData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const deleteRoles = async (id) => {
    try {
      const docRef = doc(db, "roles", id);
      await deleteDoc(docRef);
      Swal.fire("Deleted!", "", "success");
      loadDataRoles();
    } catch (error) {
      console.error("Error deleting document: ", error);
      Swal.fire("Error!", "Failed to delete document.", "error");
    }
  };

  useEffect(() => {
    console.log("Data Roles Load");
    loadDataRoles();
  }, []);

  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-md-12">
          <h1>Roles</h1>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <div className="d-flex justify-content-end mb-2">
            <Link to="tambah" className="btn btn-primary">
              Tambah
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nama Roles</th>
                  <th scope="col">Deskripsi</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataRoles.map((role, index) => (
                  <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>
                      <div className="row align-items-center text-center">
                        <div className="col m-2">
                          <Link
                            className="btn btn-primary btn-sm"
                            to={`/roles/edit/${role.id}`}
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </div>
                        <div className="col m-2">
                          <button
                            onClick={() => deleteRoles(role.id)}
                            className="btn btn-danger btn-sm"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
