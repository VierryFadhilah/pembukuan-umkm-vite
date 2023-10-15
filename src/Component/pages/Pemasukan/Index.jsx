import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Pemasukan = () => {
  const [data, setData] = useState([
    {
      id: 1,
      user_name: "",
      tanggal_transaksi: new Date(),
      kategori: {},
      kategori_name: "Gaji",
      description: "asd",
      nominal: 200000,
    },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const token = localStorage.getItem("token");
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd", {
      timeZone: "Asia/Jakarta",
    });

    axios({
      method: "get",
      url: `${
        import.meta.env.VITE_API_URL
      }/transaksi?jenis=pemasukan&tanggal_transaksi=${formattedDate}&limit=${perPage}&sort=${sort}&order=${order}&page=${page}&search=${search}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((_) => {
      console.log(_.data.data.data);
      setData(_.data.data.data);
      setTotalRows(_.data.data.total);
    });
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate, perPage, page, sort, order, search]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);

    setPage(page);
    setPerPage(newPerPage);

    setLoading(false);
  };

  const deleteData = async (row) => {
    Swal.showLoading();
    Swal.fire({
      title: `Hapus  ${row.description}`,
      text: "Data yang di hapus tidak dapat Dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/transaksi/${row.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Jika pengguna berhasil dihapus, Anda mungkin ingin memuat ulang data
        fetchData();
        Swal.fire("Deleted!", "", "success");
      }
    });
  };
  const columns = [
    {
      name: "User",
      selector: (row) => row.user_name,
      sortable: true,
      sortField: "user_name",
    },
    {
      name: "Waktu",
      selector: (row) => format(new Date(row.tanggal_transaksi), "HH:mm"),
      sortable: true,
      sortField: "tanggal_transaksi",
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori_name,
      sortable: true,
      sortField: "kategori_name",
    },
    {
      name: "Deskripsi",
      selector: (row) => row.description,
      sortable: true,
      sortField: "description",
    },
    {
      name: "Nominal",
      selector: (row) => new Intl.NumberFormat("id-ID").format(row.nominal),
      sortable: true,
      sortField: "nominal",
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
                onClick={() => deleteData(row)}
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
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <div className="input-group">
                    <ReactDatePicker
                      dateFormat={"dd-MM-yyyy"}
                      showIcon
                      className="form-control mb-2"
                      aria-label="Pilih tanggal"
                      aria-describedby="date-addon"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
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
              <div
                className="col-6 col-md pl-0  mx-1"
                style={{ paddingLeft: "0px" }}
              >
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
        </div>
      </div>
    </>
  );
  const handleSort = async (column, sortDirection) => {
    // simulate server sort
    console.log(column.sortField, sortDirection);
    setLoading(true);

    setSort(column.sortField);
    setOrder(sortDirection);

    setLoading(false);
  };
  return (
    <>
      <p className="h2 my-3">Pemasukan</p>

      <div className="container-fluid bg-white content-table p-2">
        <div className="table-custom">
          <DataTable
            columns={columns}
            data={data}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            sortServer
            onSort={handleSort}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationRowsPerPageOptions={[5, 10, 20]}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Pemasukan;
