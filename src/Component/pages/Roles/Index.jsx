import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import DataTable from "react-data-table-component";
import { formatDate } from "../../utils/dateUtils";

export default function Roles() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const fetchData = async (page) => {
    setLoading(true);
    const response = await axios({
      method: "get",
      url: `${
        import.meta.env.VITE_API_URL
      }/roles?limit=${perPage}&sort=${sort}&order=${order}&page=${page}&search=${search}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.data);
    setData(response.data.data.data);
    setTotalRows(response.data.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    setPage(page);
    setPerPage(newPerPage);

    setLoading(false);
  };
  const handleSort = async (column, sortDirection) => {
    // simulate server sort
    console.log(column.sortField, sortDirection);
    setLoading(true);

    setSort(column.sortField);
    setOrder(sortDirection);

    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page, perPage, sort, order, search]);

  const deleteUser = async (roles) => {
    Swal.showLoading();
    Swal.fire({
      title: `Hapus  ${roles.name}`,
      text: "Data yang di hapus tidak dapat Dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        axios
          .delete(`${import.meta.env.VITE_API_URL}/roles/${roles.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            // Jika pengguna berhasil dihapus, Anda mungkin ingin memuat ulang data
            fetchData(page);
            Swal.fire("Deleted!", "", "success");
          });
      }
    });
  };

  const columns = [
    {
      name: "Nama Roles",
      selector: (row) => row.name,
      sortable: true,
      sortField: "name",
    },
    {
      name: "Deskripsi",
      selector: (row) => row.description,
      sortable: true,
      sortField: "email",
    },

    {
      name: "Terakhir di ubah",
      selector: (row) => formatDate(row.updated_at),
      sortable: true,
      sortField: "updated_at",
    },

    {
      name: "Aksi",
      selector: (row) => (
        <div>
          <div className="row">
            <div className="col">
              <Link className=" me-2" to={`edit/${row.id}`}>
                <i className="bi bi-pencil"> </i>
              </Link>
            </div>
            <div className="col">
              <a
                onClick={() => deleteUser(row)}
                className=""
                style={{ cursor: "pointer", color: "red" }}
              >
                <i className="bi bi-trash"></i>
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const buttonsData = [
    {
      to: "tambah",
      className: "btn btn-add",
      icon: "bi bi-plus-circle-dotted",
      text: "Tambah",
    },
    {
      to: "",
      className: "btn btn-panduan",
      icon: "bi bi-question-circle",
      text: "Panduan",
    },
    // {
    //   to: "tambah",
    //   className: "btn btn-import",
    //   icon: "bi bi-cloud-arrow-up",
    //   text: "Import",
    // },
    // {
    //   to: "tambah",
    //   className: "btn btn-print",
    //   icon: "bi bi-printer",
    //   text: "Print",
    // },
  ];

  const subHeaderComponentMemo = (
    <>
      <div>
        <div className="row justify-content-end">
          <div className="col p-0">
            <div className="d-flex justify-content-end ">
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
          <div className="col-6 col-md p-0 mx-1">
            <form className="d-flex" role="search">
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Cari "
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {data ? (
        <>
          <p className="h2 my-3">Roles</p>

          <div className="container-fluid bg-white content-table p-2">
            <div>
              <DataTable
                columns={columns}
                data={data}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationRowsPerPageOptions={[10, 20]}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                sortServer
                onSort={handleSort}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
              />
            </div>
          </div>
        </>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}
