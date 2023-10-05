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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const docRef = doc(db, "roles", id);
          await deleteDoc(docRef);
          Swal.fire("Deleted!", "", "success");
          loadDataRoles();
        } catch (error) {
          console.error("Error deleting document: ", error);
          Swal.fire("Error!", "Failed to delete document.", "error");
        }
      }
    });
  };

  useEffect(() => {
    loadDataRoles();
  }, []);

  const buttonsData = [
    {
      to: "tambah",
      className: "btn btn-panduan",
      icon: "bi bi-question-circle",
      text: "Panduan",
    },
    {
      to: "tambah",
      className: "btn btn-add",
      icon: "bi bi-plus-circle-dotted",
      text: "Tambah Roles",
    },
    {
      to: "tambah",
      className: "btn btn-import",
      icon: "bi bi-cloud-arrow-up",
      text: "Import",
    },
    {
      to: "tambah",
      className: "btn btn-print",
      icon: "bi bi-printer",
      text: "Print",
    },
  ];
  return (
    <>
      <p className="h2 my-3">Roles</p>
      <div className="container-fluid bg-white content-table p-2">
        <div>
          <div className="row">
            <div className="d-flex justify-content-end mb-2">
              {buttonsData.map((button, index) => (
                <Link
                  key={index}
                  to={button.to}
                  className={`btn ${button.className} mx-1`}
                >
                  <div className="d-md-block d-none">
                    <i className={button.icon}></i> {button.text}
                  </div>
                  <div className="d-md-none d-bock">
                    <i className={button.icon}></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-bordered table-sm align-middle">
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
                      <div className="d-flex ">
                        <Link
                          className="btn btn-primary  me-2"
                          to={`/roles/edit/${role.id}`}
                          style={{ textDecoration: "none", color: "#fff" }}
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                          onClick={() => deleteRoles(role.id)}
                          className="btn btn-danger "
                          style={{ cursor: "pointer" }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="row ">
              <div className="col">Showing 10 From 2347 Data</div>
              <div className="col">
                <ul class="pagination justify-content-end">
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
