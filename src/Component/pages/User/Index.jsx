import React, { useState, useEffect } from "react";
import Api from "../../../Api";
import { DatatableCore } from "../../DatatableCore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function User() {
  const [dataUser, setDataUser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [limitNumber, setLimitNumber] = useState(5);

  const loadDataUser = () => {
    Api.getDataList("user", searchValue, limitNumber).then((val) => {
      setDataUser(val);
    });
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Hapus?",
      text: "Data yang di hapus tidak dapat Dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Api.deleteData("user", id);
        Swal.fire("Deleted!", "", "success");
        loadDataUser();
      }
    });
  };

  const columns = [
    { name: "Nama", selector: (row) => row.data.name },
    {
      name: "Email",
      selector: (row) => row.data.email,
    },
    {
      name: "Aksi",
      selector: (row) => (
        <div className="d-flex ">
          <Link
            className="btn btn-primary  me-2"
            to={`edit/${row.id}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <i className="bi bi-pencil"></i>
          </Link>
          <button
            onClick={() => deleteUser(row.id)}
            className="btn btn-danger "
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    loadDataUser();
  }, [searchValue, limitNumber]);

  return (
    <>
      {dataUser ? (
        <DatatableCore
          data={dataUser}
          columns={columns}
          title="User"
          setSearchValue={setSearchValue}
          setLimitNumber={setLimitNumber}
          search
        />
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}
