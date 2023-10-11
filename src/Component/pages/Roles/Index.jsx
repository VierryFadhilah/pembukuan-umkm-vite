import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { DatatableCore } from "../../DatatableCore";
import Api from "../../../Api";

export default function Roles() {
  const [dataRoles, setDataRoles] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [limitNumber, setLimitNumber] = useState(5);

  const loadDataRoles = () => {
    Api.getDataList("roles", searchValue, limitNumber).then((val) => {
      console.log(val);
      setDataRoles(val);
    });
  };

  const nextPage = (lastData) => {
    Api.getDataList("roles", searchValue, limitNumber, lastData).then((val) => {
      setDataRoles(val);
    });
  };

  const deleteRoles = async (id) => {
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
        await Api.deleteData("roles", id);
        Swal.fire("Deleted!", "", "success");
        loadDataRoles();
      }
    });
  };

  useEffect(() => {
    loadDataRoles();
  }, [searchValue, limitNumber]);

  const columns = [
    {
      name: "Nama Roles",
      selector: (row) => row.data.name,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.data.description,
    },
    {
      name: "Aksi",
      selector: (row) => (
        <div className="d-flex ">
          <Link
            className="btn btn-primary  me-2"
            to={`/roles/edit/${row.id}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <i className="bi bi-pencil"></i>
          </Link>
          <button
            onClick={() => deleteRoles(row.id)}
            className="btn btn-danger "
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {dataRoles ? (
        <DatatableCore
          data={dataRoles}
          columns={columns}
          title="Roles"
          setSearchValue={setSearchValue}
          nextPage={nextPage}
          setLimitNumber={setLimitNumber}
          search
        />
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}
