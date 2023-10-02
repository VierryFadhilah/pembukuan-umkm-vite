import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
// Initialize Cloud Firestore and get a reference to the service
import { db } from "../../../firebaseConfig";

import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Roles() {
  const [dataRoles, setDataRoles] = useState([
    {
      id: "",
      name: "",
      description: "",
    },
  ]);
  const confirmDelete = (id) => {
    const fetchData = async () => {
      console.log("id", id);

      const docRef = doc(db, "roles", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());

        Swal.fire({
          title: `Do you want to Delete ${docSnap.data().name}?`,
          showDenyButton: true,
          showCancelButton: true,
          showConfirmButton: false,
          denyButtonText: `Delete`,
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isDenied) {
            await deleteDoc(doc(db, "roles", id));
            Swal.fire("Deleted!", "", "success");
          } else {
          }
        });
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  };

  const items = [];
  for (let i = 0; i < dataRoles.length; i++) {
    items.push(
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{dataRoles[i].name}</td>
        <td>{dataRoles[i].description}</td>
        <td>
          <div className="row align-items-center text-center">
            <div className="col m-2">
              <Link
                href=""
                className="btn btn-primary btn-sm"
                to={`/roles/edit/${dataRoles[i].id}`}
              >
                <i className="bi bi-pencil"></i>
              </Link>
            </div>
            <div className="col m-2">
              <button
                onClick={() => confirmDelete(dataRoles[i].id)}
                className="btn btn-danger btn-sm"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "roles"));
        const dataRoles = [];
        querySnapshot.forEach((doc) => {
          const roles = {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
          };

          dataRoles.push(roles);
        });
        setDataRoles(dataRoles);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchData();
  }, [confirmDelete]);

  return (
    <>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-12">
            <h1 className="">Roles</h1>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <div className="d-flex justify-content-end mb-2">
              <Link to={"tambah"} className="btn btn-primary">
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
                <tbody>{items}</tbody>
              </table>
            </div>

            <div className="row justify-content-center mt-2">
              <div className="col"></div>
              <div className="col">
                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
